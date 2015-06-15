var fs = require('fs');
var jf = require('jsonfile')
var d3 = require('d3');
var _ = require('lodash');

// add the population data for each settlement

var csvfile = '02-settlement-population-scotland-2012.csv';
var jsonfile = '01.json';

// settlement population
var sp = d3.csv.parse(fs.readFileSync(csvfile, 'utf8'));
var data = JSON.parse(fs.readFileSync(jsonfile, 'utf8'));

var populations = {};
sp.forEach(function(el){
  populations[el.settlementName] = parseFloat(el['allAges'].replace(/,/g,''));
})

// outputJsonObj
var ojo = data;
ojo.forEach(function(el){
  el['spop'] = populations[el['settlementName']];
})

// sort the metros in descending order by
// settlement population
ojo.sort(function(a,b){
  if (a['spop'] < b['spop'])
    return 1;
  if (a['spop'] > b['spop'])
    return -1;
  return 0;
})


var outputJsonObj = ojo;

var outputFile = '02.json'
jf.writeFile(outputFile, outputJsonObj, function(err){
  console.log(err)
})
