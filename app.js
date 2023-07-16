const statementContainer = document.querySelector(".statement");
const buttons = document.querySelectorAll(".options button");
const explanationContainer = document.querySelector(".explanation");

const obj = {
  statement: "Arrays are primitive values",
  answer: false,
  explanation:
    "In JavaScript, a primitive (primitive value, primitive data type) is data that is not an object (arrays are objects) and has no methods or properties",
};

function isCorrect(guess) {
  if (guess.value === obj.answer.toString()) {
    console.log("true");
  } else console.log("false");
}

statementContainer.innerText = obj.statement;

for (let button of buttons) {
  button.addEventListener("click", function (e) {
    isCorrect(e.target);
  });
}

//button.setAttribute("disabled", "");

// What I learned from this project:
// You cant add eventlisteners to node list but you can iterate over a node list like an array and add event listeners to each one in the loop individually
// Type comparisons; trying to compare the inner text of event.target with a boolean from an object;
