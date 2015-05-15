var fs = require('fs');
var jf = require('jsonfile')
var d3 = require('d3');
var _ = require('lodash');

var jsonfile = '003.json';
var csvfile = 'large-bua-geo.csv';

var sourceData = JSON.parse(fs.readFileSync(jsonfile, 'utf8'));
var geoData = d3.csv.parse(fs.readFileSync(csvfile, 'utf8'));

var data = sourceData;

// lookup the lat and long from the geoData and copy it
// into the relevant bua object in data
for (var i in data){
  for(var j in geoData){
    if(i === geoData[j]["bua"]){
      data[i]["lat"] = geoData[j]["lat"];
      data[i]["long"] = geoData[j]["long"];
    }
  }
}

var outputJsonObj = data;

var outputFile = '005.json'
jf.writeFile(outputFile, outputJsonObj, function(err){
  console.log(err)
})
