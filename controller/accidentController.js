var mongoose = require('mongoose');
var Accident  = require('../models/modelAccident');

module.exports.findAll =function(req, res, next) {

    Accident.find({}).exec(function(err,data){
       res.json(data);
    });
}

module.exports.find =function(req, res, next) {
    Accident.find( { login : req.params.login},function(err, accident){
        if(err){
            res.json(err);
        }
        else {
            res.json(accident);
        }
    } );
}

module.exports.addUser =function(req, res, next) {
var accident = new Accident(req.body) ;
    accident.save(function(err, accident){
        if(err){
            res.json(err);
        }
        else {
            res.json(accident);
        }
    } );
}

module.exports.editUser =function(req, res, next) {

    var query = {"login":"login"};
    Accident.findOneAndUpdate(query, req.body, {upsert:true}, function(err, doc){
        if (err) return res.send(500, { error: err });
        return res.send("succesfully saved");
    });

}

module.exports.deleteUser =function(req, res, next) {

    Accident.findByIdAndRemove( req.params.id, function(err, accident){
        if(err){
            res.json(err);
        }
        else {
            res.json(accident);
        }
    } );
}
module.exports.remove =function(req, res, next) {
    Accident.remove(function(){

        res.json({success :"true"});
    })


}