const statementContainer = document.querySelector(".statement");
const buttons = Array.from(document.querySelectorAll("button"));
const play = document.querySelector(".play");
const nextBtn = document.querySelector(".next");
//store the current results from API fetch so that I dont make an API fetch each time I call a function etc
let currentResults;
let currentQuestionIndex = 0;
const startOver = document.querySelector(".startOver");

console.log(buttons);

async function fetchData() {
  const numOfQuestions = document.querySelector("input").value;
  const category = Array.from(document.querySelectorAll("select"))[0].value;
  const difficulty = Array.from(document.querySelectorAll("select"))[1].value;

  const res = await fetch(
    `https://opentdb.com/api.php?amount=${numOfQuestions}&category=${category}&difficulty=${difficulty}&type=boolean`
  );

  const resObj = await res.json();
  const results = resObj.results;

  console.log(results);
  return results;
}

play.addEventListener("click", async function () {
  currentResults = await fetchData();
  //reset the current question index
  currentQuestionIndex = 0;

  //grab statement out of API fetched object. Since the returned statement's HTML has entities (i.e., &quot;) we need to ensure that the HTML entities are correctly converted into their corresponding characters before rendering the text.
  const statement = decodeHtmlEntities(
    currentResults[currentQuestionIndex].question
  );

  //adds the statement from API fetch to statement container on screen
  statementContainer.innerText = statement;
});

nextBtn.addEventListener("click", function () {
  currentQuestionIndex++;
  for (let i = 1; i < buttons.length; i++) {
    buttons[i].removeAttribute("disabled");
  }
  for (let button of buttons) {
    button.classList.remove("correct", "incorrect");
    // Could have also written: .remove((className) => className.includes("correct"))
  }

  if (currentQuestionIndex < currentResults.length) {
    const statement = decodeHtmlEntities(
      currentResults[currentQuestionIndex].question
    );

    //adds the statement from API fetch to statement container on screen
    statementContainer.innerText = statement;
  }
});

//============ SUPPORTING FUNCTIONS ==========

//only index 1-2 bc only wanted event listener on true & False buttons
for (let i = 1; i < 3; i++) {
  buttons[i].addEventListener("click", function (e) {
    //now disable all buttons once clicked
    for (let j = 0; j < 3; j++) {
      buttons[j].setAttribute("disabled", "");
    }
    isCorrect(e.target);
  });
}

//check users guess against correct answer from returned API results
async function isCorrect(guess) {
  const correctAnswer = currentResults[currentQuestionIndex].correct_answer
    .toString()
    .toLowerCase();
  console.log("users guess:", guess.value, "correct answer:", correctAnswer);
  if (
    guess.value ===
    currentResults[currentQuestionIndex].correct_answer.toString().toLowerCase()
  ) {
    guess.classList.add("correct");
  } else guess.classList.add("incorrect");
}

function decodeHtmlEntities(text) {
  //create a temporary div element to parse and decode HTML entities from a known and trusted source (API fetch)
  const element = document.createElement("div");
  element.innerHTML = text;
  return element.textContent || element.innerText;
}

startOver.addEventListener("click", function () {
  buttons[0].removeAttribute("disabled");
  for (let i = 1; i < buttons.length; i++) {
    buttons[i].setAttribute("disabled", "");
  }
  statementContainer.innerText = "";
});

// What I learned from this project:
// You cant add eventlisteners to node list but you can iterate over a node list like an array and add event listeners to each one in the loop individually
// Type comparisons; trying to compare the inner text of event.target with a boolean from an object;
// async await for example getting the returned value of results from  fetchData() to use within play.addEventListener("click", function () {...}: I had to add async and await to the addEventListener function
//using innerHTML: needs to be decoded and then sanitized (if from user-generated or untrusted content). Sanization measures may include input validation, output encoding, and content sanitization.
