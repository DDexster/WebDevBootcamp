//=====================VARIABLES=====================
var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose');
//=====================VARIABLES=====================


//======================SETTINGS=====================
mongoose.connect('mongodb://localhost/yelp_camp');
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
//======================SETTINGS=====================


// =======================SCHEMA=====================
var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    desc: String
});

var Campground = mongoose.model('Campground', campgroundSchema);
// =======================SCHEMA=====================

//========================FUNCTIONS==================
function addCampground(campground) {
    Campground.create({
        name: campground.name,
        image: campground.image,
        desc: campground.desc
    }, function(err, campground) {
        if (err) {
            console.log("Error of creating:", err);
        } else {
            console.log("Successifully added a campground");
        }
    })
}
//========================FUNCTIONS==================

//=====================INIT DB(do one tme)=======================
// var campgrounds = [{
//         name: "Salmon Greek",
//         image: "https://farm4.staticflickr.com/3844/15335755172_33dec7e209.jpg",
//         desc: "Cillum venmoniam aliqua elit do incididunt incididunt nostrud est duis pariatur cupidatat. Incididunt eu non do cupidatat proident aute non culpa reprehenderit. Officia officia excepteur voluptate dolor eiusmod pariatur. Irure do est culpa aliquip sunt reprehenderit non laboris occaecat proident enim mollit voluptate id. Esse enim laborum amet minim esse proident proident magna. Aliquip sit labore laborum enim mollit exercitation tempor labore nisi. Officia culpa voluptate velit pariatur laboris ut commodo."
//     },
//     {
//         name: "Granite Hill",
//         image: "https://farm4.staticflickr.com/3273/2602356334_20fbb23543.jpg",
//         desc: "Exercitation qui aute mollit excepteur nulla labore do ut consectetur. Cupidatat cupidatat id tempor ad voluptate eu excepteur qui dolor nostrud nulla. Velit non commodo dolore cupidatat eu esse eiusmod ut do irure. Pariatur dolor fugiat aute tempor fugiat consectetur eiusmod eiusmod et."
//     },
//     {
//         name: "Mountain Goat's Rest",
//         image: "https://farm2.staticflickr.com/1363/1342367857_2fd12531e7.jpg",
//         desc: "Aute proident veniam excepteur dolore esse. Sint ut labore non laboris. Dolore ex amet est minim nisi do velit cupidatat culpa in fugiat exercitation. Consectetur Lorem occaecat eiusmod velit aute. Magna ut ut sunt laborum dolor dolor culpa proident sunt minim velit tempor. Et enim ea ut Lorem exercitation sint."
//     }
// ];
// for (var i = 0; i < campgrounds.length; i++) {
//     addCampground(campgrounds[i]);
// }
// =====================INIT DB=======================

//=====================ROUTES========================
app.get("/", function(req, res) {
    res.render("landing");
});


app.get("/campgrounds", function(req, res) {
    Campground.find({}, function(err, campgrounds) {
        if (err) {
            console.log("Error of extracting data:", err);
        } else {
            res.render("index", { campgrounds: campgrounds });
        }
    });
});

app.post("/campgrounds", function(req, res) {
    var campground = {
        name: req.body.name,
        image: req.body.image,
        desc: req.body.desc
    };
    if (campground.name && campground.image) {
        addCampground(campground);
        res.redirect('/campgrounds');
    }
});

app.get('/campgrounds/new', function(req, res) {
    res.render('new');
});

app.get('/campgrounds/:id', function(req, res) {
    Campground.findById(req.params.id, function(err, foundItem) {
        if (err) {
            res.send("404 - not found")
        } else {
            res.render("show", { campground: foundItem });
        }
    });
});
//=====================ROUTES========================



// =============Listen for CLOUD9=====================
// app.listen(process.env.PORT, process.env.IP, function(){
//   console.log("Server is running...");
// });

//==============Listen for localhost==================
app.listen("3000", function() {
    console.log("Server is running...");
});