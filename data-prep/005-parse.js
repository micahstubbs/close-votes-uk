var fs = require('fs');
var jf = require('jsonfile')
var d3 = require('d3');
var _ = require('lodash');

var csvfile = 'large-bua-geo.csv';
var jsonfile = '002.json';

// geocoding from http://www.doogal.co.uk/BatchGeocoding.php
var geoData = d3.csv.parse(fs.readFileSync(csvfile, 'utf8'));
var sourceData = JSON.parse(fs.readFileSync(jsonfile, 'utf8'));

var data = sourceData;

// lookup the lat and long from the geoData and copy it
// into the relevant bua object in data
var i = data.length;
while(i--){
	var outerMetro = data[i]['metro']
	var j = geoData.length;
	while(j--){
		var innerMetro = geoData[j]["bua"];
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
