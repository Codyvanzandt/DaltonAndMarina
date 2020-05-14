---
layout: home
title: Welcome!
---

<div id="marriedSince"></div> 

<p align="center">
  <img src="/assets/photos/d-and-m-headshot.png">
 </p>
 
 <script>
  var a   = moment();
  var b = moment('2020-05-01 12:00:00');
  
  var years = a.diff(b, 'year');
  b.add(years, 'years');

  var months = a.diff(b, 'months');
  b.add(months, 'months');

  var days = a.diff(b, 'days');

  console.log(years + ' years ' + months + ' months ' + days + ' days');
  
  document.getElementById("marriedSince").innerHTML = "<p>We're Dalton and Marina, a couple of League-playing, dog-loving Japanophiles who have been married for " + years + " years, "  + months + " months, " + "and " days + " days!"</p>";
 </script>
