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
const autoClicker = document.getElementById("upgrade1")!;
const autoClicker2 = document.getElementById("upgrade2")!;
const autoClicker3 = document.getElementById("upgrade3")!;

//add the ability to click the button
button.addEventListener("click", () => {
  // increment the counter when the button is clicked
  counter += 1;
  counterElement.innerHTML = counter.toString();
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

let lastTime: number = 0;

autoClicker.addEventListener("click", () => {
  if (counter >= ACost) {
    lastTime = performance.now();
    ACost *= 1.15;
    growthRate += .1;
    autoClicker.innerHTML = "Auto Clicker Cost: " + ACost.toFixed(2);
    growthElement.innerHTML = growthRate.toString();
    requestAnimationFrame(animate1);
  }
});

//requestAnimationFrame(animate);
function animate1(timestamp: number) {
  if (lastTime != null) { //make sure that time has passed and is valid
    //calulate delta time for times passed, refrence: https://stackoverflow.com/questions/26576625/how-can-i-correctly-calculate-the-time-delta
    const value = (timestamp - lastTime) / 1000; //take the current time, subtract the last time, and divide it by one second to find delta
    counter += value / 100; //increment the counter by the delta time that has passed based on framerate (so like 1/60th if 60 fps)
    counterElement.innerHTML = counter.toFixed(2); //increment by 1 per second but the value is a float it needs to be fixed so it doesnt look bad
    button.classList.add("infinite-spin");
  }

  lastTime = timestamp;
  requestAnimationFrame((t) => animate1(t));
}

autoClicker2.addEventListener("click", () => {
  if (counter >= BCost) {
    lastTime = performance.now();
    BCost *= 1.5;
    growthRate += 2;
    autoClicker2.innerHTML = "Auto Clicker Cost: " + BCost.toFixed(2);
    growthElement.innerHTML = growthRate.toString();
    requestAnimationFrame(animate2);
  }
});

//requestAnimationFrame(animate);
function animate2() {
  setInterval(() => {
    counter += 2;
    counterElement.innerHTML = counter.toString();
  }, 1000);
}

autoClicker3.addEventListener("click", () => {
  if (counter >= CCost) {
    lastTime = performance.now();
    CCost *= 1.5;
    growthRate += 50;
    autoClicker3.innerHTML = "Auto Clicker Cost: " + CCost.toFixed(2);
    growthElement.innerHTML = growthRate.toString();
    requestAnimationFrame(animate3);
  }
});

//requestAnimationFrame(animate);
function animate3() {
  setInterval(() => {
    counter += 50;
    counterElement.innerHTML = counter.toString();
  }, 1000);
}
