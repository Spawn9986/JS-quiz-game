const statementContainer = document.querySelector(".statement");
const buttons = Array.from(document.querySelectorAll("button"));
const play = document.querySelector(".play");

play.addEventListener("click", function () {
  fetchData();
});

async function fetchData() {
  const numOfQuestions = document.querySelector("input").value;
  const category = Array.from(document.querySelectorAll("select"))[0].value;
  const difficulty = Array.from(document.querySelectorAll("select"))[1].value;

  const res = await fetch(
    `https://opentdb.com/api.php?amount=${numOfQuestions}&category=${category}&difficulty=${difficulty}&type=boolean`
  );

  const resObj = await res.json();
  const results = resObj.results[0];
  const statement = results.question;
  console.log(results);
  console.log(statement);

  addStatement(statement);
  return results;
}

function addStatement(statement) {
  statementContainer.textContent = statement;
}

// What I learned from this project:
// You cant add eventlisteners to node list but you can iterate over a node list like an array and add event listeners to each one in the loop individually
// Type comparisons; trying to compare the inner text of event.target with a boolean from an object;
