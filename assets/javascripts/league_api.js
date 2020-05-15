var apiKey = "RGAPI-34c9c148-7683-49d8-b0a1-0d35acdc20c8";

    // TOP LEVEL API

async function getMatchData(summonerName, n){
    let champDict = await getChampionIDToNameMap();
    let lastMatches = await getLastMatches(summonerName, n);
    const extract = matchData => extractMatchData(matchData, summonerName, champDict );
    return lastMatches.map(extract)
}

async function getLastMatches(summonerName, n){
    var summonerInfo = fetchSummonerInfo(summonerName)
    var summonerID = getAccountID(summonerInfo);
    var summonerMatchInfo = fetchMatchList(summonerID);
    var lastNMatches = getLastNMatches(summonerMatchInfo, n);
    var lastNMatchIDs = getAllMatchIDs(lastNMatches);
    return lastNMatchIDs.then( matchIDs => Promise.all( matchIDs.map(fetchMatchInfo) ) )
}

    // DATA FETCHES
function fetchSummonerInfo(summonerName){
    url = `https://cors-anywhere.herokuapp.com/https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summonerName}?api_key=${apiKey}`
    return fetch(url, {headers : {"Cache-Control" : "max-age=300"}})
    .then(response => response.json())
}

function fetchMatchList(accountID){
    return accountID.then(
        id => fetch(`https://cors-anywhere.herokuapp.com/https://na1.api.riotgames.com/lol/match/v4/matchlists/by-account/${id}?api_key=${apiKey}`,{headers : {"Cache-Control" : "max-age=300"}}))
        .then(response => response.json());
}

function fetchMatchInfo(matchID){
    return fetch(`https://cors-anywhere.herokuapp.com/https://na1.api.riotgames.com/lol/match/v4/matches/${matchID}?api_key=${apiKey}`,{headers : {"Cache-Control" : "max-age=300"}})
    .then(response => response.json());
}

    // HELPER FUNCTIONS

function getAccountID(summonerInfo){
    return summonerInfo.then(contents => contents["accountId"]);
}

function getAllMatchIDs(matchArray){
    return matchArray.then( matches => matches.map( getMatchID ) )
}

function getMatchID(matchInfo){
    return matchInfo["gameId"];
}

function getLastNMatches(matches, n){
    return matches.then( matchData => matchData["matches"].slice(0,n) )
}


// DATA PROCESSING

    // Processing

function extractMatchData(matchData, summonerName, IDToChampDict){
    var participantData = getParticpantData(matchData, summonerName);
    return {
        "gameMode" : getGameMode(matchData),
        //"gameStart" : getGameStart(matchData),
        "gameDuration" : getGameDurationMinutes(matchData),
        "championID" :  IDToChampDict[ getChampionID(participantData) ],
        "kills" : getKills(participantData),
        "deaths" : getDeaths(participantData),
        "assists" : getAssists(participantData),
        "matchResult" : getMatchResult(participantData)
    }
}

    // GETTERS

        // Match

function getGameStart(matchData){
    return new Date( matchData["gameCreation"] ).toLocaleString()
}

function getGameDurationMinutes(matchData){
    return Math.round( matchData["gameDuration"] / 60 )
}

function getGameMode(matchData){
    return matchData["gameMode"]
}

        // Participant

function getChampionID(participantData){
    return participantData["championId"];
}

function getKills(participantData){
    return participantData["stats"]["kills"]
}

function getDeaths(participantData){
    return participantData["stats"]["deaths"]
}

function getAssists(participantData){
    return participantData["stats"]["assists"]
}

function getMatchResult(participantData){
    return participantData["stats"]["win"];
}

    // HELPERS

function getParticpantData(matchData, summonerName){
    var goalParticipantID = getParticipantID(matchData, summonerName);
    var participants = matchData["participants"];

    for (var i = 0, l = participants.length; i < l; i++) {
        var participant = participants[i];
        var id = participant["participantId"];
        if (id == goalParticipantID ){
            return participant;
        }
    } 
}

function getParticipantID(matchData, goalSummonerName){
    var identities = matchData["participantIdentities"];
    for (var i = 0, l = identities.length; i < l; i++) {
        var identity = identities[i];
        var id = identity["participantId"];
        var summonerName = identity["player"]["summonerName"];
        if (summonerName == goalSummonerName){
            return id;
        }
    }
}

// Champion Data

// TOP-LEVEL API

async function getChampionIDToNameMap(){
    var currentPatchNO = fetchCurrentChampionPatchNO();
    var allChampData = fetchChampionData(currentPatchNO);
    return allChampData.then( data => createIDToName(data));
}

// FETCH
function fetchCurrentChampionPatchNO(){
    url = "https://cors-anywhere.herokuapp.com/https://ddragon.leagueoflegends.com/realms/na.json"
    return fetch(url, {headers : {"Cache-Control" : "max-age=3600"}})
    .then(response => response.json())
    .then(data => data["n"]["champion"])
}

function fetchChampionData(patchNo){
    return patchNo.then(no => fetch(`https://cors-anywhere.herokuapp.com/http://ddragon.leagueoflegends.com/cdn/${no}/data/en_US/champion.json`,{headers : {"Cache-Control" : "max-age=3600"}}))
    .then(response => response.json())
}

// PARSE

function createIDToName(championData){
    var championData = championData["data"];
    var IDToName = new Object();
    for (var key in championData) {
        var championSpecificData = championData[key];
        var id = championSpecificData["key"];
        IDToName[parseInt(id)] = key;
    }
    return IDToName;
}
