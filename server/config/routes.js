var admin       = require('../controllers/admin.js');
var businesses  = require('../controllers/businesses.js');
var messages    = require('../controllers/messages.js');
var twilio      = require('twilio')

module.exports = function(app, passport, client) {
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
        messages.add_message(req, res);
         // console.log(req.method, req.url);


        res.redirect('/business_message')
        // var twiml = new twilio.TwimlResponse();
        // console.log("inside receive_message");
        // twiml.message(function() {
        // this.body('Trust Pound!');
        // });

        // Render an XML response
        // res.type('text/xml');
        // res.send(twiml.toString());
    })

    // app.post('/business_message', function(req, res){
    //      console.log(req.method, req.url, req.body);

    // })
// End: routes for twilio ============================

}
