var express = require('express');
var app = express();

app.set("view engine", "ejs");


app.get("/", function(req, res) {
    res.render("landing");
});

appp.get("/campgrounds", function(req, res) {
    var campgrounds = [
        { name: "Salmon Greek", image: "https://farm4.staticflickr.com/3844/15335755172_33dec7e209.jpg" },
        { name: "Granite Hill", image: "https://farm4.staticflickr.com/3273/2602356334_20fbb23543.jpg" },
        { name: "Mountain Goat's Rest", image: "https://farm2.staticflickr.com/1363/1342367857_2fd12531e7.jpg" }
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