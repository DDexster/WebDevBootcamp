var express = require('express'),
    app = express(),
    mongoose = require('mongoose'),
    passport = require('passport'),
    User = require('./models/user'),
    bodyParser = require('body-parser'),
    localStrategy = require('passport-local'),
    passportLocalMongoose = require('passport-local-mongoose');

//=======================APP Settings===================
app.use(require('express-session')({
    secret: "Some english words",
    resave: false,
    saveUninitialized: false
}));
app.set('view engine', 'ejs');
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost/auth_demo');

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//===================ROUTES===========================
app.get('/', function(req, res) {
    res.render('home');
});

app.get('/secret', function(req, res) {
    res.render('secret');
});

app.get('/register', function(req, res) {
    res.render('register')
});

app.post('/register', function(req, res) {
    User.register(new User({ username: req.body.user.username }), req.body.user.password, function(err, user) {
        if (err) {
            console.log("Error");
            res.render("register");
        } else {
            passport.authenticate('local')(req, res, function() {
                res.redirect("secret");
            })
        }
    });
});



// =============Listen for CLOUD9=====================
// app.listen(process.env.PORT, process.env.IP, function(){
//   console.log("Server is running...");
// });

//==============Listen for localhost==================
app.listen("3000", function() {
    console.log("Server is running...");
});