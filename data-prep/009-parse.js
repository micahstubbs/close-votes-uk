var fs = require('fs'),
	 	jf = require('jsonfile'),
		d3 = require('d3'),
		_ = require('lodash'),
		csv = require('ya-csv');

var jsonfile = '../results.json';
var data = JSON.parse(fs.readFileSync(jsonfile, 'utf8'));

//console.log(data[0]['voteShare']);

var writer = csv.createCsvStreamWriter(
	fs.createWriteStream('nl-2012-voteshare-matrix.csv')
	);  

var writerAppend = csv.createCsvStreamWriter(
	fs.createWriteStream('nl-2012-voteshare-matrix.csv', {'flags': 'a'})
	);  

var headers = ['city',"VVD", "PvdA", "PVV", "SP", "CDA", "D66", "CU", "GrLinks", "SGP", "PvdD", "50+"]
writer.writeRecord(headers)

for(key in data){
	row = [];
	row.push(data[key]['city'])
	console.log(row);
	//console.log(data[key]['voteShare']);
	row = row.concat(data[key]['voteShare']);
	console.log(row);
	writerAppend.writeRecord(row);
}
 