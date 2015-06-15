var fs = require('fs');
var jf = require('jsonfile')
var d3 = require('d3');
var _ = require('lodash');

var jsonfile = '006.json';
var data = JSON.parse(fs.readFileSync(jsonfile, 'utf8'));

// build an array of unique parties and another array
// of unique builtUpAreas
var parties = [],
		builtUpAreas = [];


for(key in data){
	parties = _.union(parties, Object.keys(data[key]['voteShare']));
}
//console.log(parties);

builtUpAreas = _.union(builtUpAreas, Object.keys(data));
//console.log(builtUpAreas.length);


// if a party does not appear in a bua, add it 
// with a voteShare of zero
// this helps us easily calculate the euclidean distance test statistic
// for all combinations of bua and party
for(key in data){
	//console.log(key);
	for(i=0; i<parties.length; i++){
		if(data[key]['voteShare'][parties[i]] == undefined){
			data[key]['voteShare'][parties[i]] = "0"
			//console.log(data[key]['voteShare']);
		}  
	}
}

var outputJsonObj = data;

var outputFile = '007.json'
jf.writeFile(outputFile, outputJsonObj, function(err){
  console.log(err)
})

