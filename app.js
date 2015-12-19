var express = require('express');
var app = express();

var port = 5000;

app.listen(port, function (error) {
    console.log('Running server on: ' + port);
});
//Static files:
app.use(express.static('public'));
app.use(express.static('src/views'));

//Gets:
app.get('/', function (request, response) {
    response.send('Hello world :D');
});