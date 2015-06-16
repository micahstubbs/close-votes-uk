var fs = require('fs'),
    jf = require('jsonfile'),
    d3 = require('d3'),
    _ = require('lodash');

// the goal of this script is to generate
// a list of English and Welsh Built Up Areas mapped to 
// UK parlimentary constituencies
// as implemented this runs too long

var csvfile1 = '00-oa-to-bua.csv',
    csvfile2 = '00-oa-to-pcon.csv';

// test if there are any output areas 
// with more than one constituency 
// associated with them

// output areas to built up areas
var buaToOA = d3.csv.parse(fs.readFileSync(csvfile1, 'utf8'));
// output areas to constituencies
var pconToOA = d3.csv.parse(fs.readFileSync(csvfile2, 'utf8'));


// test if there are any output areas 
// with more than one constituency 
// associated with them
// code runs too long - refactor this
/*
var OAs = _.pluck(pconToOA, 'OA11CD');
var totalOAsCount = OAs.length;
var uniqueOAsCount =  _.uniq(OAs).length;
console.log("total Output Areas observed " + totalOAsCount);
console.log("unique Output Areas observed " + uniqueOAsCount);
*/


var ojo = [];

// create a unique list of built of areas
var buas = _.uniq(buaToOA.map(function(el){
  return el["BUA11NM"].replace(/\sBUA/,"");
}));

var buaObj = {};

// loop through all built up area to 
// output area mappings
buaToOA.forEach(function(b){
  // loop through all constituency to 
  // output area mappings
  pconToOA.forEach(function(p){
    // if the output area matches
    if(b["OA11CD"] == p["OA11CD"]){
      // we already seen this built up area, add 
      // the constituency to it
      if(buaObj.hasOwnProperty(b["BUA11NM"])){
        buaObj[el["BUA11NM"]][p["PCON11CD"]] = 1;
      } 
    }
  })
})

// convert to a nice array of objects
for(bua in buaObj){
  //buaObj[bua] = _.uniq(buaObj[bua]);
  ojo.push({
    "bua": bua,
    "conIDs": Object.keys(buaObj[bua])
  })
}




var outputFile = '00.json';
var outputJsonObj = ojo;

jf.writeFile(outputFile, outputJsonObj, function(err){
  console.log(err)
})