var fs = require('fs'),
	 	jf = require('jsonfile'),
		d3 = require('d3'),
		_ = require('lodash'),
		ed = require('euclidean-distance');

/* 
	calculate the euclidean distance between the 
	voteShare arrays for each unique pair of built-up areas
*/

var jsonfile = '007.json';
var data = JSON.parse(fs.readFileSync(jsonfile, 'utf8'));

var buas = Object.keys(data);


for(i=0; i<buas.length; i++){
	var outerBua = buas[i];
	var parties = Object.keys(data[outerBua]['voteShare']).sort();
	var eud = []
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
	  
	  //console.log("array1 for " + outerBua + " is " + array1);
	  //console.log("array2 for " + innerBua + " is " + array2);
	  // chiSquare(array1,array2)
	  eud.push(Math.floor(ed(array1,array2)));
	}
	data[outerBua]['eud'] = eud;
	//console.log(parties);
}

var outputJsonObj = data;

var outputFile = '010.json'
jf.writeFile(outputFile, outputJsonObj, function(err){
  console.log(err)
})
