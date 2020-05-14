---
layout: home
title: Welcome!
---

<div id="marriedSince"></div> 

<p align="center">
  <img src="/assets/photos/d-and-m-headshot.png">
 </p>

 <script>
  function updateWeddingClock() {
  var a   = moment();
  var b = moment('2020-05-15 20:00:00');
  
  var years = a.diff(b, 'year');
  b.add(years, 'years');

  var months = a.diff(b, 'months');
  b.add(months, 'months');

  var days = a.diff(b, 'days');
  b.add(days, 'days');
  
  var hours = a.diff(b, 'hours');
  b.add(hours, 'hours');
  
  var minutes = a.diff(b, 'minutes');
  b.add(minutes, 'minutes');
  
  var seconds = a.diff(b, 'seconds');
  
  document.getElementById("marriedSince").innerHTML = "<p>We're Dalton and Marina, a couple of League-playing, dog-loving Japanophiles who have been married for " + years + " years, "  + months + " months, " + days + " days, " + hours + " hours, " + minutes + " minutes, and " + seconds + " seconds.</p>";
  }
  
  var intervalID = setInterval(updateWeddingClock, 1000)
 </script>
