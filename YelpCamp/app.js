//=====================VARIABLES=====================
var express = require('express'),
    app = express(),
    seedDB = require('./seeds.js'),
    mongoose = require('mongoose'),
    passport = require('passport'),
    bodyParser = require('body-parser'),
    LocalStrategy = require('passport-local'),
    User = require('./models/user.js'),
    Comment = require('./models/comment'),
    Campground = require('./models/campground');
//=====================VARIABLES=====================


//======================SETTINGS=====================
app.use(require('express-session')({
    secret: "Anything I want",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(passUser);

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
};

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    } else {
        res.redirect('/login');
    }
};

function passUser(req, res, next) {
    res.locals.currentUser = req.user;
    next();
};
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
            res.render("campgrounds/index", { campgrounds: campgrounds, currentUser: req.user });
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

//Comments ROUTES
app.get("/campgrounds/:id/comments/new", isLoggedIn, function(req, res) {
    Campground.findById(req.params.id, function(err, foundItem) {
        if (err) {
            res.send("404 - not found")
        } else {
            res.render("comments/new", { campground: foundItem });
        }
    });
});

app.post('/campgrounds/:id/comments', isLoggedIn, function(req, res) {
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
//AUTH ROUTES
app.get('/register', function(req, res) {
    res.render('register');
});

app.post('/register', function(req, res) {
    var newUser = new User({ username: req.body.username });
    User.register(newUser, req.body.password, function(err, user) {
        if (err) {
            console.log(err);
            return res.render('register');
        } else {
            passport.authenticate('local')(req, res, function() {
                res.redirect('/campgrounds');
            });
        }
    });
});

app.get('/login', function(req, res) {
    res.render('login');
});

app.post('/login', passport.authenticate('local', {
    successRedirect: '/campgrounds',
    failureRedirect: '/login'
}), function(req, res) {});

app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
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