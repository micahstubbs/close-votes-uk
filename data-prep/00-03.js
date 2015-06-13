var fs = require('fs');
var jf = require('jsonfile')
var d3 = require('d3');
var _ = require('lodash');

// add the population data for each settlement

var csvfile = '00-03-settlement-population-scotland-2012.csv';
var jsonfile = '00-02.json';

// settlement population
var sp = d3.csv.parse(fs.readFileSync(csvfile, 'utf8'));
var data = JSON.parse(fs.readFileSync(jsonfile, 'utf8'));

var spKeys = Object.keys(sp),
    dataKeys = Object.keys(data);

// outputJsonObj
var ojo = [];
var s = null;

var i = dataKeys.length;
var k = 0;
while(i--){
  // to get  objects with unique values for the settlementName property
  if(data[i]['settlementName'] != s){
    //append cons to existing object
    ojo[k] = {};
    ojo[k]['metro'] = data[i]['settlementName'];
    ojo[k]['cons'] = data[i]['cons'];
    var j = spKeys.length;
    while(j--){
      //console.log(j);
      //console.log(cc[j]);
      if(data[i]['settlementCode'] === sp[j]['settlementCode']){
        // spop for settlement population
        ojo[k]['spop'] = parseFloat(sp[j]['allAges'].replace(/,/g,''));
      }
    }
    k++;
  }
  s = data[i]['settlementName'];
}

// sort the metros in descending order by
// settlement population
ojo.sort(function(a,b){
  if (a['spop'] < b['spop'])
    return 1;
  if (a['spop'] > b['spop'])
    return -1;
  return 0;
})

var outputJsonObj = ojo;

var outputFile = '00-03.json'
jf.writeFile(outputFile, outputJsonObj, function(err){
  console.log(err)
})
