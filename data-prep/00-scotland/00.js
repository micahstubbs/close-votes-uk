var fs = require('fs'),
    jf = require('jsonfile'),
    d3 = require('d3'),
    _ = require('lodash');

// the goal of this script is to generate
// a list of Scottish settlements and 
// UK parlimentary constituencies

var csvfile1 = '00-02-local-districts-cons-2012.csv',
    csvfile2 = '00-02-settlement-list-scotland-2012.csv';

// councils to constituencies
var cc = d3.csv.parse(fs.readFileSync(csvfile1, 'utf8'));
// settlements to councils
var sc = d3.csv.parse(fs.readFileSync(csvfile2, 'utf8'));

//console.log(cc[0]);
//console.log(sc[0]);

var ojo = [];

scKeys = Object.keys(sc);
ccKeys = Object.keys(cc);

var i = scKeys.length;


while(i--){
  ojo[i] = sc[i];
  ojo[i]['cons'] = [];
  var j = ccKeys.length;
  while(j--){
    //console.log(j);
    //console.log(cc[j]);
    if(sc[i]['councilAreaCode'] === cc[j]['LAD12CD']){
      ojo[i]['cons'].push(cc[j]['PCON12NM']);
    }
  }
}

var outputFile = '00.json'
var outputJsonObj = ojo;

jf.writeFile(outputFile, outputJsonObj, function(err){
  console.log(err)
})





