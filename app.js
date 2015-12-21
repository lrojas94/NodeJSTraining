var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var passport = require('passport');
var session = require('express-session');

var app = express();
var handlebars = require('express-handlebars');
var port = process.env.PORT || 5000;

var nav = [
    {
        link: '/Books',
        title: 'Books'
    },
    {
        link: '/Authors',
        title: 'Authors'
    }
];
//Use:
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));
app.use(cookieParser());
app.use(session({secret : 'library', resave: true, saveUninitialized: true}));
require('./src/config/passport')(app);
//Personal requires:
var adminRouter = require('./src/routes/adminRoutes')();
var bookRouter = require('./src/routes/bookRoutes')(nav);
var authRouter = require('./src/routes/authRoutes')();
app.listen(port, function (error) {
    console.log('Running server on: ' + port);
});
//Sets:
app.set('views', 'src/views');
//Set engine
//app.engine('.hbs',handlebars({extname:'.hbs'}));
app.set('view engine', 'ejs');

//Routers:
app.use('/Admin', adminRouter);
app.use('/Books', bookRouter);
app.use('/Auth',authRouter);
//Gets:
app.get('/', function (request, response) {

    response.render('index', {nav : nav});
});