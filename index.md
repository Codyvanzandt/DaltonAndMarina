---
layout: home
title: Welcome!
---

<div id="marriedSince"></div> 

<p align="center">
  <img src="/assets/photos/d-and-m-headshot.png">
 </p>
 
 <script>
  var starts = moment('2020-05-01 12:00:00');
  var ends   = moment();
  var diffHuman = moment.preciseDiff(starts, ends);
  document.getElementById("marriedSince").innerHTML = "<p>We're Dalton and Marina, a couple of League-playing, dog-loving Japanophiles who have been married for " + diffHuman + "</p>";
 </script>
