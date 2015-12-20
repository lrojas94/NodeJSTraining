var express = require('express');
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
//Personal requires:
var bookRouter = require('./src/routes/bookRoutes')(nav);

app.listen(port, function (error) {
    console.log('Running server on: ' + port);
});
//Static files:
app.use(express.static('public'));
//Sets:
app.set('views', 'src/views');
//Set engine
//app.engine('.hbs',handlebars({extname:'.hbs'}));
app.set('view engine', 'ejs');

//Routers:
app.use('/Books', bookRouter);
//Gets:
app.get('/', function (request, response) {

    response.render('index', {nav : nav});
});