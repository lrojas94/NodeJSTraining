var express = require('express');
var mongodb = require('mongodb').MongoClient;
var objectId = require('mongodb').ObjectId;
var router = express.Router();
var url = 'mongodb://localhost:27017/libraryApp';

var init = function(nav) {
    //This is how we redirect on the start :D
    router.use(function(req,res,next) {
        if (!req.user) {
            res.redirect('/');
        }
        next();
    });
    router.route('/')
        .get(function (req, res) {
            mongodb.connect(url,function(err,db) {
                var collection = db.collection('books');
                collection.find({}).toArray(function(err,books) {
                    var context = {
                        nav : nav,
                        books : books
                    };
                    res.render('books',context);
                    db.close();
                });
            });

        });

    router.route('/:id')
        .get(function(req,res) {
            mongodb.connect(url,function(err,db) {
                var collection = db.collection('books');
                var id = new objectId(req.params.id);

                collection.findOne({_id : id},function(err,book) {
                    var context = {
                        nav : nav,
                        books : [book]
                    };
                    res.render('books',context);
                    db.close();
                });
            });

        });

    return router;
};

module.exports = init;