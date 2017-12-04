var mongoose = require('mongoose');
var Speed  = require('../models/modelSpeed');

module.exports.findAll =function(req, res, next) {

    Speed.find({}).exec(function(err,data){
       res.json(data);
    });
}

module.exports.find =function(req, res, next) {
    Speed.find( { login : req.params.login},function(err, speed){
        if(err){
            res.json(err);
        }
        else {
            res.json(speed);
        }
    } );
}

module.exports.addUser =function(req, res, next) {
var speed = new Speed(req.body) ;
    speed.save(function(err, speed){
        if(err){
            res.json(err);
        }
        else {
            res.json(speed);
        }
    } );
}

module.exports.editUser =function(req, res, next) {

    var query = {"login":"login"};
    Speed.findOneAndUpdate(query, req.body, {upsert:true}, function(err, doc){
        if (err) return res.send(500, { error: err });
        return res.send("succesfully saved");
    });

}

module.exports.deleteUser =function(req, res, next) {

    Speed.findByIdAndRemove( req.params.id, function(err, speed){
        if(err){
            res.json(err);
        }
        else {
            res.json(speed);
        }
    } );
}
module.exports.remove =function(req, res, next) {
    Speed.remove(function(){

        res.json({success :"true"});
    })


}