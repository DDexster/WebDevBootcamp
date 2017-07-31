var express = require('express');
var app = express();
var request = require('request');

var OMDBKEY = 'thewdb';

app.set('view engine', 'ejs');

app.get("/", function(req, res) {
    res.render("search");
});

app.get("/results", function(req, res) {
    var query = req.query.search.toLowerCase();
    request('http://www.omdbapi.com/?apikey=' + OMDBKEY + '&s=' + query, function(error, response, body) {
        if (!error && response.statusCode == 200) {
            var data = JSON.parse(body);
            res.render("results", { data: data });
        }
    });
});







// =============Listen for CLOUD9=====================
// app.listen(process.env.PORT, process.env.IP, function(){
//   console.log("Server is running...")
// });

//==============Listen for localhost==================
app.listen("3000", function() {
    console.log("Server is running...")
});