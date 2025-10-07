import "./style.css";

// Simple counter for demonstration
let counter: number = 0;

// Create basic HTML structure
//added body of the button and used styling in CSS to remove border
document.body.innerHTML = `
  <h1>CD Player</h1>
  <p>Counter: <span id="counter">0</span></p>
  <button class = "favorite styled"
    id="increment">💿</button>
`;

// const click handler
const button = document.getElementById("increment")!;
const counterElement = document.getElementById("counter")!;

//add the ability to click the button
button.addEventListener("click", () => {
  // increment the counter when the button is clicked
  counter += 1;
  counterElement.innerHTML = counter.toString();
});

/*step 3 increase coiunt by 1 each second using setInterval
setInterval(() => {
  counter += 1;
  counterElement.innerHTML = counter.toString();
}, 1000); //1000 milliseconds in a second, had to google that :p
*/

//step 4 increment count every second based on frame rate
let lastTime = performance.now();

requestAnimationFrame(animate);
function animate(timestamp: number) {
  if (lastTime != null) { //make sure that time has passed and is valid
    //calulate delta time for times passed, refrence: https://stackoverflow.com/questions/26576625/how-can-i-correctly-calculate-the-time-delta
    const value = (timestamp - lastTime) / 1000; //take the current time, subtract the last time, and divide it by one second to find delta
    counter += value; //increment the counter by the delta time that has passed based on framerate (so like 1/60th if 60 fps)
    counterElement.innerHTML = counter.toFixed(0); //increment by 1 per second but the value is a float it needs to be fixed so it doesnt look bad
  }

  lastTime = timestamp;
  requestAnimationFrame((t) => animate(t));
}
