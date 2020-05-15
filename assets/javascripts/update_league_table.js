function updateWithLeagueData(leagueData, tableID){
    var tableRef = document.getElementById(tableID).getElementsByTagName('tbody')[0];

    for (var i = 0, l = leagueData.length; i < l; i++) {
        var gameData = leagueData[i];
        var newRow = tableRef.insertRow(-1);
        if( gameData["matchResult"] ){
            newRow.setAttribute("style", "background-color:rgba(0, 255, 0, 0.3);")
        } else {
            newRow.setAttribute("style", "background-color:rgba(255, 0, 0, 0.3);")
        }
        
        keys = ["gameMode", "championID", "kills", "deaths", "assists"]
        for (const [index, key] of keys.entries()) {
            console.log(key);
            console.log(gameData[key]);
            var newCell  = newRow.insertCell(index);
            var newText  = document.createTextNode(gameData[key]);
            newCell.appendChild(newText);
            }  
        }
    }
