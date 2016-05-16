// ------------Packages--------------
var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var mongoose = require('mongoose');
var session = require('express-session');
// var passport = require('passport');
//------------Files-----------------
var passport = require('./services/passport.js');
var userCtrl = require('./controllers/userCtrl');
var config = require('./config.js');
//----------Express-------------
var app = express();

// require('./services/passport')
app.use(bodyParser.json());
app.use(cors());
app.use(express.static(__dirname + "/public"));
app.use(session({
  secret: config.SESSION_SECRET,
  saveUninitialized: false,
  resave: false
}));
app.use(passport.initialize());
app.use(passport.session());
//-----------------User Login Methods------------------
app.post('/user', function(req, res, next) {
 console.log('running endpoint');
 next();
},userCtrl.addUser); //makes new user
app.get('/user', userCtrl.getUser); //Login user if creds match
app.get('/getCurrentUser', userCtrl.getCurrentUser);
//current user , goes to user controller, res.send(req.user) sends back current user
   //call endpoint in resolve

//login//
app.post('/login', passport.authenticate( 'local', {
 successRedirect: '/getCurrentUser'
 }
));
//logout//
app.get('/logout', function(req, res, next) {
 req.logout();
 return res.status(200).send("logged out");
});
//-------------User Group Methods-----------------------------------
app.post('/api/products', userCtrl.addGroup);
app.get('/api/products', userCtrl.getGroup);
app.get('/api/products/:id', userCtrl.getGroupId);
app.put('/api/products/:id', userCtrl.groupUpdate);
app.delete('/api/products/:id', userCtrl.groupDelete);
//---------------User Group Marker Methods-----------------------------------------------
app.post('/api/products', userCtrl.addMarker);
app.get('/api/products', userCtrl.getMarker);
app.get('/api/products/:id', userCtrl.getMarkerId);
app.put('/api/products/:id', userCtrl.updateMarker);
app.delete('/api/products/:id', userCtrl.markerDelete);
//--------------Connections----------------------------------------------
mongoose.set("debug", true);
mongoose.connect('mongodb://localhost/homePage', function (err) {
  if (err) throw err;
});
var port = 3000;
app.listen(port, function() {
  console.log('Listening on port ', port);
});
