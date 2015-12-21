var express = require('express');
var mongodb = require('mongodb').MongoClient;
var objectId = require('mongodb').ObjectId;
var router = express.Router();
var url = 'mongodb://localhost:27017/libraryApp';

var init = function(nav) {
    var goodReadsService = require('../services/goodReads')();
    var bookController = require('../controllers/bookController')(goodReadsService,nav);
    //This is how we redirect on the start :D
    router.use(bookController.middleware);
    router.route('/')
        .get(bookController.getIndex);

    router.route('/:id')
        .get(bookController.getById);

    return router;
};

module.exports = init;