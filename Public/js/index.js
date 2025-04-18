// const express = require('')   <= This is common js, mainly used for node.js
// module js <= mainly used for browser
const weekNames = ['Sunday','Monday','Tuesday','Wednesday','Thursday', 'Friday','Saturday'];
const monthNames = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
const dateTitle = document.getElementById('date')
const d = new Date()
const day = d.getDay()   // 0 - 6
const week = weekNames[day]
const date = d.getDate()
const month = monthNames[d.getMonth()]  // 0 - 11
const year = d.getFullYear()


dateTitle.textContent = `${week}, ${date} ${month} ${year}`;