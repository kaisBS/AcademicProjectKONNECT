var mongoose = require('mongoose');
var Schema = mongoose.Schema;



var UserSchema = new Schema({
    login: {type:String,unique:true},
    password: String,
    home : String,
    email : String,
    number : String,
    scores : [Number],
    car : { buying_date : String,
        fabrication_birth : String,
        power : String,
        registration_number : String, last_path : [{x : Number , y : Number}],  mistakes : [{x: Number , y : Number, types :String, content : String,dates : String}],
    last_diagnostics : {fuel_rate :Number,battery :Number,rpm :Number,engine_temperature :Number,misfire : Boolean,components : Boolean
        ,catalyst : Boolean,evap_system : Boolean,acRefgigerant  : Boolean,oxygen_sensor  : Boolean,oxygen_sensor_heater  : Boolean,egr_system  : Boolean}}
},{collection : "users"});
module.exports = mongoose.model('User', UserSchema);