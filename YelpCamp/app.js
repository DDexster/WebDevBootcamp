//=====================VARIABLES=====================
var express = require('express'),
    app = express(),
    seedDB = require('./seeds.js'),
    mongoose = require('mongoose'),
    passport = require('passport'),
    bodyParser = require('body-parser'),
    LocalStrategy = require('passport-local'),
    User = require('./models/user.js');

var campgroundRoutes = require('./routes/campgrounds'),
    commentRoutes = require('./routes/comments'),
    indexRoutes = require('./routes/index');
//=====================VARIABLES=====================


//======================SETTINGS=====================
mongoose.connect('mongodb://localhost/yelp_camp');

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

seedDB(11);

//==========PASSPORT SETTINGS
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

//=========USER PASS THROUGH
app.use(function(req, res, next) {
    res.locals.currentUser = req.user;
    next();
});

//==========ROUTES
app.use("/", indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);
//======================SETTINGS=====================



// =============Listen for CLOUD9=====================
// app.listen(process.env.PORT, process.env.IP, function(){
//   console.log("Server is running...");
// });

//==============Listen for localhost==================
app.listen("3000", function() {
    console.log("Server is running...");
});