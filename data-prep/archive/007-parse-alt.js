var fs = require('fs');
var jf = require('jsonfile')
var d3 = require('d3');
var _ = require('lodash');

// an implementation of the calculation described on this page
// http://stattrek.com/chi-square-test/independence.aspx

var array1 = [28.9, 37.1, 6, 8, 5.2, 7.2, 1.4, 2.1, 0.3, 1.8, 1.2 ], // Aa en Hunze
		array2 = [23.4, 8.7, 11, 5.4, 11.2, 2.4, 11.2, 0.6, 23.1, 1.3, 1.4 ] // Aalburg

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

function chiSquare(array1, array2) {

  
  var chi_squared = 0,
			observed_frequencies = [],
			expected_frequencies = [],
			parameterCounts = [];
	
	// Confirm that the number of parameters for each observation is 
	// the same.  If not, return an error.

	if(array1.length != array2.length ){ 
		return "Error - the observations have different numbers of parameters"; 
	}

	// calculate the number of parameters in each observation object
	var parameterCount = array1.length;
	//console.log(parameterCount);

	// Create an array of observed frequencies from the data
  observed_frequencies = array1.concat(array2);
  console.log(observed_frequencies);
	
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

	console.log(observed_frequencies);
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

  chi_squared = Math.round(chi_squared);

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
//console.log(builtUpAreas.length);


// if a party does not appear in a bua, add it 
// with a voteShare of zero
// this helps us easily calculate the chi-square test statistic
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

for(i=0; i<1; i++){
	//console.log(i + " " + builtUpAreas[i]);
	for(j in data){
			//console.log(i + " " + builtUpAreas[i]);
			//console.log(j);
			var compareObj = {}
			array1 = data[builtUpAreas[i]]['voteShare']
			array2 = data[j]['voteShare']
			console.log(compareObj)
			console.log(j)
			// call chiSquare() somehow changes the first key of the compareObj
			// from 'Swansea-a' to 'Swarthmoor-a'
			console.log(chiSquare(compareObj));
	}
}
//console.log(builtUpAreas);
//console.log(compareObj);
//console.log(chiSquare(compareObj));
/*
var outputJsonObj = data;

var outputFile = '007.json'
jf.writeFile(outputFile, outputJsonObj, function(err){
  console.log(err)
})
*/
