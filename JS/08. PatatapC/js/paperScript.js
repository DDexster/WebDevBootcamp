// -------------CONSTANTS---------------
var ASSET_PATH = "./assets/sounds/";
var START_LETTER = 97;
var SOUNDS = [
    "bubbles.mp3",
    "clay.mp3",
    "confetti.mp3",
    "corona.mp3",
    "dotted-spiral.mp3",
    "flash-1.mp3",
    "flash-2.mp3",
    "flash-3.mp3",
    "glimmer.mp3",
    "moon.mp3",
    "pinwheel.mp3",
    "piston-1.mp3",
    "piston-2.mp3",
    "piston-3.mp3",
    "prism-1.mp3",
    "prism-2.mp3",
    "prism-3.mp3",
    "splits.mp3",
    "squiggle.mp3",
    "strike.mp3",
    "suspension.mp3",
    "timer.mp3",
    "ufo.mp3",
    "veil.mp3",
    "wipe.mp3",
    "zig-zag.mp3"
];
// -------------CONSTANTS---------------

// -------------VARIABLES---------------
var circles = [];
var keyData = {};
// -------------VARIABLES---------------

// -------------MAIN---------------
generateKeyData();
// console.log(keyData);
// -------------MAIN---------------

// -------------FUNCTIONS---------------
// -------------PAPER.JS FUNCTIONS---------------
function onFrame(event) {
    circles.forEach(function(circle, index) {
        circle.fillColor.hue += 1;
        circle.scale(0.9);
        if (circle.area < 1) {
            circle.remove();
            circles.splice(index, 1);
        }
    }, this);
}

function onKeyDown(event) {
    // console.log(event.event.charCode);
    var code = event.event.charCode;
    if (keyData[code]) {
        var maxPoint = new Point(view.size.width, view.size.height);
        var point = maxPoint * Point.random();
        var circle = new Path.Circle(point, 120);
        circle.fillColor = keyData[code].color;
        keyData[code].sound.play();
        circles.push(circle);
    }

}
// -------------PAPER.JS FUNCTIONS---------------

// -------------RANDOMIZE FUNCTIONS---------------
function generateKeyData() {
    SOUNDS.forEach(function(sound, index) {
        keyData[index + 97] = {
            color: generateColor(),
            sound: new Howl({
                src: [ASSET_PATH + sound]
            })
        }
    }, this);
}

function generateColor() {
    var r = Math.floor(Math.random() * 256);
    var g = Math.floor(Math.random() * 256);
    var b = Math.floor(Math.random() * 256);
    return "rgb(" + r + ", " + g + ", " + b + ")";
}
// -------------RANDOMIZE FUNCTIONS---------------

// -------------FUNCTIONS---------------