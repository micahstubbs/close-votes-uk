var fs = require('fs'),
	 	jf = require('jsonfile'),
		d3 = require('d3'),
		_ = require('lodash'),
		ed = require('euclidean-distance');

var jsonfile = '010.json';
var data = JSON.parse(fs.readFileSync(jsonfile, 'utf8'));
var outputJsonObj = []
var buas = Object.keys(data);

// a script to make the output json more human readable with the city property
// at the top

for(i=0; i<buas.length; i++){
	var t = {}
	var bua = buas[i];

	t['city'] = bua;
	t['pop'] = data[bua]['pop'];
	t['lat'] = data[bua]['lat'];
	t['long'] = data[bua]['long'];
	t['cons'] = data[bua]['cons'];
	t['voteShare'] = data[bua]['voteShare'];
	t['eud'] = data[bua]['eud']

	outputJsonObj.push(t);
}

var outputFile = '012.json';

jf.writeFile(outputFile, outputJsonObj, function(err){
  console.log(err)
})
