// -------Variables--------
var pOneBtn = document.querySelector(".one-score");
var pTwoBtn = document.querySelector(".two-score");
var resetBtn = document.querySelector(".reset");

var pOneDisplay = document.querySelector("#player-one-score");
var pTwoDisplay = document.querySelector("#player-two-score");
var totalDisplay = document.querySelector("#total-score");
var totalScore = +totalDisplay.textContent;
var input = document.querySelector("input");
var isEnded = false;
// -------Variables--------

// -------Event Handlers--------
pOneBtn.addEventListener("click", function () {
	increment(pOneDisplay);
});

pTwoBtn.addEventListener("click", function () {
	increment(pTwoDisplay);
});

resetBtn.addEventListener("click", function () {
	resetCounter();
})

input.addEventListener("change", function(){
	changeRules(this);
})
// -------Event Handlers--------


// -------Functions--------
function increment(element) {
	if (!isEnded) {
		var score = +element.textContent;
		score++;
		if (score >= totalScore) {
			element.classList.add("winner");
			element.textContent = totalScore;
			isEnded = true;
		} else {
			element.textContent = score;
		}
	}
};

function resetCounter() {
	isEnded = false;
	pOneDisplay.textContent = 0;
	pTwoDisplay.textContent = 0;
	pOneDisplay.classList.remove("winner");
	pTwoDisplay.classList.remove("winner");
	totalDisplay.textContent = 5;
	totalScore = 5;
	input.value = 5;
}

function changeRules(element) {
	totalScore = element.value;
	totalDisplay.textContent = element.value;
}
// -------Functions--------
