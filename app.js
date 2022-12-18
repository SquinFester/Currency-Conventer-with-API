// const selectory *global*

const firstSelector = document.querySelector("#first-value");
const secoundSelector = document.querySelector("#secound-value");

//api
const pln = {
  currency: "złoty",
  code: "PLN",
  mid: 1,
};

fetch("https://api.nbp.pl/api/exchangerates/tables/A?format=json")
  .then((response) => response.json())
  .then((object) => {
    //add pln to object
    object[0].rates.unshift(pln);

    //render
    addOption(object[0].rates, firstSelector);
    addOption(object[0].rates, secoundSelector);
  });

// filp arrows
const arrows = document.querySelector("#arrows");
let deg = 90;
arrows.style.transform = `rotate(${deg}deg)`;
arrows.addEventListener("click", () => {
  deg += 180;
  arrows.style.transform = `rotate(${deg}deg)`;
  swap();
});

// listener for input
let number;
document.querySelector("#input-value").addEventListener("input", (e) => {
  let valueToInput = e.target;
  number = valueToInput.value;
  counter();
});

// change value
function swap() {
  const firstValue = document.querySelector("#first-value");
  const secoundValue = document.querySelector("#secound-value");
  let bridge = firstValue.value;

  firstValue.value = secoundValue.value;
  secoundValue.value = bridge;
  changeCurs(firstSelector.value, 2, secoundSelector.value);
  counter();
}

// listener for change option in selector

document.querySelectorAll("select").forEach((element) => {
  element.addEventListener("change", () => {
    changeCurs(firstSelector.value, 2, secoundSelector.value);
    counter();
  });
});

// generate option in select
const addOption = (option, place) => {
  for (let i = 0; i < option.length; i++) {
    const object = document.createElement("option");
    object.value = option[i].code;
    object.innerHTML = option[i].code;
    object.dataset.currency = option[i].mid;
    place.appendChild(object);
  }
};

//change value in top section
const curs = document.querySelector("#curs");
const cursB = document.querySelector("#curs-bottom");

const changeCurs = () => {
  let a;
  let b;

  firstSelector
    .querySelectorAll("option")
    .forEach((o) => (o.selected ? (a = Number(o.dataset.currency)) : ""));

  secoundSelector
    .querySelectorAll("option")
    .forEach((o) => (o.selected ? (b = Number(o.dataset.currency)) : ""));

  curs.innerHTML = `1 ${firstSelector.value} is calculated`;
  cursB.innerHTML = `${(a / b).toFixed(2)} ${secoundSelector.value}`;
};

// counter
const counter = () => {
  let a;
  let b;
  let num = Number(number);
  const result = document.querySelector("#result");

  firstSelector
    .querySelectorAll("option")
    .forEach((o) => (o.selected ? (a = Number(o.dataset.currency)) : ""));

  secoundSelector
    .querySelectorAll("option")
    .forEach((o) => (o.selected ? (b = Number(o.dataset.currency)) : ""));
  result.value = ((a * num) / b).toFixed(2);
};
