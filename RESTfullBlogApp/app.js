//====================VARIABLES=====================
var express = require('express'),
    methodOverride = require('method-override'),
    bodyParser = require('body-parser'),
    expressSanitizer = require('express-sanitizer'),
    mongoose = require('mongoose'),
    app = express();
//====================VARIABLES=====================

//====================SETTINGS=====================
mongoose.connect('mongodb://localhost/blog_app');
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(expressSanitizer());
//====================SETTINGS=====================

//====================SCHEMA CONFIG=====================
var blogShema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    created: { type: Date, default: Date.now }
});

var Blog = mongoose.model("Blog", blogShema);
//====================SCHEMA CONFIG=====================

//====================ROUTES=====================
app.get('/', function(req, res) {
    res.redirect('/blogs');
});

app.get('/blogs', function(req, res) {
    Blog.find({}, function(err, blogs) {
        if (err) {
            res.send("Error in finding items", err);
        } else {
            res.render("index", { blogs: blogs });
        }
    });
});

app.post('/blogs', function(req, res) {
    if (req.body.blog.title && req.body.blog.body) {
        req.body.blog.body = req.sanitize(req.body.blog.body);
        Blog.create(req.body.blog, function(err, newBlog) {
            if (err) {
                res.render("new");
            } else {
                res.redirect("/blogs");
            }
        });
    } else {
        res.render("new");
    }
});

app.get('/blogs/new', function(req, res) {
    res.render("new");
});

app.get('/blogs/:id/edit', function(req, res) {
    Blog.findById(req.params.id, function(err, foundBlog) {
        if (err) {
            res.redirect('/blogs');
        } else {
            res.render("edit", { blog: foundBlog });
        }
    })
});

app.get('/blogs/:id', function(req, res) {
    Blog.findById(req.params.id, function(err, foundBlog) {
        if (err) {
            res.redirect('/blogs');
        } else {
            res.render("show", { blog: foundBlog });
        }
    })
});

app.put('/blogs/:id', function(req, res) {
    if (req.body.blog.title && req.body.blog.body) {
        req.body.blog.body = req.sanitize(req.body.blog.body);
        Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, foundBlog) {
            if (err) {
                res.redirect("/blogs");
            } else {
                res.redirect("/blogs/" + req.params.id);
            }
        });
    } else {
        res.render("/blogs");
    }
});

app.delete('/blogs/:id', function(req, res) {
    Blog.findByIdAndRemove(req.params.id, function(err) {
        if (err) {
            res.send("Error deleting");
        } else {
            res.redirect('/blogs');
        }
    })
});
//====================ROUTES=====================

// =============Listen for CLOUD9=====================
// app.listen(process.env.PORT, process.env.IP, function(){
//   console.log("Server is running...");
// });

//==============Listen for localhost==================
app.listen("3000", function() {
    console.log("Server is running...");
});