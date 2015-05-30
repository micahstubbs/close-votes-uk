var fs = require('fs');
var jf = require('jsonfile')
var d3 = require('d3');
var _ = require('lodash');

//var csvfile = 'uk2015.csv';
var jsonfile = '006.json';


var voteData = d3.csv.parse(fs.readFileSync(csvfile, 'utf8'));
var sourceData = JSON.parse(fs.readFileSync(jsonfile, 'utf8'));

var data = sourceData;

// lookup the voteShare from the geoData and copy it
// into the relevant bua object in data
	for (var i in data){
		data[i]["voteShare"] = {};

		for (var j in voteData){
			
			if (i === voteData[j]["BUA11NM"]){
				
				var party = voteData[j]['party'];
				var voteShare = voteData[j]["voteShare"];
				data[i]["voteShare"][party] = voteShare;		
			
			}
		
		}
	
	}

var outputJsonObj = data;

var outputFile = '007.json'
jf.writeFile(outputFile, outputJsonObj, function(err){
  console.log(err)
})
