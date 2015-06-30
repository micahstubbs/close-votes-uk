var fs = require('fs');
var jf = require('jsonfile')
var d3 = require('d3');
var _ = require('lodash');

var jsonfile1 = '002.json',
    jsonfile2 = '../00-northern-ireland/00.json'
    jsonfile3 = '../00-scotland/04.json'
    csvfile1 = '00-pop-by-con-england-wales.csv',
    csvfile2 = "00-pop-by-con-northern-ireland.csv",
    csvfile3 = "00-pop-by-con-scotland.csv";

// the goal of this script is to lookup population by
// constituency and assign the sum to each metro

var dataEW = JSON.parse(fs.readFileSync(jsonfile1, 'utf8')),
    dataNI = JSON.parse(fs.readFileSync(jsonfile2, 'utf8')),
    dataS = JSON.parse(fs.readFileSync(jsonfile3, 'utf8')),
    data = dataEW.concat(dataNI, dataS),
    popDataEW = d3.csv.parse(fs.readFileSync(csvfile1, 'utf8')),
    popDataNI = d3.csv.parse(fs.readFileSync(csvfile2, 'utf8')),
    popDataS = d3.csv.parse(fs.readFileSync(csvfile3, 'utf8')),
    popData = popDataEW.concat(popDataNI, popDataS);

var initialSum = _.sum(data, function(object){
  return Number(object.pop);
});
  
var byCon = {};

popData.forEach(function(el){
  byCon[el['PCON11NM']] = el['population']; 
})

consToReview = [];

data.forEach(function(el){
  var sum = 0;
  el.cons.forEach(function(con){
    if(byCon[con] === undefined){
      consToReview.push(con);
    } else {
      sum += Math.round(Number(byCon[con]));
    }
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
console.log(initialSum + " is the sum for England and Wales from the aggregated data read in"); 

var diff = sourceSum - calculatedSum
console.log(diff + " is the difference between the source total and the calculated total");
// this constituency has a population equal to the difference
//W07000041,Ynys Môn,70091

// some problem with nonstandard characters and arrays?

var outputFile = '003-consToReview.json'

var outputJsonObj = consToReview;

jf.writeFile(outputFile, outputJsonObj, function(err){
  console.log(err)
})

var outputFile = '003.json'

var outputJsonObj = data;

jf.writeFile(outputFile, outputJsonObj, function(err){
  console.log(err)
})



