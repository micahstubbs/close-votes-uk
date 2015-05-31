var fs = require('fs');
var jf = require('jsonfile')
var d3 = require('d3');
var _ = require('lodash');

// an implementation of the calculation described on this page
// http://stattrek.com/chi-square-test/independence.aspx

// from http://stackoverflow.com/a/14832662/1732222

Array.prototype.allValuesEqual = function() {

	for(var i = 1; i < this.length; i++){
	    
	  if(this[i] !== this[0])
	     return false;
		}
		return true;
	}

// from https://github.com/lodash/lodash/blob/master/lodash.js

function arraySum(array) {
      var length = array.length,
          result = 0;

      while (length--) {
        result += +array[length] || 0;
      }
      return result;
    }

// adapted from 
// http://www.macwright.org/simple-statistics/docs/simple_statistics.html

function chiSquare(data) {

  
  var chi_squared = 0,
			observed_frequencies = [],
			expected_frequencies = [],
			observationCount = Object.keys(data).length,
			parameterCounts = [];
	
	// calculate the number of parameters in each observation object

	for(key in data){
		parameterCounts.push(
			Object.keys(data[key]).length
		);
	}

	// Confirm that the number of parameters for each observation is 
	// the same.  If not, return an error.

	if(!parameterCounts.allValuesEqual()){ 
		return "Error - the observations have different numbers of parameters"; 
	}

	var parameterCount = parameterCounts[0];
	//console.log(parameterCount);

	// Create an array of observed frequencies from the data
  
  for (observation in data) {
  	for(parameter in data[observation]){
  		observed_frequencies.push(
  				Number(data[observation][parameter])
  			);
  		//console.log(observed_frequencies);
  	}
  }
	
	// The histogram we created might be sparse - there might be gaps 
	// between values. So we iterate through the histogram, 
	// making sure that instead of undefined, gaps have 0 values.
  
  for (i = 0; i < observed_frequencies.length; i++){
      if (observed_frequencies[i] === undefined) {
          observed_frequencies[i] = 0;
      }
  }

	// Populate the expected_frequencies array with expected frequencies
	// calculated from the observed frequencies

	//console.log(observed_frequencies);
	//console.log(observed_frequencies.length);

	for (i = 0; i < observed_frequencies.length; i++){
		
		// calculate nr, the sum for an observation row 
		// across all parameters

		if(i<parameterCount){
			var nr = arraySum(observed_frequencies.slice(0,parameterCount));
		} else {
			var nr = arraySum(observed_frequencies.slice(
				parameterCount,observed_frequencies.length
				));
		}
		//console.log(nr);

		// calculate nc, the sum for a parameter column
		// across all observations

		if(i<parameterCount){
			var nc = observed_frequencies[i] + observed_frequencies[i+parameterCount];
		} else {
			var nc = observed_frequencies[i] + observed_frequencies[i-parameterCount];
		}
		//console.log(nc);

		//calculate n, the sum of all observations for all parameters
		var n = arraySum(observed_frequencies)
		//console.log(n);

		// calculate the expected frequency for each 
		// observation, parameter combination and
		// insert it into the expected_frequencies array
		expected_frequencies[i] = (nr * nc) / n;
		//console.log(expected_frequencies);										
	}

	// Iterate through the squared differences between observed 
	// & expected frequencies, accumulating the chi_squared statistic.

  for (k = 0; k < observed_frequencies.length; k++) {
      if(expected_frequencies[k] != 0){ 
      		chi_squared += Math.pow(
          	observed_frequencies[k] - expected_frequencies[k], 2) /
          	expected_frequencies[k];
      }
      //console.log(chi_squared); 
  }

  // return the calculated chi-squared test statistic
	
	return chi_squared;

}



//var csvfile = 'uk2015.csv';
var jsonfile = '006.json';


//var voteData = d3.csv.parse(fs.readFileSync(csvfile, 'utf8'));
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
//console.log(builtUpAreas);


// if a party does not appear in a bua, add it 
// with a voteShare of zero
// this helps us easily calculate the chi-square test statistic
// for all combinations of bua and party
for(key in data){
	for(i=0; i<parties.length; i++){
		if(data[key]['voteShare'][parties[i]] == undefined){
			data[key]['voteShare'][parties[i]] = "0";
		}  
	}
}

var compareObj = {};
for(i=0; i<builtUpAreas.length; i++){

	for(j in data){
			compareObj = {}
			compareObj[builtUpAreas[i]] = data[builtUpAreas[i]]['voteShare']
			compareObj[j] = data[j]['voteShare']
			//console.log(compareObj)
			console.log(j)
			console.log(chiSquare(compareObj));

	}
	break;
}

//console.log(compareObj);
//console.log(chiSquare(compareObj));
/*
var outputJsonObj = data;

var outputFile = '007.json'
jf.writeFile(outputFile, outputJsonObj, function(err){
  console.log(err)
})
*/
