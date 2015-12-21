var mongodb = require('mongodb').MongoClient;
var objectId = require('mongodb').ObjectId;
var url = 'mongodb://localhost:27017/libraryApp';

var init = function(bookService,nav) {

    var getIndex = function (req, res) {
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

    };

    var getById = function(req,res) {
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

    };

    return {
        getIndex : getIndex,
        getById : getById
    };
};

module.exports = init;