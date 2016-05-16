var User = require('../models/User.js');

module.exports = {
  //----------------User Login Ctrls---------------------------------
    addUser: function(req, res) {
   // console.log(req.body);
        new User(req.body).save(function(err, user) {
            if (err) {
       console.error('error: ', err);
                res.status(500).send(err);
            } else {
       console.log('Success in adding new user');
                console.log(user);
                res.send(user);
            }
        });
    },

 getCurrentUser: function(req, res) {
   if(req.user){
     console.log("login found the User");
     res.status(200).send(req.user);
   } else {
     res.status(403).send('forbidden');
   }
    },

 getUser: function(req, res) {
   console.log('hi');
        User.findById( req.query.id, function(err, user) {
            if (err) {
                // return console.error(err);
       res.statu(500).send(err);
            } else {
                res.send(user);
            }
        });
    },
    logout: function(req, res) {
       req.logout();
       res.redirect('/');
   },

 isAuth: function(req,res, next) {
 if(req.user) {
   next();
 } else {
   res.status(403).send('Not Permitted');
 }
},
//------------User Group Marker Lists Ctrl--------------------------------
getGroup: function (req, res) {
    User.find(req.query, function(err, response) {
      if (err) {
        res.status(500).json(err)
      } else {
        res.json(response)
      }
    });
  },
  getGroupId: function (req, res) {
      User.findById(req.params.id, function(err, response) {
        if(err) {
          res.status(500).json(err)
        }else {
          res.json(response)
        }
      });
    },
    addGroup: function(req, res) {
      var newGroup = new User(req.body);
      newProduct.save(function(err, response) {
        if(err) {
          res.status(500).json(err)
        }else {
          res.json(response)
        }
      });
    },
    groupUpdate: function(req, res) {
      User.findByIdAndUpdate(req.params.id, req.body, function (err, response) {
        if(err) {
          res.status(500).json(err)
        } else {
          res.json(response)
        }
      });
    },
    groupDelete: function (req, res) {
      User.findByIdAndRemove(req.params.id, function(err, response) {
        if(err) {
          res.status(500).json(err)
        } else {
          res.json(response)
        }
      });
    },
    //------------Group Marker List Ctrl---------------------------------
    getMarker: function (req, res) {
        User.find(req.query, function(err, response) {
          if (err) {
            res.status(500).json(err)
          } else {
            res.json(response)
          }
        });
      },
      getMarkerId: function (req, res) {
          User.findById(req.params.id, function(err, response) {
            if(err) {
              res.status(500).json(err)
            }else {
              res.json(response)
            }
          });
        },
        addMarker: function(req, res) {
          var newGroup = new User(req.body);
          newProduct.save(function(err, response) {
            if(err) {
              res.status(500).json(err)
            }else {
              res.json(response)
            }
          });
        },
        updateMarker: function(req, res) {
          User.findByIdAndUpdate(req.params.id, req.body, function (err, response) {
            if(err) {
              res.status(500).json(err)
            } else {
              res.json(response)
            }
          });
        },
        markerDelete: function (req, res) {
          User.findByIdAndRemove(req.params.id, function(err, response) {
            if(err) {
              res.status(500).json(err)
            } else {
              res.json(response)
            }
          });
        }
};
