let lifespan_div_div = document.querySelector(".lifespan-div-div");
let b_date;
//check localstorage and if empty prompt and input for new one otherwise load from localstorage
if (localStorage.getItem("b_date") == null) {
  b_date = String(prompt("Enter your birthdate (yyyy-mm-dd) :"));
  localStorage.setItem("b_date", b_date);
  b_date = new Date(b_date);
} else {
  b_date = new Date(`${localStorage.getItem("b_date")}`);
}
let eclipsed_time = (new Date() - b_date) / (1000 * 86400 * 7);
let time_left = 60 * 12 * 4 - eclipsed_time;
console.log(time_left);

//eclipesed time divs
for (let i = 0; i < Math.ceil(eclipsed_time); i++) {
  let new_div = document.createElement("div");
  new_div.className = "eclipsed-div";
  lifespan_div_div.appendChild(new_div);
}

//time left divs
for (let i = 0; i < Math.ceil(eclipsed_time); i++) {
  let new_div = document.createElement("div");
  new_div.className = "left-div";
  lifespan_div_div.appendChild(new_div);
}

//add onclick event on add-button
document.querySelector("#add-button").addEventListener("click", addNote);

let items = [];
//check local storage and update items

function addNote() {
  //check for a empty spot in items and push to it
  let title = prompt("Note Title");
  let item_button = document.createElement("button");
  item_button.innerHTML = title;
  item_button.id = `button-${items.length}`;
  item_button.addEventListener("click", updateTextarea);
  item_button.addEventListener("dblclick", removeItem);
  document.querySelector(".notes-div").appendChild(item_button);
  items.push([`button-${items.length}`, title, ""]);
}

function updateTextarea(button_element) {}

function removeItem(button_element) {
  console.log(button_element.target.id);
  document.getElementById(button_element.target.id).remove();
  //find the item in list and remove it
}
