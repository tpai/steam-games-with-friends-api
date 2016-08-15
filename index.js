var express = require('express');
var router  = express.Router();
var path = require('path');
var app = express();
var http = require('http').createServer(app);
var bodyParser = require('body-parser')
var port = process.env.PORT || 3000;

app.use(function(req, res, next) {
    res.header('Content-Type', 'application/json');
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

    // intercept OPTIONS method
    if ('OPTIONS' == req.method) {
        res.sendStatus(200);
    }
    else {
        next();
    }
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

require('./routes')(app);

http.listen(port, function() {
    console.log('Server listening port '+port+'...')
});
