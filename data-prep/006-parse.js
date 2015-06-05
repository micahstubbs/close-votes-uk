var fs = require('fs');
var jf = require('jsonfile')
var d3 = require('d3');
var _ = require('lodash');

// https://github.com/Teun/thenBy.js
var firstBy = (function() {
    /* mixin for the `thenBy` property */
    function extend(f) {
        f.thenBy = tb;
        return f;
    }
    /* adds a secondary compare function to the target function (`this` context)
       which is applied in case the first one returns 0 (equal)
       returns a new compare function, which has a `thenBy` method as well */
    function tb(y) {
        var x = this;
        return extend(function(a, b) {
            return x(a,b) || y(a,b);
        });
    }
    return extend;
})();


var csvfile = '000-uk2015.csv';
var csvfile2 = 'uk-election-results-2015.csv'
var jsonfile = '005.json';


// this script calculates the average voteshare 
// for each metro
// from the voteShare recorded for each
// parliamentary constituency assigned to that metro

var voteData = d3.csv.parse(fs.readFileSync(csvfile, 'utf8'));
var sourceVoteData = d3.csv.parse(fs.readFileSync(csvfile2, 'utf8'));
var data = JSON.parse(fs.readFileSync(jsonfile, 'utf8'));

// get unique list of parties
var parties = [];
var cons = [];
var wins = {};

var i = sourceVoteData.length;
while(i--){
	parties.push(sourceVoteData[i]['party']);
	cons.push(sourceVoteData[i]['constituency']);
}
parties = _.uniq(parties);
cons = _.uniq(cons);

// calculate the number of constituencies won by each party
var i = cons.length;
while(i--){
	var filtered = sourceVoteData.filter(function(d){
		return d['constituency'] == cons[i];
	})

	// sort by votes
	filtered.sort(function(a, b) {
    return b.votes - a.votes;
  })

	var winner = filtered[0]['party']
  wins[winner] = 1 + (wins[winner] || 0);
}

var winsArray = []; // for sorting by number of constituencies won 
var winners = []; // for comparing with the list of all parties
for (var party in wins){
      winsArray.push([party, wins[party]]);
      winners.push(party);
     }

var	losers = _.difference(parties, winners);
//console.log(losers);

var i=losers.length;
while(i--){
	winsArray.push([losers[i],0]);
}

wins = winsArray.sort(
	firstBy(function(a, b){ return b[1] - a[1]; }) // descending by wins
	.thenBy(function(a, b){ return a[0].localeCompare(b[0]) }) // ascending by party name
	);

//console.log(wins);

// list of parties sorted by number of constituencies won
parties = [];
for(var i=0; i<wins.length; i++){
	parties.push(wins[i][0]);
}

//console.log(parties);

var outputJsonObj = parties;

var outputFile = '006-parties.json'
jf.writeFile(outputFile, outputJsonObj, function(err){
  console.log(err)
})

// for each metro
// for each parliamentary constituency assigned to that metro
// lookup the voteShare from the voteData 
// copy it into a temporary array
// average the values 
// push the averages into the voteShare array
// for that metro object 

// loop over all the metro objects
var i = data.length;
while(i--){
	var metro = data[i]['metro'];
	var voteShares = [];

	// loop over all the constituencies in the current metro
	var j = data[i]['cons'].length;
	while(j--){
		var con = data[i]['cons'][j];
		var voteDataSubset = voteData.filter(function(el){
			return el['BUA11NM'] === metro &&
						 el['PCON11NM'] === con;
		})

		// loop over all the party-rows from the vote data
		// for the current metro and the current constituency
		var k = voteDataSubset.length;
		while(k--){
			// find a data-driven solution here
			// will use hard-coded array indices for now
			/*	
			{
  			"0":"Conservative",
  			"1":"Labour",
  			"2":"Scottish National Party",
  			"3":"Democratic Unionist Party",
  			"4":"Liberal Democrat",
  			"5":"Sinn Fein",
  			"6":"Plaid Cymru",
  			"7":"Social Democratic & Labour Party",
  			"8":"Ulster Unionist Party",
  			"9":"Green Party",
  			"10":"Independent",
  			"11":"Other",
  			"12":"UKIP",
  			"13":"Alliance Party",
  			"14":"Cannabis Is Safer Than Alcohol",
  			"15":"Christian Peoples Alliance",
  			"16":"English Democrats",
  			"17":"Monster Raving Loony Party",
  			"18":"TUSC"
			}
			*/
			var voteShare = [];
			var m = parties.length; // 19 parties
			while(m--){ voteShare.push(0) };
			
			var n = parties.length;
			while(n--){
				if(voteDataSubset[k]['party'] === parties[n]){
					voteShare[n] = voteDataSubset[k]['voteShare']
				}  
			}
		}
	}		
}




var outputJsonObj = data;

var outputFile = '006.json'
jf.writeFile(outputFile, outputJsonObj, function(err){
  console.log(err)
})


