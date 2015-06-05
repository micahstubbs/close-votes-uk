var fs = require('fs');
var jf = require('jsonfile')
var d3 = require('d3');
var _ = require('lodash');

var jsonfile = '007-sample.json';
var data = JSON.parse(fs.readFileSync(jsonfile, 'utf8'));

var buas = Object.keys(data);

for(i=0; i<1; i++){
	var outerBua = buas[i];
	var parties = Object.keys(data[outerBua]['voteShare']).sort();
	for (innerBua in data){
		var	array1 = [];
		var array2 = [];

	  for(j=0; j<parties.length; j++){
	  	var party = parties[j];
	  	array1.push(data[outerBua]['voteShare'][party]);
	  }
	  
	  for(j=0; j<parties.length; j++){
	  	var party = parties[j];
	  	array2.push(data[innerBua]['voteShare'][party]);
	  }
	  
	  console.log("array1 for " + outerBua + " is " + array1);
	  console.log("array2 for " + innerBua + " is " + array2);
	  // chiSquare(array1,array2)
	}
	//console.log(parties);
}

var outputJsonObj = data;

var outputFile = '008.json'
jf.writeFile(outputFile, outputJsonObj, function(err){
  console.log(err)
})
