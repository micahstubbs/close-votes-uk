var fs = require('fs'),
	 	jf = require('jsonfile'),
		d3 = require('d3'),
		_ = require('lodash'),
		ed = require('euclidean-distance');

var jsonfile = '../results.json';
var data = JSON.parse(fs.readFileSync(jsonfile, 'utf8'));

var buas = Object.keys(data);

for(i=0; i<1; i++){
	var outerBua = buas[i];
	//console.log(outerBua);
	//var parties = Object.keys(data[outerBua]['voteShare']).sort();
	var eud = []
	for (innerBua in data){
		var	array1 = [];
		var array2 = [];

	  for(j=0; j<11; j++){
	  	//console.log(data[outerBua]['voteShare']);
	  	//console.log(data[outerBua]['voteShare'][j]);
	  	array1.push(data[outerBua]['voteShare'][j]);
	  }
	  
	  for(j=0; j<11; j++){
	  	array2.push(data[innerBua]['voteShare'][j]);
	  }
	  
	  //console.log("array1 for " + outerBua + " is " + array1);
	  //console.log("array2 for " + innerBua + " is " + array2);
	  // chiSquare(array1,array2)
	  eud.push(Math.floor(ed(array1,array2)));
	}
	data[outerBua]['eud'] = eud;

	function arraysEqual(a1,a2) {
    return JSON.stringify(a1)==JSON.stringify(a2);
	}
	// check to see if the value calculated for euclidean-distance matches
	// the 'chi' value in Jan Willem Tulp's results.json dataset
	console.log(arraysEqual(data[outerBua]['chi'],data[outerBua]['eud']));
	// true
	// it does :-)
}



var outputJsonObj = data;

var outputFile = '011.json'
jf.writeFile(outputFile, outputJsonObj, function(err){
  console.log(err)
})
