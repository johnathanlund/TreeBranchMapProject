var User = require('../models/User.js');
var GroupList = require('../models/GroupList');
var MarkerList = require('../models/MarkerList');

module.exports = {
  //----------------User Login Ctrls---------------------------------
    addUser: function(req, res) {
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
    getCurrentUser: function(req, res) {
      if(req.user){
        console.log("login found the User");
        res.status(200).send(req.user);
      } else {
        res.status(403).send('forbidden');
        }
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
    addGroup: function(req, res) {
      if (req.user) {
        req.body.ownerId = req.user._id;
      }
      var newGroup = new GroupList(req.body);
      newGroup.save(function(err, response) {
        if(err) {
          res.status(500).json(err)
        }else {
          console.log("Success in adding Group to GroupList");
          res.json(response)
        }
      });
    },
    getGroups: function (req, res) {
      if (req.user) {
            req.query.ownerId = req.user._id;
      };
      GroupList.find(req.query).populate("markerList").exec(function(err, response) {
        if (err) {
          res.status(500).json(err)
        } else {
          console.log("found groups to show");
          res.json(response)
        }
      });
    },
    getGroupId: function (req, res) {
      GroupList.findById(req.params.id, function(err, response) {
        if(err) {
          res.status(500).json(err)
        }else {
          if (response.ownerId === req.user._id) {
            console.log("Found a group by id");
            res.json(response)
        }}
      });
    },
    groupUpdate: function(req, res) {
      GroupList.findByIdAndUpdate(req.params.id, req.body, function (err, response) {
        if(err) {
          res.status(500).json(err)
        } else {
            if (response.ownerId === req.user._id) {
              res.json(response)
        }              console.log("Updated the group");}
      });
    },
    groupDelete: function (req, res) {
      GroupList.findByIdAndRemove(req.params.id, function(err, response) {
        if(err) {
          res.status(500).json(err)
        } else {
            if (res.ownerId === req.user._id) {
              console.log("Deleted group was succesfull.");
              res.json(response)
        }}
      });
    },
    //------------Group Marker List Ctrl---------------------------------
    addMarker: function(req, res) {
      console.log(req.params.id);
      // if (req.group) {
      //   req.body.ownerId = req.groupList._id;
      // }
      var newMarker = new MarkerList(req.body);
      newMarker.save(function(err, response) {
        if(err) {
          res.status(500).json(err)
        }else {
          console.log("Success! New marker was created.");
          GroupList.findByIdAndUpdate(req.params.id, {$addToSet: {"markerList": response._id}}, function(error, group) {
            if(error) {
              res.status(500).json(error)
            } else {
              res.status(200).json(true);
            }
          })
        }
      });
    },
    getMarkers: function (req, res) {
      if (req.group) {
            req.query.ownerId = req.group._id;
      };
        MarkerList.find(req.query, function(err, response) {
          if (err) {
            res.status(500).json(err)
          } else {
            console.log('Found markers to show in list.');
            res.json(response)
          }
        });
    },
    getMarkerId: function (req, res) {
          MarkerList.findById(req.params.id, function(err, response) {
            if(err) {
              res.status(500).json(err)
            }else {
              if (response.ownerId === req.group._id) {
                console.log("Found a marker by it's id.");
                res.json(response)
            }}
          });
    },
    updateMarker: function(req, res) {
          MarkerList.findByIdAndUpdate(req.params.id, req.body, function (err, response) {
            if(err) {
              res.status(500).json(err)
            } else {
                if (response.ownerId === req.group._id) {
                  console.log("Updated a marker succesfully.");
                  res.json(response)
            }}
          });
    },
    markerDelete: function (req, res) {
          MarkerList.findByIdAndRemove(req.params.id, function(err, response) {
            if(err) {
              res.status(500).json(err)
            } else {
                  console.log("Deleted Marker from Server.");
                  res.json(response)
            }
          });
    }
};
