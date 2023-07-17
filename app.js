async function fetchData() {
  const res = await fetch(
    "https://opentdb.com/api.php?amount=1&difficulty=easy&type=boolean"
  );
  const resObj = await res.json();
  const results = resObj.results[0];
  console.log(results);
  return results;
}

fetchData();

let statementContainer = document.querySelector(".statement");
let buttons = Array.from(document.querySelectorAll("button"));


// What I learned from this project:
// You cant add eventlisteners to node list but you can iterate over a node list like an array and add event listeners to each one in the loop individually
// Type comparisons; trying to compare the inner text of event.target with a boolean from an object;
