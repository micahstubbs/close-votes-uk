var fs = require('fs');
var jf = require('jsonfile')
var file = '../002.json'
var jsonObj = JSON.parse(fs.readFileSync(file, 'utf8'))
var outputJsonObj = {};

// generate an array of metros for debugging
var metros = [];
var i = jsonObj.length;
while(i--){
	metros.push(jsonObj[i]['metro']);
}

outputJsonObj = metros;

var outputFile = '004.json'
jf.writeFile(outputFile, outputJsonObj, function(err){
  console.log(err)
})