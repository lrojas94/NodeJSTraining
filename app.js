var express = require('express');
var app = express();
var handlebars = require('express-handlebars');
var port = process.env.PORT || 5000;

app.listen(port, function (error) {
    console.log('Running server on: ' + port);
});
//Static files:
app.use(express.static('public'));
//Sets:
app.set('views','src/views');
//Set engine
app.engine('.hbs',handlebars({extname:'.hbs'}));
app.set('view engine','.hbs');
//Gets:
app.get('/', function (request, response) {
    var context = {
        list : ['a','b'],
        title : 'Handle title :B'
    };
    response.render('index',context);
});