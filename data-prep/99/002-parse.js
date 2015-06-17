var fs = require('fs');
var jf = require('jsonfile')
var d3 = require('d3');
var _ = require('lodash');

var csvfile1 = '00-uk2015.csv',
    csvfile2 = '00-pop-by-con-england-wales.csv';

// the goal of this script is to generate a unique list of metros
// sorted by population
// with each parliamentary constituency assigned to 
// the largest population metro it coincides with

var data = d3.csv.parse(fs.readFileSync(csvfile1, 'utf8')),
    popData = d3.csv.parse(fs.readFileSync(csvfile2, 'utf8'));
  
  

  // will use 'metro' to refer to
  // 'builtup area' for England and Wales
  // 'settlement' for Scotland
  // metropolitan districts or large settlements for Northern Ireland 

  var outputData = [];
  // build a list of metros accounted for 
  // we need to do this because metros are not unique rows
  var maf = [];

  var metros = [];
  for(var i=0; i<data.length; i++){
    metros.push(data[i]["BUA11NM"]);
  }

  metros = _.uniq(metros);
  metros = metros.sort()
  //console.log(metros);


  // loop through the list of unique metros 
  for(var i=0; i<metros.length; i++){
    var outerMetro = metros[i],
        cons = [];
        pop = null;

    // now we loop through the whole dataset 
    // and find all of the parliamentary constituencies
    // associated with a metro
    for(var j=0; j<data.length; j++) {
      var innerMetro = data[j]["BUA11NM"];
          
      if(innerMetro === outerMetro){
        cons.push(data[j]["PCON11NM"]);
        pop = data[j]["metroPopulation"];
      }
    }
    cons = _.uniq(cons);

    outputData[i] = {};
    outputData[i]["metro"] = outerMetro; 
    outputData[i]["pop"] = pop;
    outputData[i]["cons"] = cons;

  }

  // sort the metros by population and assign a rank
  outputData.sort(function(a, b) {
    return b.pop - a.pop;
  })

  // now we assign constituencies to the largest metro they coincide with

  // new empty array of assigned constituencies 
  var ac = [];

  var popByCon = {};

  var m = popData.length;
  while(m--){
    //console.log(popData[m]['PCON11NM']);
    //console.log(popData[m]['population']);
    popByCon[popData[m]['PCON11NM']] = popData[m]['population'];
  }
  

  for (var i=0; i<outputData.length; i++){
    cons = outputData[i]['cons'];
    //console.log(cons);
    
    // loop over the array of constituencies for each metro
    // http://stackoverflow.com/questions/9882284/looping-through-array-and-removing-items-without-breaking-for-loop
    var j = cons.length;
    while(j--){
      var con = cons[j];

      // if the constituency is already assigned to a 
      // larger metro 
      // remove the constituency from this metro
      if(_.includes(ac,con)){
        //console.log(outputData[i]["metro"]);
        //console.log("already assigned " + con);
        if (j > -1) {
          //console.log(Array.isArray(outputData[i]['cons'])) 
          outputData[i]['cons'].splice(j, 1);

        
        }
        // subtract the population of the removed constituency
        // from the metro population          
        var metroPop = outputData[i]['pop'];
        var currentMetro = outputData[i]['metro'];
        var conPop = popByCon[outputData[i]['metro']];
        //console.log(metroPop);
        //console.log(currentMetro);
        //console.log(conPop);
        //console.log(outputData[i])
        //outputData[i]['pop'] = parseFloat(outputData[i]['pop']) - parseFloat(popByCon[outputData[i]['metro']]);
      }
      // if not, add it to the list of
      // assigned constituencies
      else {
        ac.push(con);
      }
      //console.log(ac.length);
    }
    
  }
  //console.log(ac);

  // remove all small metros that no longer have 
  // constituencies assigned to them
  var i = outputData.length;
  while(i--){
    //console.log(i);
    //console.log(outputData[i]["cons"].length);
    if (outputData[i]["cons"].length === 0){
        if (i > -1) {
          //console.log(Array.isArray(outputData));
          outputData.splice(i, 1);
        }
    }
  }
  

  var outputFile = '002.json'

  var outputJsonObj = outputData;

  jf.writeFile(outputFile, outputJsonObj, function(err){
  console.log(err)
  })



