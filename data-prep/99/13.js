var fs = require('fs');
var jf = require('jsonfile')
var d3 = require('d3');
var _ = require('lodash');

var jsonfile1 = '002-pop-by-con.json';
var jsonfile2 = '012.json';

// the goal of this script is to calculate the population
// for each metro by summing the population
// for each constituency it contains
var popData = JSON.parse(fs.readFileSync(jsonfile1, 'utf8'));
var data = JSON.parse(fs.readFileSync(jsonfile2, 'utf8'));

var ojo = data;

ojo.forEach(function(el){
  var p = 0;
  el['cons'].forEach(function(con){
    p += parseFloat(popData[con])
  })
  console.log(p)
  el['pop'] = p;
})

var outputJsonObj = ojo;

var outputFile = '013.json'
jf.writeFile(outputFile, outputJsonObj, function(err){
  console.log(err)
})
