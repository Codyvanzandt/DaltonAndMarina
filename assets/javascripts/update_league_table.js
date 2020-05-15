function updateWithLeagueData(leagueData, tableID){
    var tableRef = document.getElementById(tableID).getElementsByTagName('tbody')[0];

    for (var i = 0, l = leagueData.length; i < l; i++) {
        var newRow = tableRef.insertRow(-1);
        var gameData = leagueData[i];
        for (const [index, [key, value]] of Object.entries(Object.entries(gameData))) {
            var newCell  = newRow.insertCell(index);
            var newText  = document.createTextNode(value);
            newCell.appendChild(newText);
        }
    }
}
