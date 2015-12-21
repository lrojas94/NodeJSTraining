var passport = require('passport');

var init = function(app) {

    app.use(passport.initialize());
    app.use(passport.session());

    passport.serializeUser(function(user,done) {
        done(null,user);
    });

    passport.deserializeUser(function(user,done) {
        //Mongo find by id in order to return it in done.
        done(null,user);
    });
    require('./strategies/local.strategy')();
};

module.exports = init;