---
layout: page
title: League
---

<head>
  <script type = "text/javascript" src = "/assets/javascripts/league_api.js"></script>
</head>

## Recent League of Legends Matches

### Dalton

<table id="daltonTable">
  <thead>
    <tr>
      <th>Game Mode</th>
      <th>Champion</th> 
      <th>Kills</th>
      <th>Deaths</th>
      <th>Assists</th>
    </tr>
  </thead>
  <tbody>
  </tbody>
</table>


### Marina

<table id="marinaTable">
  <thead>
    <tr>
      <th>Game Mode</th>
      <th>Champion</th> 
      <th>Kills</th>
      <th>Deaths</th>
      <th>Assists</th>
    </tr>
  </thead>
  <tbody>
  </tbody>
</table>

<script>
  getMatchData("Thalaern",10)
  getMatchData("Nekare", 10)
</script>
