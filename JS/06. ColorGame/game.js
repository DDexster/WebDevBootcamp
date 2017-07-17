// ---------Variables--------
var colors = [];
var squares = document.querySelectorAll(".square");
var colorToGuess = document.getElementById("chosen-color");
var pickedColor;
// ---------Variables--------


// ---------MAIN--------
getColorsArray(squares.length);
assignColors();

pickedColor = colors[Math.floor(Math.random() * squares.length)];
colorToGuess.textContent = pickedColor.toUpperCase();

// ---------MAIN--------


// ---------Functions--------
function assignColors() {
  for (var i = 0; i < squares.length; i++) {
    squares[i].style.backgroundColor = colors[i];
    squares[i].addEventListener("click", function () {
      if (this.style.backgroundColor === pickedColor) {
        alert("You win")
      } else {
        this.style.backgroundColor = "#232323";
      }
    });
  }
}

function getColorsArray(num) {
  for (var i = 0; i < num; i++) {
    var randColor = initiateColor();
    colors.push(randColor);
  }
}

function initiateColor() {
  var r = Math.round(Math.random()*255);
  var g = Math.round(Math.random()*255);
  var b = Math.round(Math.random()*255);
  return "rgb(" + r + ", " + g + ", " + b + ")";
}
// ---------Functions--------
