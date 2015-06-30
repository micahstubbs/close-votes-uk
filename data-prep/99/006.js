var fs = require('fs');
var jf = require('jsonfile')
var d3 = require('d3');
var _ = require('lodash');

// var csvfile = '00-uk2015.csv';
var csvfile2 = '00-uk-election-results-2015.csv';
var jsonfile1 = '005.json';
var jsonfile2 = '006-parties.json';

// this script calculates the average voteshare 
// for each metro
// from the voteShare recorded for each
// parliamentary constituency assigned to that metro

var sourceVoteData = d3.csv.parse(fs.readFileSync(csvfile2, 'utf8'));
var data = JSON.parse(fs.readFileSync(jsonfile1, 'utf8'));
var parties = JSON.parse(fs.readFileSync(jsonfile2, 'utf8'));

// for each metro
// for each parliamentary constituency assigned to that metro
// lookup the voteShare from the voteData 
// copy it into a temporary array
// average the values 
// push the averages into the voteShare array
// for that metro object 

// validate that constituency names match up between input files
var byCon = {};

sourceVoteData.forEach(function(el){
  byCon[el['constituency']] = 1; 
})

consToReview = [];

data.forEach(function(el){
  el.cons.forEach(function(con){
    if(byCon[con] === undefined){
      consToReview.push(con);
    } 
  })
})

var outputFile = '006-consToReview.json'

var outputJsonObj = consToReview;

jf.writeFile(outputFile, outputJsonObj, function(err){
  console.log(err)
})

/* 

// create a template array of zero-voteShare values for all of the parties
var zeroes = []
var m = {}
parties.forEach(function(el, i){
	zeroes.push(0);
	m[i] = [];
})

// for each metro
// update the array values to the average voteShare value
// for each party
// across all of the constiuencies in that metro 
data.forEach(function(el, idx, theArray){
	var currentVoteShare = zeroes;
	var voteObj = m;

	el.cons.forEach(function(con){

		sourceVoteData.filter(function(record){
			return record.constituency == con;
		})
		.forEach(function(result){
			var index = parties.indexOf(result.party);
			voteObj[index].push(result.voteShare);
		})
	})
	console.log(currentVoteShare + " result");
	// average the voteShares from each constituency 
	// in the metro
	for(var i=0; i<parties.length; i++){
		currentVoteShare[i] = Math.round(mean(voteObj[i])*10)/10;
	}
	theArray[idx]['voteShare'] = currentVoteShare;
})

function mean(array) { 
  var i,
      sum = 0, 
      len = array.length; 
  if(len){
  	 for (i = 0; i < len; i++) { 
      sum += Number(array[i]); 
  	} 
  	return sum / len;
  } else {
  	return 0;
  }   
}

var outputJsonObj = data;

var outputFile = '006.json'
jf.writeFile(outputFile, outputJsonObj, function(err){
  console.log(err)
})

*/