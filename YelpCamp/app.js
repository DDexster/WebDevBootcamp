var express = require('express');
var app = express();

app.set("view engine", "ejs");


app.get("/", function(req, res) {
    res.render("landing");
});

appp.get("/campgrounds", function(req, res) {
    var campgrounds = [
        { name: "Salmon Greek", image: "" },
        { name: "Granite Hill", image: "" },
        { name: "Mountain Goat's Rest", image: "" }
    ];
    res.render("campgrounds", { campgrounds: campgrounds });
});




// =============Listen for CLOUD9=====================
// app.listen(process.env.PORT, process.env.IP, function(){
//   console.log("Server is running...")
// });

//==============Listen for localhost==================
app.listen("3000", function() {
    console.log("Server is running...")
});