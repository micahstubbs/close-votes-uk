var fs = require('fs');
var jf = require('jsonfile')
var d3 = require('d3');
var _ = require('lodash');

var file = 'uk2015.csv'

fs.readFile(file, 'utf8', function (err, data) {
  
  data2 = d3.csv.parse(data);

  var data3 = {};
  // build a list of buas we have seen before
  var bc = []

  // loop through the whole dataset 
  for(var i=50; i<data2.length; i++){
    var b = data2[i]["BUA11NM"];
    var pop = data2[i]["buaPopulation"];
    
    // if we have not seen this bua before 
    // build an array p of constiuencies for this bua
    if(!_.includes(bc,b)){

    var pcon = [];
  
      bc.push(b);
      //console.log(bc);

      // loop through the whole dataset again
      // find all of the parliamentary constiuencies
      // associated with a built-up area
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

  //console.log(data3);

  // sort the buas by population and assign a rank

  // http://stackoverflow.com/questions/13758467/how-do-i-sort-a-json-object-by-a-nested-value 
  
  // First create the array of keys/net_total so that we can sort it:
  var sort_array = [];
  for (i in data3) {
      sort_array.push({
        key:i,
        pop:data3[i]["pop"]
      });
  }

  // Now sort it:
  sort_array.sort(function(a, b) {
    return b.pop - a.pop;
  })

  //console.log(sort_array);

  // constiuencies mapped to the larged bua they overlap with
  // assigned constiuencies 
  var ac = [];

  // Now process that object with it:
  for (var i=0; i<sort_array.length; i++) {
    var bua = data3[sort_array[i].key];
    
    // now do stuff with each item

    // loop over list of constiuencies for each bua
    for(var j=0; j<bua.cons.length; j++){
      var con = bua.cons[j];
      // if the constiuency is in the list of 
      // already assigned constiuencies, 
      // remove the constituency from this bua
      if(_.includes(ac,con)){
        if (j > -1) {
          bua.cons.splice(j, 1);
        }
      }
      // if not, add it to the list of
      // assigned constiuencies
      else {
        ac.push(con);
      }
    }
  }

  // remove all small buas that no longer have 
  // constiuencies assigned to them
  for (var key in data3) {
    if (data3.hasOwnProperty(key)) {
      console.log(key);
      if (data3[key]["cons"].length === 0){
        delete data3[key];
      }
    }
  }

  var outputFile = '002.json'

  var outputJsonObj = data3;

  jf.writeFile(outputFile, outputJsonObj, function(err){
  console.log(err)
  })

})