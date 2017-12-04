var mongoose = require('mongoose');
var Schema = mongoose.Schema;



var StopSchema = new Schema({
    x:Number,y:Number},{collection : "stops"});
module.exports = mongoose.model('Stop', StopSchema);