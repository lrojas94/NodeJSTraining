var passport = require('passport');
var localStrategy =  require('passport-local').Strategy;
var mongodb = require('mongodb').MongoClient;

var init = function() {
    passport.use(new localStrategy({
        usernameField : 'username',
        passwordField : 'password'
    },
    function(username,password,done) {
        //Look for all stuff:
        var url = 'mongodb://localhost:27017/libraryApp';
        mongodb.connect(url,function(err,db) {
            var users = db.collection('users');
            users.findOne({username : username,password:password},
                function(err,result) {
                    var user = result;
                    if (user !== undefined) {
                        done(null,user);
                    }
                    else {
                        done('NOT LOGGED IN',null);
                    }
                });
        });
    }));
};

module.exports = init;