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
app.post('/user', function(req, res, next) { //makes new user
 console.log('running endpoint');
 next();
},userCtrl.addUser);
app.get('/user', userCtrl.getUser); //Login user if creds match
app.get('/getCurrentUser', userCtrl.getCurrentUser); //current user , goes to user controller, res.send(req.user) sends back current user//call endpoint in resolve
app.post('/login', passport.authenticate( 'local', { //login//
 successRedirect: '/getCurrentUser' }));
app.get('/logout', function(req, res, next) { //logout//
 req.logout();
 return res.status(200).send("logged out");
});
//-------------User Group Methods-----------------------------------
app.post('/groupList', userCtrl.addGroup); //create new group
app.get('/groupList', userCtrl.getGroups); //get all group lists
app.get('/groupList/:id', userCtrl.getGroupId); //get a group list by id
app.put('/groupList/:id', userCtrl.groupUpdate); //update a group list by id
app.delete('/groupList/:id', userCtrl.groupDelete); //delete a group by id
//---------------User Group Marker Methods-----------------------------------------------
app.post('/markerList/:id', userCtrl.addMarker); //create new marker, that passes in groupId
app.get('/markerList', userCtrl.getMarkers); //get all markers in list
app.get('/markerList/:id', userCtrl.getMarkerId); //get a marker by id
app.put('/markerList/:id', userCtrl.updateMarker); //update a marker by id
app.delete('/markerList/:id', userCtrl.markerDelete); //delete a marker by id
//--------------Connections----------------------------------------------
mongoose.set("debug", true);
mongoose.connect('mongodb://localhost/homePage', function (err) {
  if (err) throw err;
});
var port = 3000;
app.listen(port, function() {
  console.log('Listening on port ', port);
});
