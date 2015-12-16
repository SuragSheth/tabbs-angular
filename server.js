var express 		= require("express");
var	app 				= express();
var	bodyParser 	= require("body-parser");
var	path 				= require("path");
var	mongoose 		= require("mongoose");

var flash 				= require('connect-flash');
var morgan 				= require('morgan');
var cookieParser 	= require('cookie-parser');
var session 			= require('express-session');



var client = require('twilio')('AC670d3df5dd79de701231ba87193b2784', '660c8a5b153bcaf1c047a215601fce63');
// console.log("twilio client", client);


var twilioAPI = require('twilio-api');
// console.log("twilioAPI server:", twilioAPI);
var cli = new twilioAPI.Client('AC670d3df5dd79de701231ba87193b2784', '660c8a5b153bcaf1c047a215601fce63');
console.log("server twilio object:", cli)

//OK... good so far. Now tell twilio-api to intercept incoming HTTP requests.
var test = app.use(cli.middleware() );



hostname = process.env.HOSTNAME || 'localhost', port = 8080;

// We are requiring mongoose.js which links all of the the mongo schemas or models
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

require('./server/config/routes.js')(app, passport, client);

var messages = [];
var users = {};




// We are starting the server & logging on the terminal where it is listening at
console.log("Simple static server listening at http://" + hostname + ":" + port);

var io = require('socket.io').listen(server);

var server = app.listen(port, hostname);

io.sockets.on('connection', function (socket) {
	console.log("Socket created!");

	socket.on("new_user", function(data){
		users[socket.id] = data.name;
		socket.emit("initial_messages", {messages: messages});
		var new_message = data.name + " has join the chat!";
		messages.push(new_message);
		console.log(messages);
		socket.broadcast.emit("user_connected", {message: new_message});
	})

	socket.on("message_submit", function(data) {
		messages.push(data.message);
		io.emit("new_message", {message: data.message});
	})

	socket.on("disconnect", function(){
		var new_message = users[socket.id] + " has disconnected!";
		socket.broadcast.emit("user_disconnected", {message: new_message});
	})

})


