var express = require('express');

var app = express();

app.get("/", function(req, res) {
    res.send("Hi there!!!");
});

app.get("/bye", function(req, res) {
    res.send("Goodbye!!!");
});

app.get("/dog", function(req, res) {
    res.send("MEOW!!");
});

app.get("*", function(req, res) {
    res.send("You are a STAR!");
})

// =============Listen for CLOUD9=====================
// app.listen(process.env.PORT, process.env.IP, function(){
//   console.log("Server is running...")
// });

//==============Listen for localhost==================
app.listen("3000", function() {
    console.log("Server is running...")
});