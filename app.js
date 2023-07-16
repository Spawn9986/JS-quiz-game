const statementContainer = document.querySelector(".statement");
const buttons = document.querySelectorAll(".options button");
const explanationContainer = document.querySelector(".explanation");

const obj = {
  statement: "this is my test statement",
  answer: "this is my answer",
  explanation: "this is my explaination",
};

for (let button of buttons) {
  button.addEventListener("click", function () {
    console.log("button clicked");
  });
}

// What I learned from this project:
// You cant add eventlisteners to node list but you can iterate over a node list like an array and add event listeners to each one in the loop individually
