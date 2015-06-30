var fs = require('fs');
var jf = require('jsonfile')
var d3 = require('d3');
var _ = require('lodash');

var csvfile = '00-uk-election-results-2015.csv'

var data = d3.csv.parse(fs.readFileSync(csvfile, 'utf8'));

data.forEach(function(el, idx, arr){
  var con = el['constituency'];
  con = con.replace(/[&]/, 'and');
  if(con === 'Ealing Southall') con = 'Ealing, Southall';
  if(con === 'Enfield Southgate') con = 'Enfield, Southgate';
  




  arr[idx]['PCON11NM'] = con;
})

var outputJsonObj = data;

var outputFile = '006-uk-election-results-2015.json'
jf.writeFile(outputFile, outputJsonObj, function(err){
  console.log(err)
})













