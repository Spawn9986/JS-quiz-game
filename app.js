const statementContainer = document.querySelector(".statement");
const buttons = Array.from(document.querySelectorAll("button"));
const play = document.querySelector(".play");
const nextBtn = document.querySelector(".next");

console.log(buttons);

async function fetchData() {
  const numOfQuestions = document.querySelector("input").value;
  const category = Array.from(document.querySelectorAll("select"))[0].value;
  const difficulty = Array.from(document.querySelectorAll("select"))[1].value;

  const res = await fetch(
    `https://opentdb.com/api.php?amount=${numOfQuestions}&category=${category}&difficulty=${difficulty}&type=boolean`
  );

  const resObj = await res.json();
  const results = resObj.results[0];

  return results;
}

play.addEventListener("click", async function () {
  const results = await fetchData();

  //grab statement out of API fetched object
  const statement = decodeHtmlEntities(results.question);
  console.log(statement);

  //adds the statement from API fetch to statement container on screen
  statementContainer.innerHTML = statement;
});

//============ SUPPORTING FUNCTIONS ==========

nextBtn.addEventListener("click", function () {
  console.log("clicked nextBtn");
});

//only index 1-2 bc only wanted event listener on true & False buttons
for (let i = 1; i < 3; i++) {
  buttons[i].addEventListener("click", function (e) {
    //now disable all buttons once clicked
    /* for (let button of buttons) {
        button.setAttribute("disabled", "");
      } */
    isCorrect(e.target, results);
  });
}

//check users guess against correct answer from returned API results
async function isCorrect(guess) {
  const results = await fetchData();
  if (guess.value === results.correct_answer.toString()) {
    console.log("true");
  } else console.log("false");
}

// Function to decode HTML entities
function decodeHtmlEntities(text) {
  const element = document.createElement("div");
  element.innerHTML = text;
  return element.textContent || element.innerText;
}

// What I learned from this project:
// You cant add eventlisteners to node list but you can iterate over a node list like an array and add event listeners to each one in the loop individually
// Type comparisons; trying to compare the inner text of event.target with a boolean from an object;
// async await for example getting the returned value of results from  fetchData() to use within play.addEventListener("click", function () {...}: I had to add async and await to the addEventListener function
