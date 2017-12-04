var mongoose = require('mongoose');
var Stop  = require('../models/modelStop');

module.exports.findAll =function(req, res, next) {

    Stop.find({}).exec(function(err,data){
       res.json(data);
    });
}

module.exports.find =function(req, res, next) {
    Stop.find( { login : req.params.login},function(err, stop){
        if(err){
            res.json(err);
        }
        else {
            res.json(stop);
        }
    } );
}

module.exports.addUser =function(req, res, next) {
var stop = new Stop(req.body) ;
    stop.save(function(err, stop){
        if(err){
            res.json(err);
        }
        else {
            res.json(stop);
        }
    } );
}

module.exports.editUser =function(req, res, next) {

    var query = {"login":"login"};
    Stop.findOneAndUpdate(query, req.body, {upsert:true}, function(err, doc){
        if (err) return res.send(500, { error: err });
        return res.send("succesfully saved");
    });

}

module.exports.deleteUser =function(req, res, next) {

    Stop.findByIdAndRemove( req.params.id, function(err, stop){
        if(err){
            res.json(err);
        }
        else {
            res.json(stop);
        }
    } );
}
module.exports.remove =function(req, res, next) {
    Stop.remove(function(){

        res.json({success :"true"});
    })


}

module.exports.remove =function(req, res, next) {
    Stop.remove(function(){
        res.json({success :"true"});
    })


}