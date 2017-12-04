var mongoose = require('mongoose');
var Schema = mongoose.Schema;



var SuggestSchema = new Schema({
    content: String,types:String},{collection : "suggests"});
module.exports = mongoose.model('Suggest', SuggestSchema);