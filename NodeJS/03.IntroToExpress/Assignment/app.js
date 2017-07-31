var express = require('express');
var app = express();

app.get("/", function(req, res) {
    res.send("Hi there, welcome to my assignment!");
});

app.get("/speak/:animal", function(req, res) {
    res.send(speak(req.params.animal.toLowerCase()));
});

app.get("/repeat/:word/:num", function(req, res) {
    res.send(repeat(req.params.word, req.params.num));
});

app.get("*", function(req, res) {
    res.send("Sorry, page not found... What are you doing with your life, dude?");
});


// =============Listen for CLOUD9=====================
app.listen(process.env.PORT, process.env.IP, function(){
  console.log("Server is running...")
});

//==============Listen for localhost==================
// app.listen("3000", function() {
//     console.log("Server is running...")
// });



//==================FUNCTIONS==============
function speak(animal) {
    var speak;
    switch (animal) {
        case "pig":
            speak = "'Oink'";
            break;
        case "cow":
            speak = "'Moo'";
            break;
        case "dog":
            speak = "'Woof Woof!'";
            break;
        default:
            speak = "... Wow... I don't know how's " + animal + " speaks";
            break;
    }

    return "The " + animal + " says " + speak;
}

function repeat(word, num) {
    var line = "";
    for (var i = 0; i < num; i++) {
        line += word + " ";
    }
    return line.trim();
}