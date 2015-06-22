var fs = require('fs');
var jf = require('jsonfile')
var d3 = require('d3');
var _ = require('lodash');

var jsonfile = '002.json',
    csvfile = '00-pop-by-con-england-wales.csv';

// the goal of this script is to lookup population by
// constituency and assign the sum to each metro

var data = JSON.parse(fs.readFileSync(jsonfile, 'utf8')),
    popData = d3.csv.parse(fs.readFileSync(csvfile, 'utf8'));

var initialSum = _.sum(data, function(object){
  return Number(object.pop);
});
  
var byCon = {};

popData.forEach(function(el){
  byCon[el['PCON11NM']] = el['population']; 
})

data.forEach(function(el){
  var sum = 0;
  el.cons.forEach(function(con){
    sum += Math.round(Number(byCon[con]));
  })
  el.pop = sum;
})

//sanity check by comparing total populations
var sourceSum = _.sum(popData, function(object) {
  return object.population;
});

var calculatedSum = _.sum(data, function(object){
  return object.pop;
});

console.log(sourceSum + " is the total population from the source data");
console.log(calculatedSum + " is the calculated total population");
console.log(initialSum + " is the sum from the aggregated data read in"); 

var diff = sourceSum - calculatedSum
console.log(diff + " is the difference between the source total and the calculated total");
// this constituency has a population equal to the difference
//W07000041,Ynys Môn,70091

// some problem with nonstandard characters and arrays?

var outputFile = '003.json'

var outputJsonObj = data;

jf.writeFile(outputFile, outputJsonObj, function(err){
  console.log(err)
})



