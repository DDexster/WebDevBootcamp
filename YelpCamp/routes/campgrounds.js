var express = require("express"),
    router = express.Router(),
    middleware = require('../middleware'),
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

router.post("/", middleware.isLoggedIn, function(req, res) {
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

router.get('/new', middleware.isLoggedIn, function(req, res) {
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

router.get('/:id/edit', middleware.checkCampgroundOwnership, function(req, res) {
    Campground.findById(req.params.id, function(err, campground) {
        if (err) {
            res.redirect('/campgrounds/' + req.params.id);
        } else {
            res.render('campgrounds/edit', { campground: campground });
        }
    });
});

router.put('/:id', middleware.checkCampgroundOwnership, function(req, res) {
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground) {
        if (err) {
            res.redirect('/campgrounds/' + req.params.id + '/edit');
        } else {
            res.redirect('/campgrounds/' + req.params.id);
        }
    });
});

router.delete('/:id', middleware.checkCampgroundOwnership, function(req, res) {
    Campground.findByIdAndRemove(req.params.id, function(err) {
        if (err) {
            console.log(err);
            res.redirect('/campgrounds/' + req.params.id);
        } else {
            res.redirect('/campgrounds');
        }
    })
});


module.exports = router;