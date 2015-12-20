var express = require('express');
var mongodb = require('mongodb').MongoClient;
var router = express.Router();

var init = function() {
    router.route('/signUp')
    .post(function(req,res) {
        res.send(req.body);
    });

    return router;
};

module.exports = init;