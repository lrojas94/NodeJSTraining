var express = require('express');
var app = express();

var port = process.env.PORT || 5000;

app.listen(port, function (error) {
    console.log('Running server on: ' + port);
});
//Static files:
app.use(express.static('public'));
//Sets:
app.set('views','src/views');
app.set('view engine','jade');
//Gets:
app.get('/', function (request, response) {
    var context = {
        list : ['a','b']
    };
    response.render('index',context);
});