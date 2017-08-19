var DESC_PARAGRAPH_NUM = 4,
    IMAGES = [
        "https://farm1.staticflickr.com/112/316612921_f23683ca9d.jpg",
        "https://farm5.staticflickr.com/4155/34188167190_7f6ef3bca5.jpg",
        "https://farm8.staticflickr.com/7168/6670258309_2e52bdbc6c.jpg",
        "https://farm4.staticflickr.com/3189/3062178880_4edc3b60d5.jpg",
        "https://farm4.staticflickr.com/3211/3062207412_03acc28b80.jpg",
        "https://farm9.staticflickr.com/8471/8137270056_21d5be6f52.jpg",
        "https://farm9.staticflickr.com/8252/8572156628_1dd8ff3f09.jpg",
        "https://farm6.staticflickr.com/5615/15549151291_58a8c2acd6.jpg",
        "https://farm5.staticflickr.com/4293/35643160450_c9e0380c21.jpg",
        "https://farm3.staticflickr.com/2928/33123480065_630e89df61.jpg",
        "https://farm4.staticflickr.com/3444/3390140079_8eb7e5042f.jpg"
    ],
    CAMPS = [
        "Camp Pine Haven",
        "Camp Patton",
        "Camp Shalom",
        "Camp Shenahwau",
        "Camp Spirit",
        "Camp Stillwater",
        "Camp Stonewater",
        "Camp Tokopee",
        "Camp Tantrum",
        "Camp Twisty Creek",
        "Camp Wallumwahpuck",
        "Camp Wamapo",
        "Camp Wannamorra",
        "Camp Washiska Lake",
        "Camp Wauconda",
        "Camp Wicawabe",
        "Camp Wiggen",
        "Camp Wiggin",
        "Camp Wannabe",
        "Camp Wannaweep",
        "Camp Wawanakwa",
        "Camp Weekawken",
        "Camp Whispering Rock",
        "Camp Winnipesaukee",
        "Camp Winokee",
        "Camp Wonky Donky",
        "Camp Yellow Jacket",
        "Camp Zion",
        "Cedar Grove Fellowship Camp",
        "Center Stage Camp for the Performing Arts",
        "Chippewa Arts Camp",
        "FreeK Camp",
        "High Feather Summer Camp",
        "High In The Wild",
        "High Note Band Camp",
        "Idyllwild Crest School of Music",
        "Ivan Turgnovski’s Dance Camp",
        "Jenna’s Kids",
        "Kamp Kikakee",
        "Kamp Krusty",
        "Kamp Woody",
        "Lake Leopard Camp for Boys",
        "Lake Tardicaca Camp for the Handicapped",
        "Lakeside Water Ski Camp",
        "Little Otter Family Camp",
        "Lost River Camp",
        "New Beginnings",
        "Point X Camp",
        "Poland Springs Caddy Camp",
        "Rock Creek Camp",
        "Second Horizons",
        "Shadow Falls Camp",
        "Spirit-in-the-Woods",
        "Tall Pines Camp",
        "The Enclave",
        "Triple R Camp",
        "West Canyon",
        "Whispering Pines"
    ];

var mongoose = require('mongoose'),
    Campground = require('./models/campground.js'),
    Comment = require('./models/comment.js'),
    faker = require('faker');

/**
 * Function clears database and creates 
 * seeds of random campgrounds and comments 
 * to each of them
 * 
 * @param {Number} campNumber - The number of rendom campgrounds to create
 */
function seedDB(campNumber) {
    // Clear DB
    Campground.remove({}, function(err) {
        if (err) {
            console.log("Error removing campgrounds")
        }
        console.log("Removed all campgrounds");
        //Add some data
        Comment.remove({}, function(err) {
            if (err) {
                console.log("Error removing comments")
            }
            console.log("Removed all comments");
            for (var i = 0; i < campNumber; i++) {
                var campSeed = createCampgroundSeed(i);
                Campground.create(campSeed, function(err, campground) {
                    if (err) {
                        console.log("Campground creation error");
                    } else {
                        console.log("Campground added");
                        //create a comment
                        // Comment.create(creareCommentSeed(), function(err, newComment) {
                        //     if (err) {
                        //         console.log('Comment creation error');
                        //     } else {
                        //         campground.comments.push(newComment);
                        //         campground.save();
                        //         console.log("comment added");
                        //     }
                        // })

                    }
                });
            }
        })

    });
};


function createCampgroundSeed(index) {
    return {
        name: CAMPS[Math.floor(Math.random() * CAMPS.length)],
        image: IMAGES[index],
        desc: faker.lorem.paragraphs(DESC_PARAGRAPH_NUM),
        author: {
            username: faker.internet.userName()
        }
    }
}

function creareCommentSeed() {
    return {
        text: faker.lorem.sentence(6, 20),
        author: faker.internet.userName()
    }
}
module.exports = seedDB;