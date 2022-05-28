"use strict";

//Whole grid
const overall = document.querySelector(".overall");
const box = document.querySelectorAll(".box");
const box1 = document.querySelector(".box1");
const box2 = document.querySelector(".box2");
const box3 = document.querySelector(".box3");
const box4 = document.querySelector(".box4");
const box5 = document.querySelector(".box6");
const box7 = document.querySelector(".box7");
const box8 = document.querySelector(".box8");
const box9 = document.querySelector(".box9");
const box10 = document.querySelector(".box10");
const box11 = document.querySelector(".box12");
const box13 = document.querySelector(".box13");
const box14 = document.querySelector(".box14");
const box15 = document.querySelector(".box15");
const box16 = document.querySelector(".box16");
const boxes = [...box];

//Modal Window
const overlay = document.querySelector(".overlay");
const scoreCard = document.querySelector(".score-card");
const scoreVal = document.querySelector(".score");

//random number generator
const randomNumber = function (arr) {
  const numb = Math.trunc(Math.random() * 16) + 1;
  if (arr.length) {
    return arr.includes(numb) ? randomNumber(arr) : numb;
  } else return numb;
};

//Randomly generating the first block to blink
const firstEl = boxes[randomNumber([]) - 1];
const firstAtr = firstEl.getAttribute("data-set");

let actEl; //Element which is clicked correctly
let actNums = []; // Contains Attributes of elements clicked
let score = 0; // Overall score updating after each click

let elementsArr = [firstEl]; //Array holding elements when clicked

//To make the blink visibly clear
setTimeout(() => {
  firstEl.classList.add("active");
}, 300);

actNums.push(+firstAtr);

const handlerFn = function (e) {
  const clickedEl = e.target;
  const clickedElAtr = +clickedEl.getAttribute("data-set");
  actNums.push(clickedElAtr);

  if (clickedEl === elementsArr[elementsArr.length - 1]) {
    if (actNums.length < 17) {
      const anotherRandom = randomNumber(actNums);
      actEl = boxes[anotherRandom - 1];
      elementsArr.push(actEl);

      //Updating the Score
      score = actNums.length - 1;
      scoreVal.innerText = score;

      //Sequentially blinking the grids
      for (let i = 0; i < elementsArr.length; i++) {
        let el = elementsArr[i];
        setTimeout(function () {
          el.classList.remove("active");
          void el.offsetWidth;
          el.classList.add("active");
        }, 75 * i);
      }
    } else {
      scoreVal.innerText = score + 1;
      gameOver(1); //ending the game
    }
  } else {
    gameOver(0);
  }
};

function gameOver(num) {
  num === 1 ? console.log("You won") : console.log("You lost");
  scoreCard.classList.remove("hidden");
  overall.removeEventListener("click", handlerFn);
  overlay.classList.remove("hidden");
  console.log("Game over, refresh to restart");
}

const removeOverlay = () => {
  overlay.classList.add("hidden");
  scoreCard.classList.add("hidden");
  console.log("Game Over");
};

overlay.addEventListener("click", function (e) {
  removeOverlay();
});

window.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    removeOverlay();
  }
});

overall.addEventListener("click", handlerFn);
