var express = require("express"),
    router = express.Router({ mergeParams: true }),
    Comment = require('../models/comment'),
    Campground = require('../models/campground');

router.get("/new", isLoggedIn, function(req, res) {
    Campground.findById(req.params.id, function(err, foundItem) {
        if (err) {
            res.send("404 - not found")
        } else {
            res.render("comments/new", { campground: foundItem });
        }
    });
});

router.post('/', isLoggedIn, function(req, res) {
    Campground.findById(req.params.id, function(err, foundCamp) {
        if (err) {
            res.send("404 - not found");
        } else {
            Comment.create(req.body.comment, function(err, newComment) {
                if (err) {
                    console.log("Error creating comment");
                } else {
                    newComment.author.id = req.user._id;
                    newComment.author.username = req.user.username;
                    newComment.save();
                    foundCamp.comments.push(newComment);
                    foundCamp.save();
                    res.redirect('/campgrounds/' + foundCamp._id);
                }

            });
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