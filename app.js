const statementContainer = document.querySelector(".statement");
const buttons = document.querySelectorAll(".options button");
const explanationContainer = document.querySelector(".explanation");

async function fetchData() {
    const res = await fetch(
      "https://opentdb.com/api.php?amount=1&difficulty=easy&type=boolean"
    );
    const resObj = await res.json();
    console.log(resObj);
  }

function isCorrect(guess) {
  if (guess.value === obj.answer.toString()) {
    guess.classList.add("correct");
  } else guess.classList.add("incorrect");
}

statementContainer.innerText = obj.statement;

for (let button of buttons) {
  button.addEventListener("click", function (e) {
    for (let button of buttons) {
      button.setAttribute("disabled", "");
    }
    explanationContainer.innerText = obj.explanation;

    isCorrect(e.target);
  });
}

fetchData();

// What I learned from this project:
// You cant add eventlisteners to node list but you can iterate over a node list like an array and add event listeners to each one in the loop individually
// Type comparisons; trying to compare the inner text of event.target with a boolean from an object;
