var express 		= require("express");
var	app 				= express();
var	bodyParser 	= require("body-parser");
var	path 				= require("path");
var	mongoose 		= require("mongoose");

var flash 				= require('connect-flash');
var morgan 				= require('morgan');
var cookieParser 	= require('cookie-parser');
var session 			= require('express-session');
// var socket 				= require('socket.io');

//Start: Twilio====================================================
var client = require('twilio')('AC504375ef36ecd1dc24af33f4b184022a', '5bb9215c1bba75ebbdc5ebdbed483fb8');
// console.log("twilio client", client);

var twilioAPI = require('twilio-api');
// console.log("twilioAPI server:", twilioAPI);
var cli = new twilioAPI.Client('AC504375ef36ecd1dc24af33f4b184022a', '5bb9215c1bba75ebbdc5ebdbed483fb8');
// console.log("server twilio object:", cli)

//tell twilio-api to intercept incoming HTTP requests.
var test = app.use(cli.middleware() );
//End: Twilio====================================================

//requiring mongoose.js which links all of the the mongo schemas or models
require('./server/config/mongoose.js');
require('./server/config/twilio.js');

var passport = require('./server/config/passport.js');

app.use(express.static(path.join(__dirname, "./clients/static")));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(morgan('dev')); //logs every request to console
app.use(cookieParser()); //read cookies (needed for auth)

app.use(session({ secret: 'tabbs' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

hostname = process.env.HOSTNAME || 'localhost', port = 8080;
console.log("Simple static server listening at http://" + hostname + ":" + port);
var server = app.listen(port, hostname);
var io = require("socket.io").listen(server);
require('./server/config/routes.js')(app, passport, client, io);
