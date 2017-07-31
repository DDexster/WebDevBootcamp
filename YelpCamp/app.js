var campgrounds = [
    { name: "Salmon Greek", image: "https://farm4.staticflickr.com/3844/15335755172_33dec7e209.jpg" },
    { name: "Granite Hill", image: "https://farm4.staticflickr.com/3273/2602356334_20fbb23543.jpg" },
    { name: "Mountain Goat's Rest", image: "https://farm2.staticflickr.com/1363/1342367857_2fd12531e7.jpg" }
];

var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));


app.get("/", function(req, res) {
    res.render("landing");
});


app.get("/campgrounds", function(req, res) {
    res.render("campgrounds", { campgrounds: campgrounds });
});

app.post("/campgrounds", function(req, res) {
    var name = req.body.name;
    var image = req.body.image;
    campgrounds.push({ name: name, image: image });
    res.redirect('/campgrounds');
});

app.get('/campgrounds/new', function(req, res) {
    res.render('new');
});



// =============Listen for CLOUD9=====================
// app.listen(process.env.PORT, process.env.IP, function(){
//   console.log("Server is running...")
// });

//==============Listen for localhost==================
app.listen("3000", function() {
    console.log("Server is running...")
});