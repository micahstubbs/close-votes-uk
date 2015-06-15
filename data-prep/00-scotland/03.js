var fs = require('fs');
var jf = require('jsonfile')
var d3 = require('d3');
var _ = require('lodash');

// goals of this script:
// remove constituencies that are already assigned to a larger
// settlement.
// remove settlements that no long have constituencies
// assigned 

var jsonfile = '02.json';

var data = JSON.parse(fs.readFileSync(jsonfile, 'utf8')),
		assignedCons = {};
		ojo = data;

ojo.forEach(function(el){
	var i = el['cons'].length;
	while(i--){
		if(assignedCons.hasOwnProperty(el['cons'][i]))
			_.pullAt(el['cons'],i)
		else
			assignedCons[el['cons'][i]] = 1;
	}
});

var j = ojo.length;
while(j--){
	if(ojo[j]['cons'].length == 0)
		_.pullAt(ojo, j)
}

var outputJsonObj = ojo;

var outputFile = '03.json'
jf.writeFile(outputFile, outputJsonObj, function(err){
  console.log(err)
})
