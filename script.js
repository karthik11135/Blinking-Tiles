"use strict";

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

const randomNumber = function (arr) {
  const numb = Math.trunc(Math.random() * 16) + 1;
  if (arr.length) {
    return arr.includes(numb) ? randomNumber(arr) : numb;
  } else return numb;
};

const firstEl = boxes[randomNumber([]) - 1];
const firstAtr = firstEl.getAttribute("data-set");

let actEl;
let actNums = [];

let elementsArr = [firstEl];
firstEl.classList.add("active");
actNums.push(firstAtr);

const handlerFn = function (e) {
  const clickedEl = e.target;
  const clickedElAtr = Number(clickedEl.getAttribute("data-set"));
  actNums.push(clickedElAtr);

  if (typeof clickedElAtr === "number") {
    if (clickedEl === elementsArr[elementsArr.length - 1]) {
      if (actNums.length !== 16) {
        const anotherRandom = randomNumber(actNums);
        actEl = boxes[anotherRandom - 1];
        elementsArr.push(actEl);
        elementsArr.forEach((el) => {
          el.classList.remove('active');
          el.classList.add("active");
        });
      } else {
        alert(`You've finished the game successfully!!`)
        overall.removeEventListener("click", handlerFn);
      }
    } else {
      alert("You did not click the right one");
      console.log('Over');
      overall.removeEventListener("click", handlerFn);
    }
  }
};

overall.addEventListener("click", handlerFn);
