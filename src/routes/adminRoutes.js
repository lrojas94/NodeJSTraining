var express = require('express');
var mongodb = require('mongodb').MongoClient;
var router = express.Router();

var init = function() {

    var books = [
        {
            'id': '28187',
            'cat': ['book', 'hardcover'],
            'name': 'The Lightning Thief',
            'author': 'Rick Riordan',
            'series_t': 'Percy Jackson and the Olympians',
            'sequence_i': 1,
            'genre_s': 'fantasy',
            'inStock': true,
            'price': 12.50,
            'pages_i': 384
        },
        {
            'id': '28186',
            'cat': ['book', 'paperback'],
            'name': 'The Sea of Monsters',
            'author': 'Rick Riordan',
            'series_t': 'Percy Jackson and the Olympians',
            'sequence_i': 2,
            'genre_s': 'fantasy',
            'inStock': true,
            'price': 6.49,
            'pages_i': 304
        },
        {
            'id': '58302',
            'cat': ['book', 'paperback'],
            'name': 'Sophie\'s World : The Greek Philosophers',
            'author': 'Jostein Gaarder',
            'sequence_i': 1,
            'genre_s': 'fantasy',
            'inStock': true,
            'price': 3.07,
            'pages_i': 64
        },
        {
            'id': '22131010',
            'cat': ['book', 'paperback'],
            'name': 'Lucene in Action, Second Edition',
            'author': 'Michael McCandless',
            'sequence_i': 1,
            'genre_s': 'IT',
            'inStock': true,
            'price': 30.50,
            'pages_i': 475
        }
    ];

    router.route('/addBook')
    .get(function(req,res) {
        var url = 'mongodb://localhost:27017/libraryApp';
        mongodb.connect(url,function(err,db) {
            var collection = db.collection('books');
            collection.insertMany(books,function(err,result) {
                res.send(result);
                db.close();
            });
        });
    });
    return router;
};

module.exports = init;