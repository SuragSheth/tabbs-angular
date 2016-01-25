var admin       = require('../controllers/admin.js');
var businesses  = require('../controllers/businesses.js');
var messages    = require('../controllers/messages.js');
var twilio      = require('twilio')



module.exports = function(app, passport, client, io) {
    io.sockets.on('connection', function (socket) {
    console.log("Sockets Connected! Socket Id: ", socket.id);


    function isAuthenticated(req, res, next){
        if (req.user && req.user != undefined) {
                console.log("You Are Logged In", req.user)
                return next();
            }
        console.log("You are not Logged In");rs  
        res.redirect('/');        
    }


// Start: routes for businesses =========================
    app.get('/dashboard', function(req, res){
       // console.log("routes succesful add:", req.user)
        req.session.socket_id = socket.id;
        res.json({session: req.session, user: req.user});
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

    // Need to finish
    app.get('/logout', function(req, res){
      req.logout();
      res.status(200).json({status: 'Logged Out!'});
    });
// End: routes for businesses =========================




// Start: routes for employees =========================
    app.post('/add_employee', function(req, res){
        admin.add_employee(req, res);
    })

     app.post('/delete_employee', function(req, res){
        admin.delete_employee(req, res);
    })

    app.get('/get_all_employees/:id', isAuthenticated, function(req, res){
        console.log("____________________", req.user);
        admin.get_all_employees(req, res);        
    })
// End: routes for employees =========================





// Start: routes for contacts =========================
    app.get('/get_all_contacts/:number', function(req, res){
        admin.get_all_contacts(req, res);
    })
// End: routes for contacts =========================






// Start: routes for sending and recieving messages ============================

    //sending messages to user from business
    app.post('/send_message_to_user', function(req, res){
        console.log("routes for send message to user:", req.body);
        messages.outgoing_message(req, res, client);
    })

    //incoming text from customer
    app.post('/get_message', function(req, res, next){
        //Check if incoming message is to existing business. Check if tabb is already created.
        //Create Tabb and save message to database.
       // console.log("TESTING SESSION", req.session)

        messages.incoming_message(req, res);
        // res.send("test");
        //emit message to angular controller
        io.emit("user_to_business", {message: req.body});

        console.log("get_message", req.body);
    })

    app.get('/business_tabbs/:id', function(req, res){
        // console.log("IN ROUTES", req.params);
        messages.get_business_messages(req, res);
    })
    app.get('/last_incoming_message/:id', function(req, res){
        messages.get_last_incoming_messages(req, res);
    })

    })
}
// End: routes for sending and recieving messages ============================
