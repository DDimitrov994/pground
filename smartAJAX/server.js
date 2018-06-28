var express = require("express");
var app = express();
var multer = require('multer')
var upload = multer({ dest: 'uploads/' })
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Expose-Headers', 'Content-Type, Location');
    next();
});

app.get('/', function (req, res, next) {
    res.sendfile("./ss.html");
})

app.get('/js', function (req, res, next) {
    res.sendfile("./smartAJAX.js");
})

app.get('/test', function (req, res, next) {
    console.log(req.query);
    res.send("zdr");
})

app.listen(3001, function () {
    console.log("Express running");
});
