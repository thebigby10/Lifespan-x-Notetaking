//fix the lifespan calender section
let lifespan_div_div = document.querySelector(".lifespan-div-div");
let b_date = new Date("2023-08-08");
// check localstorage and if empty prompt and input for new one otherwise load from localstorage
if (localStorage.getItem("b_date") == null) {
  b_date = String(prompt("Enter your birthdate (yyyy-mm-dd) :"));
  localStorage.setItem("b_date", b_date);
  b_date = new Date(b_date);
} else {
  b_date = new Date(`${localStorage.getItem("b_date")}`);
}
let eclipsed_time = (new Date() - b_date) / (1000 * 86400 * 7);
let time_left = 60 * 12 * 4 - eclipsed_time;
let timeleft_percentage = (time_left * 100) / (60 * 12 * 4);
console.log(timeleft_percentage);
console.log(time_left);
document.querySelector("#timeleft-span").innerHTML =
  `Your Lifespan in Weeks (${Math.ceil(timeleft_percentage)}% left)`;

//eclipesed time divs
for (let i = 0; i < Math.ceil(eclipsed_time); i++) {
  let new_div = document.createElement("div");
  new_div.className = "eclipsed-div";
  lifespan_div_div.appendChild(new_div);
}

//time left divs
for (let i = 0; i < Math.ceil(time_left); i++) {
  let new_div = document.createElement("div");
  new_div.className = "left-div";
  lifespan_div_div.appendChild(new_div);
}

/* -------------------------------- NOTE TAKING LOGIC ------------------------------------------ */

let items = [["quicknote-button", "Quick Note", ""]];

//check local storage and update items
if (JSON.parse(localStorage.getItem("items")) != null) {
  items = JSON.parse(localStorage.getItem("items"));
  //add localstorage items button
  for (let i = 1; i < items.length; i++) {
    //add buttons
    if (items[i][0] != "-1") {
      let title = items[i][1];
      let item_button = document.createElement("button");
      item_button.innerHTML = title;
      item_button.id = `button-${i}`;
      item_button.addEventListener("click", updateTextarea);
      item_button.addEventListener("dblclick", removeItem);
      document.querySelector(".notes-div").appendChild(item_button);
    }
  }
} else {
  localStorage.setItem("items", JSON.stringify(items));
}

//add onclick event on add-button
document.querySelector("#add-button").addEventListener("click", addNote_button);
document
  .querySelector("#quicknote-button")
  .addEventListener("click", updateTextarea);
let selectedButton_id = "quicknote-button";
//add eventlistener to textarea
document.querySelector("textarea").addEventListener("input", () => {
  let ind = searchItem(items, selectedButton_id);
  console.log("change?");
  items[ind][2] = document.querySelector("textarea").value;
  localStorage.setItem("items", JSON.stringify(items));
});

function addNote_button() {
  //check for a empty spot in items and push to it
  let lastElement = true;
  for (let i = 0; i < items.length; i++) {
    if (items[i][0] == "-1") {
      lastElement = false;
      let title = prompt("Note Title");
      let item_button = document.createElement("button");
      item_button.innerHTML = title;
      item_button.id = `button-${i}`;
      item_button.addEventListener("click", updateTextarea);
      item_button.addEventListener("dblclick", removeItem);
      document.querySelector(".notes-div").appendChild(item_button);
      items.push([`button-${i}`, title, ""]);
      localStorage.setItem("items", JSON.stringify(items));
      break;
    }
  }
  if (lastElement) {
    let title = prompt("Note Title");
    let item_button = document.createElement("button");
    item_button.innerHTML = title;
    item_button.id = `button-${items.length}`;
    item_button.addEventListener("click", updateTextarea);
    item_button.addEventListener("dblclick", removeItem);
    document.querySelector(".notes-div").appendChild(item_button);
    items.push([`button-${items.length}`, title, ""]);
    localStorage.setItem("items", JSON.stringify(items));
  }
}

function updateTextarea(button_element) {
  //search for button element
  let ind = searchItem(items, button_element.target.id);
  document.querySelector("textarea").value = items[ind][2];
  selectedButton_id = button_element.target.id;
  //TODO : update the color of the selected button
}

function removeItem(button_element) {
  console.log(button_element.target.id);
  //find the item in list and remove it
  for (let i = 0; i < items.length; i++) {
    if (items[i][0] == button_element.target.id) {
      items[i][0] = "-1";
      items[i][1] = "";
      items[i][2] = "";
    }
  }
  document.getElementById(button_element.target.id).remove();
  localStorage.setItem("items", JSON.stringify(items));
}

function searchItem(items, item_id) {
  //returns id if found else retunrs -1
  for (let i = 0; i < items.length; i++) {
    if (items[i][0] == item_id) return i;
  }
  return -1;
}
