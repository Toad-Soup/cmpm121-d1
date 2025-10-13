import "./style.css";

// Simple counter for demonstration
let counter: number = 0;
let growthRate: number = 0;

//refactor or whatever to classes
interface Item {
  name: string;
  cost: number;
  rate: number;
  element?: HTMLButtonElement;
}

const availableItems: Item[] = [
  { name: "Turn Table", cost: 10, rate: 0.1 },
  { name: "BoomBox", cost: 100, rate: 2 },
  { name: "surround sound System", cost: 1000, rate: 50 },
];

// Create basic HTML structure
//added body of the button and used styling in CSS to remove border
document.body.innerHTML = `
  <h1>CD Player</h1>
  <p>Times Played: <span id="counter">0</span></p>
  <div>Time playing per second: <span id="growth">0</span></div>
  <div class="button-container">
    <button class="favorite styled" id="increment">💿</button>
    <div id="upgrade-buttons"></div>
  </div>
`;

// const click handler
const button = document.getElementById("increment")!;
const counterElement = document.getElementById("counter")!;
const growthElement = document.getElementById("growth")!;
const upgradeContainer = document.getElementById("upgrade-buttons")!;

button.addEventListener("click", () => {
  // increment the counter when the button is clicked
  counter += 1;
  counterElement.innerHTML = counter.toFixed(2);
  button.classList.add("spin"); //stop the animation so that it can spin again when clicked
  button.addEventListener("animationend", () => {
    button.classList.remove("spin");
  }, { once: true }); // 'once: true' ensures the event listener runs only once
});

autoclicker();

//simplified code. thx tate appreciate u m8 :p
function autoclicker() {
  setInterval(() => {
    counter += growthRate;
    console.log(growthRate);
    console.log(counter);
    counterElement.innerHTML = counter.toFixed(2);
  }, 1000);

  button.classList.add("infinite-spin");
}

//for each button/upgrade in avalible items: run this code
//kinda like an effed up for loop lol
availableItems.forEach((item, index) => {
  const btn = document.createElement("button"); //create new button to be displayed

  //display the buttons info
  btn.textContent = `${item.name} Cost: ${item.cost.toFixed(2)}`;
  btn.className = `upgrade${index + 1}`;
  upgradeContainer.appendChild(btn); //this was an absolute beast

  item.element = btn;

  //code for when one of the upgrade buttons is clicked
  //essentially used a replica of my old code but much more orderly since like
  //we have the classe now lol
  btn.addEventListener("click", () => {
    if (counter >= item.cost) {
      counter -= item.cost;
      growthRate += item.rate;

      item.cost *= 1.15;
      btn.textContent = `${item.name} Cost: ${item.cost.toFixed(2)}`;
      growthElement.innerHTML = growthRate.toFixed(2);
      counterElement.innerHTML = counter.toFixed(2);
    }
    //spin the button forever now that its auto clicking
    button.classList.add("infinite-spin");
  });
});
