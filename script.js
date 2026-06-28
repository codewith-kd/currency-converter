
let BASE_URL =
  "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

let container = document.querySelectorAll(".container select");
let btn = document.querySelector(".btn");
let formcurr = document.querySelector(".option1");
let tocurr = document.querySelector(".option2");
let msg =document.querySelector(".msg")




// Move this function ABOVE the loop
const updateflag = (element) => {
  let currcode = element.value;
  let countrycode = countryList[currcode];
  let newSrc = `https://flagsapi.com/${countrycode}/flat/64.png`;

  let img = element.parentElement.querySelector("img");
  img.src = newSrc;
};

// Populate dropdowns
for (let select of container) {
  for (let currcode in countryList) {
    let newoption = document.createElement("option");
    newoption.innerText = currcode;
    newoption.value = currcode;

    if (select.name === "from" && currcode === "USD") {
      newoption.selected = true;
    } else if (select.name === "to" && currcode === "INR") {
      newoption.selected = true;
    }

    select.append(newoption);
  }

  // Show default flag
  updateflag(select);

  // Change flag on currency change
  select.addEventListener("change", (evt) => {
    updateflag(evt.target);
  });
}

btn.addEventListener("click", async (evt) => {
  evt.preventDefault();

  let amount = document.querySelector(".amount-saction input");
  let amtval = Number(amount.value);

  if (amtval < 1 || isNaN(amtval)) {
    amtval = 1;
    amount.value = 1;
  }

  // Correct API URL
  let URL = `${BASE_URL}/${formcurr.value.toLowerCase()}.json`;

  let response = await fetch(URL);
  let data = await response.json();

  // Get exchange rate
  let rate = data[formcurr.value.toLowerCase()][tocurr.value.toLowerCase()];

  console.log("Rate:", rate);
  let finelamount= amtval*rate;

  msg.innerText=`${amtval} ${formcurr.value} = ${finelamount} ${tocurr.value}`

});
