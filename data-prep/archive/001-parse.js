var fs = require('fs');
var jf = require('jsonfile')
var d3 = require('d3');
var _ = require('lodash');

var file = '000-uk2015.csv'

fs.readFile(file, 'utf8', function (err, csvdata) {
  
  data = d3.csv.parse(csvdata);

  var outputData = {};
  // bc for 'bua checked' for constituencies
  var bc = []

  for(var i=50; i<data.length; i++){
    var outerMetro = data[i]["BUA11NM"];
    var pop = data[i]["metroPopulation"];
    
    // if we have not seen this bua before 
    // build an array p of constituencies for this bua
    if(!_.includes(bc,b)){

    var pcon = [];
  
      bc.push(b);
      //console.log(bc);
           
      // loop over all metros 
      // each time the     
      for(var k=0; k<data.length; k++) {
        var innerMetro = data[k]["BUA11NM"];
        if(innerMetro === outerMetro){
          pcon.push(data[k]["PCON11NM"]);
        }
      }
      pcon = _.uniq(pcon);
      //console.log(p);
      outputData[b] = {};
      outputData[b]["cons"] = pcon;
      outputData[b]["pop"] = pop;
    }
  }

  console.log(outputData);

  var outputFile = '001.json'
  var outputJsonObj = outputData;

  jf.writeFile(outputFile, outputJsonObj, function(err){
  console.log(err)
  })

})