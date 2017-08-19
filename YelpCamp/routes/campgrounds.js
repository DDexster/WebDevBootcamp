var express = require("express"),
    router = express.Router(),
    Campground = require('../models/campground');

router.get("/", function(req, res) {
    Campground.find({}, function(err, campgrounds) {
        if (err) {
            console.log("Error of extracting data:", err);
        } else {
            res.render("campgrounds/index", { campgrounds: campgrounds });
        }
    });
});

router.post("/", isLoggedIn, function(req, res) {
    var campground = req.body.campground;
    if (campground.name && campground.image) {
        var newCampground = {
            name: campground.name,
            image: campground.image,
            desc: campground.desc,
            author: {
                id: req.user._id,
                username: req.user.username
            }
        };
        Campground.create(newCampground, function(err, campground) {
            if (err) {
                console.log("Error of creating:", err);
            } else {
                console.log("Successifully added a campground");
                res.redirect('/campgrounds');
            }
        });
    }
});

router.get('/new', isLoggedIn, function(req, res) {
    res.render('campgrounds/new');
});

router.get('/:id', function(req, res) {
    Campground.findById(req.params.id).populate('comments').exec(function(err, foundItem) {
        if (err) {
            res.send("404 - not found")
        } else {
            res.render("campgrounds/show", { campground: foundItem });
        }
    });
});

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    } else {
        res.redirect('/login');
    }
};


module.exports = router;