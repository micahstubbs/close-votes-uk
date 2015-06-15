var fs = require('fs');
var jf = require('jsonfile');
var file = 'results.json';
var jsonObj = JSON.parse(fs.readFileSync(file, 'utf8')); 
var outputJsonObj = [];

// remove key value pairs from the dataset that are not used in the graphic
jsonObj.forEach(function (result, i) {
		delete result.kg;	
		delete result.ong;
		delete result.prov;
	})

outputJsonObj = jsonObj;

var outputFile = 'results.json'
jf.writeFile(outputFile, outputJsonObj, function(err){
	console.log(err)
})