var fs = require('fs'),
	 	jf = require('jsonfile'),
		d3 = require('d3'),
		_ = require('lodash');


var jsonfile = '010.json';
var data = JSON.parse(fs.readFileSync(jsonfile, 'utf8'));
var outputJsonObj = []
var metros = Object.keys(data);

// a script to find all of the metros 
// that are missing a lat or a long property

for(i=0; i<data.length; i++){

	if(!_.has(data[i], 'long') || !_.has(data[i], 'lat')) {
		outputJsonObj.push({
			"metro": data[i]["metro"],
			"pop": data[i]["pop"],
			"cons": data[i]["cons"]
		});
	}
}

var outputFile = '014.json';

jf.writeFile(outputFile, outputJsonObj, function(err){
  console.log(err)
})
