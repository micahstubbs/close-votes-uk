var fs = require('fs');
var jf = require('jsonfile')
var file = '003.json'
var jsonObj = JSON.parse(fs.readFileSync(file, 'utf8'))
var outputJsonObj = {};

var keys = [];
for(var k in jsonObj) keys.push(k);

outputJsonObj[0] = keys;

var outputFile = '004.json'
jf.writeFile(outputFile, outputJsonObj, function(err){
  console.log(err)
})