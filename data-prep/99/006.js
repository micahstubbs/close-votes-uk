var fs = require('fs');
var jf = require('jsonfile')
var d3 = require('d3');
var _ = require('lodash');

//var csvfile1 = '00-uk2015.csv';
//var csvfile2 = '00-uk-election-results-2015.csv';
var jsonfile1 = '005.json';
var jsonfile2 = '006-parties.json';
var jsonfile3 = '006-uk-election-results-2015.json'

// this script calculates the average voteshare 
// for each metro
// from the voteShare recorded for each
// parliamentary constituency assigned to that metro

//var voteData = d3.csv.parse(fs.readFileSync(csvfile1, 'utf8'));
var data = JSON.parse(fs.readFileSync(jsonfile1, 'utf8'));
var parties = JSON.parse(fs.readFileSync(jsonfile2, 'utf8'));
var voteData = JSON.parse(fs.readFileSync(jsonfile3, 'utf8'));

// for each metro
// for each parliamentary constituency assigned to that metro
// lookup the voteShare from the voteData 
// copy it into a temporary array
// average the values 
// push the averages into the voteShare array
// for that metro object 

// validate that constituency names match up between input files
var byCon = {};

voteData.forEach(function(el){
  byCon[el['PCON11NM']] = 1; 
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




console.log(zeroes);
//console.log(m);



// for each metro
// update the array values to the average voteShare value
// for each party
// across all of the constituencies in that metro 
var currentVoteShare;
var l = data.length;
while(l--) {

	// create a template array of zero-voteShare values for all of the parties
	var zeroes = [];
	var m = {};
	parties.forEach(function(el, i){
		zeroes.push(0);
		m[i] = [];
	})
	
	currentVoteShare = zeroes; // [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ]; // zeroes;
	var voteObj = m;

	//console.log(idx);

	data[l]['cons'].forEach(function(con){

		//console.log(con);
		var subset = voteData.filter(function(record){
			return record.PCON11NM == con;
		})

		//console.log(subset);
		
		subset.forEach(function(result){
			var index = parties.indexOf(result.party);
			//console.log("index is " + index);
			voteObj[index].push(result.voteShare);
			//console.log(result.voteShare);
		})
	})

	//console.log(currentVoteShare + " result");
	// average the voteShares from each constituency 
	// in the metro
	//sconsole.log(voteObj); 
	for(var i=0; i<parties.length; i++){
		currentVoteShare[i] = Math.round(mean(voteObj[i])*10)/10;
	}
	//console.log("currentVoteShare", currentVoteShare);
	//console.log(l);
	//console.log(data[l]);
	data[l]['voteShare'] = currentVoteShare;
	//console.log(data[l]['voteShare']);
	//if(l === data.length-1) return true;
}

//console.log(data);


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

