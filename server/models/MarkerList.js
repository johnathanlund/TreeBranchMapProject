var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MarkerList = new Schema({
  markerName: {type: String},
  markerLat: {type: Number},
  markerLong: {type: Number},
  ownerId: {type: mongoose.Schema.Types.ObjectId, ref: 'GroupList'}
});

module.exports = mongoose.model('MarkerList', MarkerList);
