// an implementation of the calculation described on this page
// http://stattrek.com/chi-square-test/independence.aspx
/*
var testData = {
	"male":{
		"republican":200,
		"democrat":150,
		"independent":50
	},
	"female":{
		"republican":250,
		"democrat":300,
		"independent":50
	}
}
*/

var voteData = { 
	Swansea:{ 
		'Plaid Cymru': '6.4',
     'Labour': '42.6',
     'Green Party': '5.1',
     'Liberal Democrat': '9',
     'Conservative': '22.6',
     'UKIP': '13.5',
     'Other': '0.1',
     'TUSC': '0.5',
     'Independent': '0.2',
     'Monster Raving Loony Party': '0.6',
     'Cannabis Is Safer Than Alcohol': '0',
     'English Democrats': '0',
     'Christian Peoples Alliance': '0' 
   },
  Goodmanham:
   { 'Other': '1.4',
     'UKIP': '17.9',
     'Labour': '20.7',
     'Conservative': '50.6',
     'Liberal Democrat': '5.9',
     'Green Party': '3.5',
     'Plaid Cymru': '0',
     'TUSC': '0',
     'Independent': '0',
     'Monster Raving Loony Party': '0',
     'Cannabis Is Safer Than Alcohol': '0',
     'English Democrats': '0',
     'Christian Peoples Alliance': '0' 
   } 
 }


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

// console.log(chiSquare(voteData));