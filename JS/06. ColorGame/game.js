// ---------Variables--------
//-----------Global variables------------
var HARD = 6;
var EASY = 3;
var colors = [];
var pickedColor;
var difficulty = HARD;
//-----------Global variables------------
//-----------DOM variables------------
var squares = document.querySelectorAll(".square");
var colorToGuess = document.getElementById("chosen-color");
var messageDisplay = document.querySelector("#message");
var h1 = document.querySelector("h1");
var resetBtn = document.querySelector("#reset");
var easyBtn = document.querySelector("#easyBtn");
var hardBtn = document.querySelector("#hardBtn");
//-----------DOM variables------------
// ---------Variables--------


// ---------MAIN--------
newGame(HARD);
// ---------MAIN--------

// ------------Events------------
resetBtn.addEventListener("click", function() {
    newGame(difficulty);
});

easyBtn.addEventListener("click", function() {
    setDifficulty(EASY);
});

hardBtn.addEventListener("click", function() {
    setDifficulty(HARD);
});
// ------------Events------------

// ---------Functions--------
function newGame(num) {
    for (var i = 0; i < squares.length; i++) {
        squares[i].classList.remove("wrong");
    }
    resetBtn.textContent = "New Colors";
    messageDisplay.textContent = "";
    h1.style.backgroundColor = document.body.style.backgroundColor;
    colors = [];
    generateGame(num);
}

function generateGame(diff) {
    getColorsArray(diff);
    assignColorsAndEvents(diff);

    pickedColor = colors[Math.floor(Math.random() * colors.length)];
    colorToGuess.textContent = pickedColor;
}

function setDifficulty(diff) {
    if (diff === EASY) {
        difficulty = EASY;
        easyBtn.classList.add("selected");
        hardBtn.classList.remove("selected");
    } else {
        difficulty = HARD;
        hardBtn.classList.add("selected");
        easyBtn.classList.remove("selected");
    }

    newGame(diff);
}

function getColorsArray(num) {
    for (var i = 0; i < num; i++) {
        var randColor = initiateColor();
        colors.push(randColor);
    }
}

function assignColorsAndEvents(diff) {
    if (diff === HARD) {
        initHardMode();
    } else {
        initEasyMode();
    }
}

function initHardMode() {
    for (var i = 0; i < squares.length; i++) {
        squares[i].style.backgroundColor = colors[i];
        squares[i].style.display = "block";
        squares[i].addEventListener("click", function() {
            checkColor(this);
        });
    }
}

function initEasyMode() {
    for (var i = 0; i < EASY; i++) {
        squares[i].style.backgroundColor = colors[i];
        squares[i].addEventListener("click", function() {
            checkColor(this);
        });
    }
    for (var i = EASY; i < squares.length; i++) {
        squares[i].style.display = "none";
    }
}

function initiateColor() {
    var r = Math.floor(Math.random() * 256);
    var g = Math.floor(Math.random() * 256);
    var b = Math.floor(Math.random() * 256);
    return "rgb(" + r + ", " + g + ", " + b + ")";
}

function checkColor(element) {
    if (element.style.backgroundColor === pickedColor) {
        messageDisplay.textContent = "Correct!"
        changeColorsOnWin(element.style.backgroundColor);
        resetBtn.textContent = "Play Again?";
    } else {
        element.classList.add("wrong");
        messageDisplay.textContent = "Try Again!"
    }
}

function changeColorsOnWin(color) {
    for (var i = 0; i < squares.length; i++) {
        squares[i].style.backgroundColor = color;
        squares[i].classList.remove("wrong");
    }
    h1.style.backgroundColor = color;
}
// ---------Functions--------