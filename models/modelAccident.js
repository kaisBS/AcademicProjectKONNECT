var mongoose = require('mongoose');
var Schema = mongoose.Schema;



var AccidentSchema = new Schema({
    login: String,x:Number,y:Number,dates:String},{collection : "accidents"});
module.exports = mongoose.model('Accident', AccidentSchema);