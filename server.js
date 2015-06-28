var AV = require('leanengine');

var APP_ID = process.env.LC_APP_ID;
var APP_KEY = process.env.LC_APP_KEY;
var MASTER_KEY = process.env.LC_APP_MASTER_KEY;

AV.initialize(APP_ID, APP_KEY, MASTER_KEY);

var app = require('./app');
var PORT = parseInt(process.env.LC_APP_PORT || 3000);

var server = app.listen(PORT, function () {
	console.log("The server is listening: " + PORT);
});