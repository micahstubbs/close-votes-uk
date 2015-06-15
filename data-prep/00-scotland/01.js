var fs = require('fs'),
    jf = require('jsonfile'),
    d3 = require('d3'),
    _ = require('lodash');

// the goal of this script is to 
// consolidate settlements objects
// concatenating constituency arrays
// and ignoring councils that are 
// different

var jsonfile = '00.json',
    data = JSON.parse(fs.readFileSync(jsonfile, 'utf8')),
    ojo = [];

var settlements = data.map(function(el){
  return el.settlementName;
})

// console.log(settlements)

settlements = _.uniq(settlements);


settlements.forEach(function(s){
  var subset = data.filter(function(obj){
    return obj.settlementName == s ? true : false;
  })
  var cons = _.uniq(_.flatten(_.pluck(subset, 'cons')));
  ojo.push({
    "settlementName": s,
    "cons": cons
  })
});

// remove text from settlement names
// " (part)"
// ", Settlement of"

ojo.forEach(function(s){
  s['settlementName'] = s['settlementName'].replace(/\,\sSettlement\sof/,"").replace(/\s\(part\)/,"");
})

var outputFile = '01.json'
var outputJsonObj = ojo;

jf.writeFile(outputFile, outputJsonObj, function(err){
  console.log(err)
})





