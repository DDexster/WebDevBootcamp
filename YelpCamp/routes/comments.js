var express = require("express"),
    router = express.Router({ mergeParams: true }),
    middleware = require('../middleware'),
    Comment = require('../models/comment'),
    Campground = require('../models/campground');

router.get("/new", middleware.isLoggedIn, function(req, res) {
    Campground.findById(req.params.id, function(err, foundItem) {
        if (err) {
            res.send("404 - not found")
        } else {
            res.render("comments/new", { campground: foundItem });
        }
    });
});

router.post('/', middleware.isLoggedIn, function(req, res) {
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

router.get('/:comment_id/edit', middleware.checkCommentOwnership, function(req, res) {
    Comment.findById(req.params.comment_id, function(err, comment) {
        if (err) {
            res.redirect('back');
        } else {
            res.render('comments/edit', { campground_id: req.params.id, comment: comment });
        }
    });
});

router.put('/:comment_id', middleware.checkCommentOwnership, function(req, res) {
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment) {
        if (err) {
            res.redirect('back');
        } else {
            res.redirect('/campgrounds/' + req.params.id);
        }
    });
});

router.delete('/:comment_id', middleware.checkCommentOwnership, function(req, res) {
    Comment.findByIdAndRemove(req.params.comment_id, function(err) {
        if (err) {
            console.log(err);
            res.redirect('back');
        } else {
            res.redirect('/campgrounds/' + req.params.id);
        }
    })
});

module.exports = router;