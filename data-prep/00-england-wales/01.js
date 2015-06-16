var fs = require('fs'),
    jf = require('jsonfile'),
    d3 = require('d3'),
    _ = require('lodash');

// the goal of this script is to generate
// a list of UK parlimentary constituencies
// mapped to the largest 
// English and Welsh Built Up Areas mapped to 
// the largest metro (built up area) they
// coincide with

var csvfile1 = '01-metros-cons-england-wales.csv',
    csvfile2 = '01-pop-by-con-england-wales.csv';

// test if there are any output areas 
// with more than one constituency 
// associated with them

// constituencies associated with metros
var data = d3.csv.parse(fs.readFileSync(csvfile1, 'utf8'));
// population by constituency
var population = d3.csv.parse(fs.readFileSync(csvfile2, 'utf8'));

var ojo = [];





var outputFile = '01.json';
var outputJsonObj = ojo;

jf.writeFile(outputFile, outputJsonObj, function(err){
  console.log(err)
})