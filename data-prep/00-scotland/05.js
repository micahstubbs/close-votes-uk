var fs = require('fs'),
    jf = require('jsonfile'),
    d3 = require('d3'),
    _ = require('lodash');

// the goal of this script is to 
// generate a list of places
// to feed to a geocoding tool

var jsonfile = '04.json',
    data = JSON.parse(fs.readFileSync(jsonfile, 'utf8')),
    ojo = [];

data.forEach(function(el){
  ojo.push(el['metro'] + ", UK");
})

var outputFile = '05.json'
var outputJsonObj = ojo;

jf.writeFile(outputFile, outputJsonObj, function(err){
  console.log(err)
})