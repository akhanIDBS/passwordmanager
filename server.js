
var http = require('http');
var express = require('express');
var app = express();
var port = 5000;


app.listen(port, function() {
    console.log("App Started!");
});

app.get('/', function(req, res) {
    res.send('Hello');
});

app.get('/getone', function(req, res) {
    res.json({
        data: 1
    })
})
