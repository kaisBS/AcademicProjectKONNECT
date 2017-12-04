var mongoose = require('mongoose');
var Suggest  = require('../models/modelSuggest');

module.exports.findAll =function(req, res, next) {

    Suggest.find().exec(function(err,data){
       res.json(data);
    });
}

module.exports.find =function(req, res, next) {
    Suggest.find( { login : req.params.login},function(err, suggest){
        if(err){
            res.json(err);
        }
        else {
            res.json(suggest);
        }
    } );
}

module.exports.addUser =function(req, res, next) {
var suggest = new Suggest(req.body) ;
    suggest.save(function(err, suggest){
        if(err){
            res.json(err);
        }
        else {
            res.json(suggest);
        }
    } );
}

module.exports.editUser =function(req, res, next) {

    var query = {"types":"types"};
    Suggest.findOneAndUpdate(query, req.body, {upsert:true}, function(err, doc){
        if (err) return res.send(500, { error: err });
        return res.send("succesfully saved");
    });

}

module.exports.deleteUser =function(req, res, next) {

    Suggest.findByIdAndRemove( req.params.id, function(err, suggest){
        if(err){
            res.json(err);
        }
        else {
            res.json(suggest);
        }
    } );
}
module.exports.remove =function(req, res, next) {
    Suggest.remove(function(){

        res.json({success :"true"});
    })


}