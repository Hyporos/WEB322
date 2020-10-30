var express = require("express");
var hbs = require('express-handlebars');
var app = express();

app.set('view engine', 'hbs');

app.engine('hbs', hbs({
    extname: 'hbs', 
    defaultLayout: 'main',
    layoutsDir: __dirname + '/views/layouts',
    partialsDir: __dirname + '/views/partials/' 
}));


app.use('/static', express.static('public'));

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

// setup http server to listen on HTTP_PORT
app.listen(HTTP_PORT, onHttpStart);
