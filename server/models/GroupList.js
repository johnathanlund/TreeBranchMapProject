var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var GroupList = new Schema({
  groupName: {type: String},
  groupDescription: {type: String},
  ownerId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  markerList: [{type: mongoose.Schema.Types.ObjectId, ref: 'MarkerList'}]

});

module.exports = mongoose.model('GroupList', GroupList);
