// Require needed modules
var express = require('express');
var expressEjsLayouts = require('express-ejs-layouts');
var request = require('request');

// Declare a new express app
var app = express();

// Tell express what view engine we want to use
app.set('view engine', 'ejs');

// Define middleware settings
app.use(expressEjsLayouts);

// Define routes
app.get('/', function(req, res){
  request('http://www.omdbapi.com?apikey=5223368f&s=Star+Wars', function(err, response, body){
    if(!err && response.statusCode === 200){
      var parsedJson = JSON.parse(body);
      res.render('home', { movies: parsedJson.Search });
    }
    else {
      res.send(err);
    }
  });
});

app.get('/about', function(req, res){
  var name = 'Brandi';
  var foods = ['sushi', 'cheese', 'coconuts', 'BBQ'];
  res.render('about', { myname: name, myfoods: foods });
});

// Listen on port 3000
app.listen(3000);
