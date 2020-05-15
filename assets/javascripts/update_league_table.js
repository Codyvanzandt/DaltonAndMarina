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
        
        for (const [index, [key, value]] of Object.entries(Object.entries(gameData))) {
            if( key != "matchResult" ){
                var newCell  = newRow.insertCell(index);
                var newText  = document.createTextNode(value);
                newCell.appendChild(newText);
            }  
        }
    }
}
