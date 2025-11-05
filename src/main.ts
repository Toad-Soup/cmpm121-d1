import "./style.css";

// Simple counter for demonstration
let counter: number = 0;
let growthRate: number = 0;

//refactored to classes
interface Item {
  name: string;
  cost: number;
  rate: number;
  text: string;
  element?: HTMLButtonElement;
}

const availableItems: Item[] = [
  {
    name: "Turn Table",
    cost: 10,
    rate: 0.1,
    text: "Simple turn table, plays music slowly",
  },
  {
    name: "BoomBox",
    cost: 100,
    rate: 2,
    text: "Boombox: slightly more expensive, but has better audio quality",
  },
  {
    name: "Ipod Nano",
    cost: 1000,
    rate: 50,
    text: "Small yet stylish the Ipod Nano is an upgrade to any outfit",
  },
  {
    name: "Stereo",
    cost: 10000,
    rate: 100,
    text: "Stereos: classic, gets the job done",
  },
  {
    name: "Stolen Car Radio",
    cost: 100000,
    rate: 1000,
    text: "Where did you even get that?!",
  },
];

// Create basic HTML structure
//added body of the button and used styling in CSS to remove border
document.body.innerHTML = `
  <h1>CD Player</h1>
  <p>Times Played: <span id="counter">0</span></p>
  <div>Times played per second: <span id="growth">0</span></div>
  <div class="button-container">
    <button class="favorite styled" id="increment">💿</button>
    <div id="upgrade-buttons"></div>
  </div>
  <div id="tooltip" class="hidden"></div> <!-- Tooltip div -->
`;

// const click handler
const button = document.getElementById("increment")!;
const counterElement = document.getElementById("counter")!;
const growthElement = document.getElementById("growth")!;
const upgradeContainer = document.getElementById("upgrade-buttons")!;
const tooltip = document.getElementById("tooltip")!;

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

//simplified code
function autoclicker() {
  setInterval(() => {
    counter += growthRate;
    counterElement.innerHTML = counter.toFixed(2);
  }, 1000);

  button.classList.add("infinite-spin");
}

//for each button/upgrade in avalible items: run this code
availableItems.forEach((item, index) => {
  const displayButton = document.createElement("button"); //create new button to be displayed

  //display the buttons info
  displayButton.textContent = `${item.name} Cost: ${item.cost.toFixed(2)}`;
  displayButton.className = `upgradeClass${index + 1}`;
  upgradeContainer.appendChild(displayButton); //this was an absolute beast

  item.element = displayButton;

  //shows text box when the mouse hovers over one of te buttons
  const tooltipText = `${item.text}`;

  // Hover events
  displayButton.addEventListener("mouseenter", () => {
    tooltip.textContent = tooltipText;
    tooltip.classList.remove("hidden");
  });

  displayButton.addEventListener("mousemove", (e) => {
    tooltip.style.left = `${e.pageX + 10}px`;
    tooltip.style.top = `${e.pageY + 10}px`;
  });

  displayButton.addEventListener("mouseleave", () => {
    tooltip.classList.add("hidden");
  });

  //code for when one of the upgrade buttons is clicked
  displayButton.addEventListener("click", () => {
    if (counter >= item.cost) {
      counter -= item.cost;
      growthRate += item.rate;

      item.cost *= 1.15;
      displayButton.textContent = `${item.name} Cost: ${item.cost.toFixed(2)}`;
      growthElement.innerHTML = growthRate.toFixed(2);
      counterElement.innerHTML = counter.toFixed(2);
    }
    //spin the button forever now that its auto clicking
    button.classList.add("infinite-spin");
  });
});
