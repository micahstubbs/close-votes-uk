var fs = require('fs');
var jf = require('jsonfile')
var d3 = require('d3');
var _ = require('lodash');

var file = 'uk2015.csv'

fs.readFile(file, 'utf8', function (err, data) {
  
  data2 = d3.csv.parse(data);

  var data3 = {};
  // bc for bua checked for constituencies
  var bc = []

  for(var i=50; i<data2.length; i++){
    var b = data2[i]["BUA11NM"];
    var pop = data2[i]["buaPopulation"];
    
    // if we have not seen this bua before 
    // build an array p of constiuencies for this bua
    if(!_.includes(bc,b)){

    var pcon = [];
  
      bc.push(b);
      //console.log(bc);
           
      for(var k=0; k<data2.length; k++) {
        if(data2[k]["BUA11NM"] === b){
          pcon.push(data2[k]["PCON11NM"]);
        }
      }
      pcon = _.uniq(pcon);
      //console.log(p);
      data3[b] = {};
      data3[b]["cons"] = pcon;
      data3[b]["pop"] = pop;
    }
  }

  console.log(data3);

  var outputFile = '001.json'
  var outputJsonObj = data3;

  jf.writeFile(outputFile, outputJsonObj, function(err){
  console.log(err)
  })

})