"use strict";

//timer
const timerEl = document.querySelector(".timer");
const timeTookEl = document.querySelector(".time-took");

//Whole grid
const overall = document.querySelector(".overall");
const box = document.querySelectorAll(".box");
const boxes = [...box];

//Modal Window
const overlay = document.querySelector(".overlay");
const scoreCard = document.querySelector(".score-card");
const scoreVal = document.querySelector(".score");
const scoreCardDetails = document.querySelector(".score-card-details");

//Timer Function
let time = 0; //increasing the second
let min = 0; // stores minutes
let sec; // as name says
let gameTimer; // name of the setINterval
let finalTime; // not necessarily needed
const timer = function () {
  gameTimer = setInterval(() => {
    time++;
    if (time > 60) {
      min = String(Math.trunc(time / 60)).padStart(2, 0);
    }

    sec = String(time % 60).padStart(2, 0);
    finalTime = `${min} : ${sec}`;
    timerEl.textContent = finalTime;
  }, 1000);
};
timer();

//random number generator
const randomNumber = function (arr) {
  const numb = Math.trunc(Math.random() * 36) + 1;
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

//Grid handler
const handlerFn = function (e) {
  const clickedEl = e.target;

  const clickedElAtr = +clickedEl.getAttribute("data-set");
  actNums.push(clickedElAtr);

  if (clickedEl === elementsArr[elementsArr.length - 1]) {
    play(); //playing audio
    if (actNums.length < 37) {
      const anotherRandom = randomNumber(actNums);
      actEl = boxes[anotherRandom - 1];
      elementsArr.push(actEl);

      //Updating the Score
      score = actNums.length - 1;
      // scoreVal.innerText = score;

      //Sequentially blinking the grids
      for (let i = 0; i < elementsArr.length; i++) {
        let el = elementsArr[i];
        setTimeout(function () {
          el.classList.remove("active");
          void el.offsetWidth;
          el.classList.add("active");
        }, 60 * i);
      }
    } else {
      //won the game
      let wonScore = score + 1;
      scoreCardDetailAppending(sec, wonScore);
      clearInterval(gameTimer);
      gameOver(1); //ending the game
    }
  } else {
    //lost the game
    clearInterval(gameTimer);
    scoreCardDetailAppending(sec, score);
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

// Appending the details in the scorecard and storing in locale storage.
function scoreCardDetailAppending(time, score) {
  const html = `<div class="scord-card-detail">
  You took <span class="time-took">${time}</span> seconds and scored
  <span class="score">${score}</span>
  </div>`;

  const randomNUmb = Math.random() * 20000;
  localStorage.setItem(randomNUmb, html);
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i); //each key in locale storage
    const item = localStorage.getItem(key);
    scoreCardDetails.insertAdjacentHTML("beforeend", item);
  }
}

//removing overlay
const removeOverlay = () => {
  overlay.classList.add("hidden");
  scoreCard.classList.add("hidden");
  console.log("Game Over");
};

//for click sound
function play() {
  const audio = document.getElementById("audio");
  audio.play();
}

//Event Handlers
overlay.addEventListener("click", function (e) {
  timerEl.textContent = "0:00";
  removeOverlay();
});

window.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    timerEl.textContent = "0:00";
    removeOverlay();
  }
});

overall.addEventListener("click", handlerFn);
