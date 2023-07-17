//================= GLOBAL VARIABLES =======================
const statementContainer = document.querySelector(".statement");
const buttons = Array.from(document.querySelectorAll("button"));
const playBtn = document.querySelector(".play");
const nextBtn = document.querySelector(".next");
//store the current results from API fetch so that I dont make an API fetch each time I call a function etc
let currentResults;
let currentQuestionIndex = 0;
const startOverBtn = document.querySelector(".startOver");
//TODO Add score later if still desired
let score = 0;

//====================== MAIN FUNCTIONS ======================

//user decides to star the quiz!
playBtn.addEventListener("click", async function () {
  //set to desirable state in case previous play
  for (let i = 1; i < buttons.length; i++) {
    buttons[i].removeAttribute("disabled");
  }

  //set to desirable state in case previous play
  buttons[0].setAttribute("disabled", "");
  buttons[3].setAttribute("disabled", "");

  currentResults = await fetchData();
  //reset the current question index in case previous play
  currentQuestionIndex = 0;

  //grab statement out of API fetched object. Since the returned statement's HTML has entities (i.e., &quot;) we need to ensure that the HTML entities are correctly converted into their corresponding characters before rendering the text. By assigning text to element.innerText (in the function declaration), the HTML entities within text are automatically decoded and translated into their corresponding characters. This is because assigning a value to innerText triggers the browser's HTML entity decoding functionality.
  const statement = decodeHtmlEntities(
    // some times the API fetch returns: question is undefined so I am using a ?. to check it first.
    //TODO go back and create a work around if the question returns undefined such as retry etc
    currentResults[currentQuestionIndex]?.question
  );

  //adds the statement from API fetch (after being decoded using temp div element) to statement container on screen
  statementContainer.innerText = statement;
});

//user clicks the next question button
nextBtn.addEventListener("click", function () {
  // TODO this needs to be finished. In its current state it works great until we get to the last question in the iteration (may need to alter isCorrect())
  if (currentQuestionIndex <= currentResults.length - 1) {
    currentQuestionIndex++;
  } else
    for (let i = 0; i < 4; i++) {
      buttons[i].setAttribute("disabled", "");
    }
  // creating ideal state after user clicks next btn
  for (let i = 1; i < buttons.length; i++) {
    buttons[i].removeAttribute("disabled");
  }
  buttons[3].setAttribute("disabled", "");
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

async function fetchData() {
  //user customizes fetch based on preference from inputs
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

function decodeHtmlEntities(text) {
  //create a temporary div element to parse and decode HTML entities from a known and trusted source (API fetch)
  const element = document.createElement("div");
  //acess new properties/ keys on the newly created div element
  element.innerHTML = text;
  return element.textContent || element.innerText;
}

//only index 1-2 bc only wanted event listener on true & false buttons
for (let i = 1; i < 3; i++) {
  buttons[i].addEventListener("click", function (e) {
    //now disable all buttons once clicked
    for (let j = 0; j < 3; j++) {
      buttons[j].setAttribute("disabled", "");
    }
    isCorrect(e.target);
    buttons[3].removeAttribute("disabled");
  });
}

//check users guess against correct answer from returned API results
async function isCorrect(guess) {
  //grab answer from API and format
  const correctAnswer = currentResults[currentQuestionIndex].correct_answer
    .toString()
    .toLowerCase();

  if (guess.value === correctAnswer) {
    guess.classList.add("correct");
  } else guess.classList.add("incorrect");
}

startOverBtn.addEventListener("click", function () {
  // create an ideal state that we would expect if starting over
  startState();
});

function startState() {
  score = 0;
  currentQuestionIndex = 0;
  buttons[0].removeAttribute("disabled");

  for (let i = 1; i < buttons.length; i++) {
    buttons[i].setAttribute("disabled", "");
  }

  statementContainer.innerText = "";

  for (let button of buttons) {
    button.classList.remove("correct", "incorrect");
    // Could have also written: .remove((className) => className.includes("correct"))
  }
}

startState();

// What I learned from this project:
// You cant add eventlisteners to node list but you can iterate over a node list like an array and add event listeners to each one in the loop individually
// Type comparisons; trying to compare the inner text of event.target with a boolean from an object;
// async await for example getting the returned value of results from  fetchData() to use within play.addEventListener("click", function () {...}: I had to add async and await to the addEventListener function
//using innerHTML: needs to be decoded and then sanitized (if from user-generated or untrusted content). Sanization measures may include input validation, output encoding, and content sanitization.
