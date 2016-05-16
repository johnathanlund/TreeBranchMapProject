var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
var Schema = mongoose.Schema;

var User = new Schema({
  name: {type: String},
  email: {type: String, unique: true},
  password: {type: String},
  groupList: {type: mongoose.Schema.Types.ObjectId, ref: 'GroupList'}
  // groupList: [{
  //   groupName:{type: String},
  //   groupDescription:{type: String},
  //   markerList: [{
  //     markerName: {type: String},
  //     markerLat: {type: Number, min: 1},
  //     markerLong: {type: Number, min: 1}
  //   }],
  // }],
});
// var GroupList = new Schema({
//   groupName: {type: String},
//   groupDescription: {type: String},
//   markerList:[{markerName: {type: String},
//   markerLat: {type: Number, min: 1},
//   markerLong: {type: Number, min: 1}
//   }]
// });
User.methods.generateHash = function( password ) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};
User.methods.validatePassword = function( password ) {
    return bcrypt.compareSync(password, this.password);
};
//////////?//////////////////
User.pre('save', function(next){
var user = this;
if(!user.isModified('password')) return next();
user.password = User.methods.generateHash(user.password);
next();
});

module.exports = mongoose.model('User', User);
// module.exports = mongoose.model('GroupList', GroupList);
