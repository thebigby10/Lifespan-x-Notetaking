let lifespan_div_div = document.querySelector(".lifespan-div-div");
let b_date = new Date(2001, 10, 23);
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
