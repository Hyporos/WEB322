const config = require('config');
var Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const mongoose = require('mongoose');
const users = require('./routes/users');
const auth = require('./routes/auth');
var express = require("express");
var hbs = require('express-handlebars');
var app = express();

if (!config.get('PrivateKey')) {
    console.error('Error: PrivateKey is not defined.');
    process.exit(1);
}

mongoose.connect('mongodb://localhost/airbnb')
    .then(() => console.log('Now connected to MongoDB!'))
    .catch(err => console.error('Something went wrong', err));

app.set('view engine', 'hbs');

app.engine('hbs', hbs({
    extname: 'hbs', 
    defaultLayout: 'main',
    layoutsDir: __dirname + '/views/layouts',
    partialsDir: __dirname + '/views/partials/' 
}));


app.use('/static', express.static('public'));
app.use(express.json());
app.use('/api/users', users);
app.use('/api/auth', auth);

var HTTP_PORT = process.env.PORT || 8080;

// call this function after the http server starts listening for requests
function onHttpStart() {
    console.log("Express http server listening on: " + HTTP_PORT);
}

// setup a 'route' to listen on the default url path (http://localhost)
app.get("/", function (req, res) {
    res.render('home', {layout: false})
});

// setup another route to listen on /about
app.get("/roomList", function (req, res) {
    res.render('roomList', {layout: false})
});

app.get("/dashboard", function (req, res) {
    res.render('dashboard', {layout: false})
});

// setup http server to listen on HTTP_PORT
app.listen(HTTP_PORT, onHttpStart);
