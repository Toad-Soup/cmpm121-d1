import "./style.css";

// Simple counter for demonstration
let counter: number = 0;
let growthRate: number = 0;
let ACost: number = 10;
let BCost: number = 100;
let CCost: number = 1000;

// Create basic HTML structure
//added body of the button and used styling in CSS to remove border
document.body.innerHTML = `
  <h1>CD Player</h1>
  <p>Times Played: <span id="counter">0</span></p>
  <div>Time playing per second: <span id = "growth">0</span></div>
  <div class = "button-container">
    <button class = "favorite styled" id="increment">💿</button>
    <button class = "upgrade1" id = "upgrade1">Auto Clicker Cost: 10</button>
    <button class = "upgrade2" id = "upgrade2">Auto Clicker Cost: 100</button>
    <button class = "upgrade3" id = "upgrade3">Auto Clicker Cost: 1000<button>
  <div>
`;

// const click handler
const button = document.getElementById("increment")!;
const counterElement = document.getElementById("counter")!;
const growthElement = document.getElementById("growth")!;
const autoClicker1 = document.getElementById("upgrade1")!;
const autoClicker2 = document.getElementById("upgrade2")!;
const autoClicker3 = document.getElementById("upgrade3")!;

//add the ability to click the button
button.addEventListener("click", () => {
  // increment the counter when the button is clicked
  counter += 1;
  counterElement.innerHTML = counter.toFixed(2);
  button.classList.add("spin");

  //stop the animation so that it can spin again when clicked
  button.addEventListener("animationend", () => {
    button.classList.remove("spin");
  }, { once: true }); // 'once: true' ensures the event listener runs only once
});

/*step 3 increase coiunt by 1 each second using setInterval
setInterval(() => {
  counter += 1;
  counterElement.innerHTML = counter.toString();
}, 1000); //1000 milliseconds in a second, had to google that :p
*/

autoclicker();
//let lastTime: number = 0;

autoClicker1.addEventListener("click", () => {
  if (counter >= ACost) {
    //lastTime = performance.now();
    counter -= ACost;
    ACost *= 1.15;
    growthRate += 0.1;
    autoClicker1.innerHTML = "Auto Clicker Cost: " + ACost.toFixed(2);
    growthElement.innerHTML = growthRate.toFixed(2);
  }
});

autoClicker2.addEventListener("click", () => {
  if (counter >= BCost) {
    //lastTime = performance.now();
    counter -= BCost;
    BCost *= 1.5;
    growthRate += 2;
    autoClicker2.innerHTML = "Auto Clicker Cost: " + BCost.toFixed(2);
    growthElement.innerHTML = growthRate.toFixed(2);
  }
});

autoClicker3.addEventListener("click", () => {
  if (counter >= CCost) {
    //lastTime = performance.now();
    counter -= CCost;
    CCost *= 1.5;
    growthRate += 50;
    autoClicker3.innerHTML = "Auto Clicker Cost: " + CCost.toFixed(2);
    growthElement.innerHTML = growthRate.toFixed(2);
  }
});

//simplified code. thx tate appreciate u m8 :p
function autoclicker() {
  setInterval(() => {
    counter += growthRate;
    counterElement.innerHTML = counter.toFixed(2);
  }, 1000);

  button.classList.add("infinite-spin");
}
