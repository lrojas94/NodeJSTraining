var express = require('express');
var mongodb = require('mongodb').MongoClient;
var passport = require('passport');
var router = express.Router();

var init = function() {
    router.route('/signUp')
    .post(function(req,res) {
        var url = 'mongodb://localhost:27017/libraryApp';
        mongodb.connect(url,function(err,db) {
            var collection = db.collection('users');
            var user = {
                username : req.body.username,
                password : req.body.password
            };

            collection.insert(user,function(err,result) {
                req.login(result.ops[0],function() {
                    res.redirect('/auth/profile');
                });
            });
        });
    });

    router.route('/signIn')
    .post(passport.authenticate('local',{
        failureRedirect : '/'
    }),function(req,res) {
        res.redirect('/auth/profile');
    });

    router.route('/profile')
    .all(function(req,res,next) {
        if (!req.user) {
            res.redirect('/');
        }
        next();
    })
    .get(function(req,res) {
        res.json(req.user);
    });
    return router;
};

module.exports = init;