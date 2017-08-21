var express = require("express"),
    router = express.Router(),
    passport = require('passport'),
    middleware = require('../middleware'),
    User = require('../models/user.js');

router.get("/", function(req, res) {
    res.render("landing");
});

router.get('/register', function(req, res) {
    res.render('register');
});

router.post('/register', function(req, res) {
    var newUser = new User({ username: req.body.username });
    User.register(newUser, req.body.password, function(err, user) {
        if (err) {
            req.flash("error", err.message);
            return res.render('register');
        } else {
            passport.authenticate('local')(req, res, function() {
                req.flash("succcess", "New user created successifully, welcome " + user.username + "!");
                res.redirect('/campgrounds');
            });
        }
    });
});

router.get('/login', function(req, res) {
    res.render('login');
});

router.post('/login', passport.authenticate('local', {
    successRedirect: '/campgrounds',
    failureRedirect: '/login',
    successFlash: 'Logged in succesifully',
    failureFlash: 'Login failed'
}), function(req, res) {});

router.get('/logout', function(req, res) {
    req.logout();
    req.flash("success", "You successifully logged out!")
    res.redirect('/');
});


module.exports = router;