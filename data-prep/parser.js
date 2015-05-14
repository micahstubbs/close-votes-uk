// parser.js
var Transform = require('stream').Transform
	, csv = require('csv-streamify')
	, JSONStream = require('JSONStream');

var csvToJson = csv({objectMode: true});

var parser = new Transform({objectMode: true});
parser.header = null;
parser._rawHeader = [];
parser._transform = function(data, encoding, done) {
  if (!this.header) {
  	this._rawHeader.push(data);
		if (data[0] === 'Index') {
			// We reached the last line of the header
			this.header = this._rawHeader;
			this.push({header: this.header});
		}
	}
	// After parsing the header, push data rows
	else {
		this.push({row: data});
	}
	done();
};

var jsonToStrings = JSONStream.stringify(false);

// Pipe the streams
process.stdin
	.pipe(csvToJson)
	.pipe(parser)
	.pipe(jsonToStrings)
	.pipe(process.stdout);


