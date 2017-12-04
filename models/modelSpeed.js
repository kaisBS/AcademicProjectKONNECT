var mongoose = require('mongoose');
var Schema = mongoose.Schema;



var SpeedSchema = new Schema({
    speed:Number,x:Number,y:Number},{collection : "speeds"});
module.exports = mongoose.model('Speed', SpeedSchema);