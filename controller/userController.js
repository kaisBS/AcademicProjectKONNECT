var mongoose = require('mongoose');
var User = require('../models/model');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt-nodejs');
module.exports.findAll = function (req, res, next) {

    User.find({login:{$ne:["admin"]}}).exec(function (err, data) {
        res.json(data);
    });
}

module.exports.find = function (req, res, next) {
    User.findOne({login: req.body.login}).then(function (data) {
            if (bcrypt.compareSync(req.body.password, data.password)) {
                var token = jwt.sign({login: data.login}, 'teme');
                res.json({status: true, user: data, token: token});
            }
            else
                res.json({status:false});
        }).catch(function(err){
            res.json({status:false});
    })
}

module.exports.addUser = function (req, res, next) {
    var user = new User(req.body);
    user.password = bcrypt.hashSync(user.password);
    user.save(function (err, user) {
        if (err) {
            res.json({status:false});
        }
        else {
            res.json({status:true,user:user});
        }
    });
}

module.exports.editUser = function (req, res, next) {
    var query = {"login": req.body.login};
    User.findOneAndUpdate(query, req.body, {upsert: true, new: true}).exec(function (err,user) {
        if (err) return res.send(500, {error: err});
        return res.json(user);
    });

}

module.exports.deleteUser = function (req, res, next) {

    User.findByIdAndRemove(req.params.id, function (err, user) {
        if (err) {
            res.json(err);
        }
        else {
            res.json(user);
        }
    });
}
module.exports.remove = function (req, res, next) {
    User.remove(function () {

        res.json({success: "true"});
    })


}