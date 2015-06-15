var fs = require('fs');
var jf = require('jsonfile')
var d3 = require('d3');
var _ = require('lodash');

// goals of this script:
// rename "settlementName" property to "metro"
// remove the spop property

var jsonfile = '03.json';

var data = JSON.parse(fs.readFileSync(jsonfile, 'utf8')),
		ojo = [];

data.forEach(function(el){
	ojo.push({
		'metro': el.settlementName,
		'cons': el.cons
	})
})

var outputJsonObj = ojo;

var outputFile = '04.json'
jf.writeFile(outputFile, outputJsonObj, function(err){
  console.log(err)
})


