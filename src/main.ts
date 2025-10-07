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

//step 3 increase coiunt by 1 each second using setInterval
setInterval(() => {
  counter += 1;
  counterElement.innerHTML = counter.toString();
}, 1000); //1000 milliseconds in a second, had to google that :p
