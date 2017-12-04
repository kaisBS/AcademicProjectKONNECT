var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var expressJwt = require('express-jwt');
var cors = require('cors');
var index = require('./routes/index');
var mongoose = require('mongoose');

var app = express();
app.use(cors());

mongoose.connect('mongodb://root:root@ds133340.mlab.com:33340/pidev');
//mongoose.connect('mongodb://localhost/pidev');
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', expressJwt({secret: 'teme'}).unless({path: ['/api/users/login','/api/users/register']}),index);
app.use('/admin',function(req,res){
    res.sendFile(path.join(path.join(__dirname, 'public/admin/index.html')));
});
app.use('/',function(req,res){
    res.redirect('/user');
})
app.use('/user',function(req,res){
    res.sendFile(path.join(path.join(__dirname, 'public/user/index.html')));
});
app.use(function (err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
        res.status(401).json({error: 'unauthorized user'});
    }
});

module.exports = app;
