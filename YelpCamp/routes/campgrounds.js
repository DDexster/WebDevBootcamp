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

router.post("/", function(req, res) {
    var campground = req.body.campground;
    if (campground.name && campground.image) {
        Campground.create({
            name: campground.name,
            image: campground.image,
            desc: campground.desc
        }, function(err, campground) {
            if (err) {
                console.log("Error of creating:", err);
            } else {
                console.log("Successifully added a campground");
                res.redirect('/campgrounds');
            }
        });
    }
});

router.get('/new', function(req, res) {
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

module.exports = router;