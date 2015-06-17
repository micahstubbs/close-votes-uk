var fs = require('fs');
var jf = require('jsonfile')
var d3 = require('d3');
var _ = require('lodash');

var csvfile = 'metro-geo.csv';
var jsonfile1 = '002.json';
var jsonfile2 = '../00-northern-ireland/00.json'
var jsonfile3 = '../00-scotland/04.json'

// geocoding from http://www.doogal.co.uk/BatchGeocoding.php
var geoData = d3.csv.parse(fs.readFileSync(csvfile, 'utf8'));
var ewData = JSON.parse(fs.readFileSync(jsonfile1, 'utf8'));
var niData = JSON.parse(fs.readFileSync(jsonfile2, 'utf8'));
var sData = JSON.parse(fs.readFileSync(jsonfile3, 'utf8'));

var data = ewData.concat(niData, sData);

// lookup the lat and long from the geoData and copy it
// into the relevant bua object in data
var i = data.length;
while(i--){
	var outerMetro = data[i]['metro']
	var j = geoData.length;
	while(j--){
		var innerMetro = geoData[j]["metro"];
    if(outerMetro === innerMetro){
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
