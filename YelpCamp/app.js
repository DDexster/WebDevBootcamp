//=====================VARIABLES=====================
var express = require('express'),
    app = express(),
    seedDB = require('./seeds.js'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    // User = require('./models/user.js'),
    Comment = require('./models/comment'),
    Campground = require('./models/campground');
//=====================VARIABLES=====================


//======================SETTINGS=====================
mongoose.connect('mongodb://localhost/yelp_camp');
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
seedDB(11);
//======================SETTINGS=====================


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

//=====================ROUTES========================
app.get("/", function(req, res) {
    res.render("landing");
});


app.get("/campgrounds", function(req, res) {
    Campground.find({}, function(err, campgrounds) {
        if (err) {
            console.log("Error of extracting data:", err);
        } else {
            res.render("campgrounds/index", { campgrounds: campgrounds });
        }
    });
});

app.post("/campgrounds", function(req, res) {
    var campground = req.body.campground;
    if (campground.name && campground.image) {
        addCampground(campground);
        res.redirect('/campgrounds');
    }
});

app.get('/campgrounds/new', function(req, res) {
    res.render('campgrounds/new');
});

app.get('/campgrounds/:id', function(req, res) {
    Campground.findById(req.params.id).populate('comments').exec(function(err, foundItem) {
        if (err) {
            res.send("404 - not found")
        } else {
            res.render("campgrounds/show", { campground: foundItem });
        }
    });
});

app.get("/campgrounds/:id/comments/new", function(req, res) {
    Campground.findById(req.params.id, function(err, foundItem) {
        if (err) {
            res.send("404 - not found")
        } else {
            res.render("comments/new", { campground: foundItem });
        }
    });
});

app.post('/campgrounds/:id/comments', function(req, res) {
    Campground.findById(req.params.id, function(err, foundCamp) {
        if (err) {
            res.send("404 - not found");
        } else {
            Comment.create(req.body.comment, function(err, newComment) {
                if (err) {
                    console.log("Error creating comment");
                } else {
                    foundCamp.comments.push(newComment);
                    foundCamp.save();
                    res.redirect('/campgrounds/' + foundCamp._id);
                }

            });
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