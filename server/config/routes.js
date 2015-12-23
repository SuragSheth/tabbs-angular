var admin       = require('../controllers/admin.js');
var businesses  = require('../controllers/businesses.js');
var messages    = require('../controllers/messages.js');
var twilio      = require('twilio')



module.exports = function(app, passport, client, io) {
    io.sockets.on('connection', function (socket) {
        console.log("WE ARE USING SOCKETS!");
        console.log(socket.id);
        //all the socket code goes in here!


// Start: routes for businesses =========================
    app.get('/dashboard', function(req, res){
        console.log("routes succesful add:", req.user)
        res.json(req.user);
    })
    app.post('/business/new', passport.authenticate('local-signup', {
        successRedirect : '/dashboard', // redirect to the secure profile section
        failureRedirect : '/signup', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }))

    app.post('/business/login', passport.authenticate('local-login', {
        successRedirect : '/dashboard', // redirect to the secure profile section
        failureRedirect : '/login', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }))
// End: routes for businesses =========================
// Start: routes for twilio ============================
    // app.get('/test_twilio', function(req, res){
    //     client.sendMessage({
    //         to:'+14084600740',
    //         from:'+14156897280',
    //         body:'message from nodejs'
    //     }, function(error, message) {
    //         if (!error) {
    //             console.log('Success! The SID for this SMS message is:', message);
    //             console.log(message.sid);
    //             console.log('Message sent on:');
    //             console.log(message.dateCreated);
    //         } else {
    //             console.log('Oops! There was an error.');
    //         }
    //     });
    // });

    //incoming text from consumer
    app.post('/get_message', function(req, res, next){
        //Check if incoming message is to existing business. Check if tabb is already created.
        //Create Tabb and save message to database.
        messages.incoming_message(req, res);
        //emit message to angular controller
        socket.broadcast.emit("user_to_business", req.body);
        console.log("get_message", req.body);

         // console.log(req.method, req.url);
    })

    app.post('/business_tabbs', function(req, res){
        console.log("IN ROUTES", req.body);
        messages.get_business_messages(req, res);
    })



    socket.on('test_new_client', function(data){
        console.log("in routes, message from client", data);
        client.sendMessage({
            to: '+14084600740',
            from: '+15106483326',
            body: data.content
            }, function(error, message){
            if(!error) {
                console.log('Success! The SID for this SMS message is:', message);
                console.log(message.sid);
                console.log('Message sent on:');
                console.log(message.dateCreated);
            } else {
                console.log("error with sending message");
            }
        })
    })
// End: routes for twilio ============================
    })
}
