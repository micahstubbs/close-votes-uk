var fs = require('fs');
var jf = require('jsonfile')
var d3 = require('d3');
var _ = require('lodash');

var csvfile = '00-uk-election-results-2015.csv'

var data = d3.csv.parse(fs.readFileSync(csvfile, 'utf8'));

data.forEach(function(el, idx, arr){
  var con = el['constituency'];

  // going to brute-force this by manually mapping names
  if(con === 'Ealing Southall') con = 'Ealing, Southall';
  if(con === 'Enfield Southgate') con = 'Enfield, Southgate';
  if(con === 'Hertfordshire South West') con = 'South West Hertfordshire';  
  if(con === 'Lewisham Deptford') con = 'Lewisham, Deptford'; 
  if(con === 'Surrey East') con = 'East Surrey'; 
  if(con === 'Surrey South West') con = 'South West Surrey'; 
  if(con === 'Uxbridge & Ruislip South') con = 'Uxbridge and South Ruislip'; 
  if(con === 'Manchester Gorton') con = 'Manchester, Gorton'; 
  if(con === 'Manchester Withington') con = 'Manchester, Withington'; 
  if(con === 'Birmingham Edgbaston') con = 'Birmingham, Edgbaston'; 
  if(con === 'Birmingham Erdington') con = 'Birmingham, Erdington'; 
  if(con === 'Birmingham Hall Green') con = 'Birmingham, Hall Green';
  if(con === 'Birmingham Hodge Hill') con = 'Birmingham, Hodge Hill';
  if(con === 'Birmingham Ladywood') con = 'Birmingham, Ladywood';
  if(con === 'Birmingham Northfield') con = 'Birmingham, Northfield';
  if(con === 'Birmingham Perry Barr') con = 'Birmingham, Perry Barr';
  if(con === 'Birmingham Selly Oak') con = 'Birmingham, Selly Oak';
  if(con === 'Birmingham Yardley') con = 'Birmingham, Yardley';
  if(con === 'Staffordshire South') con = 'South Staffordshire';
  if(con === 'Southampton Itchen') con = 'Southampton, Itchen';
  if(con === 'Southampton Test') con = 'Southampton, Test';
  if(con === 'Liverpool Riverside') con = 'Liverpool, Riverside';
  if(con === 'Liverpool Walton') con = 'Liverpool, Walton';
  if(con === 'Liverpool Wavertree') con = 'Liverpool, Wavertree';
  if(con === 'Liverpool West Derby') con = 'Liverpool, West Derby';
  if(con === 'Derbyshire Mid') con = 'Mid Derbyshire';
  if(con === 'Derbyshire North East') con = 'North East Derbyshire';
  if(con === 'Sheffield Brightside & Hillsborough') con = 'Sheffield, Brightside and Hillsborough';
  if(con === 'Sheffield Hallam') con = 'Sheffield, Hallam';
  if(con === 'Sheffield Heeley') con = 'Sheffield, Heeley';
  if(con === 'Somerset North') con = 'North Somerset';
  if(con === 'Somerset North East') con = 'North East Somerset';
  if(con === 'Tyneside North') con = 'North Tyneside';
  if(con === 'Leicestershire South') con = 'South Leicestershire';
  if(con === 'Sussex Mid') con = 'Mid Sussex';
  if(con === 'Hampshire East') con = 'East Hampshire';
  if(con === 'Hampshire North East') con = 'North East Hampshire';
  if(con === 'Brighton Kemptown') con = 'Brighton, Kemptown';
  if(con === 'Brighton Pavilion') con = 'Brighton, Pavilion';
  if(con === 'Worthing East & Shoreham') con = 'East Worthing and Shoreham';
  if(con === 'Durham North') con = 'North Durham';
  if(con === 'Warwickshire North') con = 'North Warwickshire';
  if(con === 'Dorset Mid & Poole North') con = 'Mid Dorset and North Poole';
  if(con === 'Middlesbrough South & Cleveland East') con = 'Middlesbrough South and East Cleveland';
  if(con === 'Hull East') con = 'Kingston upon Hull East';
  if(con === 'Hull North') con = 'Kingston upon Hull North';
  if(con === 'Hull West & Hessle') con = 'Kingston upon Hull West and Hessle';
  if(con === 'Bedfordshire Mid') con = 'Mid Bedfordshire';
  if(con === 'Bedfordshire South West') con = 'South West Bedfordshire';
  if(con === 'Suffolk Central & Ipswich North') con = 'Central Suffolk and North Ipswich';
  if(con === 'Suffolk South') con = 'South Suffolk';
  if(con === 'Derbyshire South') con = 'South Derbyshire';
  if(con === 'Northamptonshire South') con = 'South Northamptonshire';
  if(con === 'Norfolk South') con = 'South Norfolk';
  if(con === 'Basildon South & Thurrock East') con = 'South Basildon and East Thurrock';
  if(con === 'Cambridgeshire South') con = 'South Cambridgeshire';
  if(con === 'Cambridgeshire South East') con = 'South East Cambridgeshire';
  if(con === 'Cambridgeshire North West') con = 'North West Cambridgeshire';
  if(con === 'Bedfordshire North East') con = 'North East Bedfordshire';
  if(con === 'Hampshire North West') con = 'North West Hampshire';
  if(con === 'Swindon North') con = 'North Swindon';
  if(con === 'Swindon South') con = 'South Swindon';
  if(con === 'Wiltshire North') con = 'North Wiltshire';
  if(con === 'Hertfordshire North East') con = 'North East Hertfordshire';
  if(con === 'Lancashire West') con = 'West Lancashire';
  if(con === 'Devon Central') con = 'Central Devon';
  if(con === 'Devon East') con = 'East Devon';
  if(con === 'Leicestershire North West') con = 'North West Leicestershire';
  if(con === 'Harwich & Essex North') con = 'Harwich and North Essex';
  if(con === 'Devon South West') con = 'South West Devon';
  if(con === 'Plymouth Moor View') con = 'Plymouth, Moor View';
  if(con === 'Plymouth Sutton & Devonport') con = 'Plymouth, Sutton and Devonport';
  if(con === 'Worcestershire Mid') con = 'Mid Worcestershire';
  if(con === 'Worcestershire West') con = 'West Worcestershire';
  if(con === 'Wrekin, The') con = 'The Wrekin';
  if(con === 'Chester, City of') con = 'City of Chester';
  if(con === 'Suffolk West') con = 'West Suffolk';
  if(con === 'Cambridgeshire North East') con = 'North East Cambridgeshire';
  if(con === 'Norfolk South West') con = 'South West Norfolk';
  if(con === 'Bridgwater & Somerset West') con = 'Bridgwater and West Somerset';
  if(con === 'Thanet North') con = 'North Thanet';
  if(con === 'Cotswolds, The') con = 'The Cotswolds';
  if(con === 'Wiltshire South West') con = 'South West Wiltshire';
  if(con === 'Dorset North') con = 'North Dorset';
  if(con === 'Dorset West') con = 'West Dorset';
  if(con === 'Thanet South') con = 'South Thanet';
  if(con === 'Durham North West') con = 'North West Durham';
  if(con === 'Durham, City of') con = 'City of Durham';
  if(con === 'Dorset South') con = 'South Dorset';
  if(con === 'Hereford & Herefordshire South') con = 'Hereford and South Herefordshire';
  if(con === 'Herefordshire North') con = 'North Herefordshire';
  if(con === 'Norfolk North') con = 'North Norfolk';
  if(con === 'Shropshire North') con = 'North Shropshire';
  if(con === 'Carmarthen West & Pembrokeshire South') con = 'Carmarthen West and South Pembrokeshire';
  if(con === 'Norfolk Mid') con = 'Mid Norfolk';
  if(con === 'Yorkshire East') con = 'East Yorkshire';
  if(con === 'Devon West & Torridge') con = 'Torridge and West Devon';
  if(con === 'Norfolk North West') con = 'North West Norfolk';
  if(con === 'Devon North') con = 'North Devon';
  if(con === 'Cornwall North') con = 'North Cornwall';
  if(con === 'Cornwall South East') con = 'South East Cornwall';
  if(con === 'Dunbartonshire East') con = 'East Dunbartonshire';
  if(con === 'Renfrewshire East') con = 'East Renfrewshire';
  if(con === 'Dunbartonshire West') con = 'West Dunbartonshire';
  if(con === 'Linlithgow & Falkirk East') con = 'Linlithgow and East Falkirk';
  if(con === 'Fife North East') con = 'North East Fife';
  if(con === 'Ayrshire Central') con = 'Central Ayrshire';
  if(con === 'Ayrshire North & Arran') con = 'North Ayrshire and Arran';
  if(con === 'Aberdeenshire West & Kincardine') con = 'West Aberdeenshire and Kincardine';
  if(con === 'Na h-Eileanan an Iar (Western Isles)') con = 'Na h-Eileanan an Iar';

  con = con.replace(/[&]/, 'and');
  arr[idx]['PCON11NM'] = con;
})

var outputJsonObj = data;

var outputFile = '006-uk-election-results-2015.json'
jf.writeFile(outputFile, outputJsonObj, function(err){
  console.log(err)
})













