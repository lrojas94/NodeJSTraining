var express = require('express');
var mongodb = require('mongodb').MongoClient;
var objectId = require('mongodb').ObjectId;
var router = express.Router();
var url = 'mongodb://localhost:27017/libraryApp';

var init = function(nav) {
    console.log(require('../controllers/bookController'));
    var bookController = require('../controllers/bookController')(null,nav);
    //This is how we redirect on the start :D
    router.use(bookController.middleware);
    router.route('/')
        .get(bookController.getIndex);

    router.route('/:id')
        .get(bookController.getById);

    return router;
};

module.exports = init;