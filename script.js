const containerTwo = document.querySelectorAll(".plan label");
const button = document.querySelector(".button");
const input = document.querySelector(".forCheck input");
const One = document.querySelector(".container-one");
const Two = document.querySelector(".container-two");
const Three = document.querySelector(".container-three");
const Four = document.querySelector(".container-four");
const Five = document.querySelector(".container-five");
const next = document.querySelector(".One");
const nextTwo = document.querySelector(".Two");
const nextThree = document.querySelector(".Three");
const nextFour = document.querySelector(".Four");
const back = document.querySelector(".back");
const More = document.querySelector(".more");
const oneMore = document.querySelector(".oneMore");

button.addEventListener("click", () => {
  containerTwo.forEach((label) => {
    const span = label.querySelector("span.free-month");
    const priceSpan = label.querySelector("span.monthly");

    if (!input.checked) {
      if (!span) {
        const newSpan = document.createElement("span");
        newSpan.innerText = "2 months free";
        newSpan.className = "free-month";
        newSpan.style.color = "hsl(243, 100%, 62%)";
        label.appendChild(newSpan);
      }
      if (label.classList.contains("planOne")) {
        priceSpan.innerText = "$90/yr";
      } else if (label.classList.contains("planTwo")) {
        priceSpan.innerText = "$120/yr";
      } else if (label.classList.contains("planThree")) {
        priceSpan.innerText = "$150/yr";
      }
    } else {
      if (span) {
        label.removeChild(span);
      }
      if (label.classList.contains("planOne")) {
        priceSpan.innerText = "$9/mo";
      } else if (label.classList.contains("planTwo")) {
        priceSpan.innerText = "$12/mo";
      } else if (label.classList.contains("planThree")) {
        priceSpan.innerText = "$15/mo";
      }
    }
  });
});

next.addEventListener("click", () => {
  let name = document.getElementById("name");
  let email = document.getElementById("email");
  let number = document.getElementById("number");

  document.querySelectorAll(".error").forEach((error) => error.remove());

  if (name.value === "") {
    let nameError = document.createElement("p");
    nameError.innerText = "This field is required";
    nameError.className = "error";
    name.parentNode.appendChild(nameError);

    setTimeout(() => nameError.remove(), 2000);
  } else if (name.value.length <= 2) {
    let nameError = document.createElement("p");
    nameError.innerText = "Enter a valid name (more than 2 characters)";
    nameError.className = "error";
    name.parentNode.appendChild(nameError);
    setTimeout(() => nameError.remove(), 2000);
  }

  if (email.value === "") {
    let emailError = document.createElement("p");
    emailError.innerText = "This field is required";
    emailError.className = "error";
    email.parentNode.appendChild(emailError);
    setTimeout(() => emailError.remove(), 2000);
  }

  if (number.value === "") {
    let numberError = document.createElement("p");
    numberError.innerText = "This field is required";
    numberError.className = "error";
    number.parentNode.appendChild(numberError);
    setTimeout(() => numberError.remove(), 2000);
  }
  if (name.value.length > 2 && email.value !== "" && number.value !== "") {
    One.style.display = "none";
    Two.style.display = "flex";
  }
});

back.addEventListener("click", () => {
  One.style.display = "flex";
  Two.style.display = "none";
});

More.addEventListener("click", () => {
  Two.style.display = "flex";
  Three.style.display = "none";
});

oneMore.addEventListener("click", () => {
  Three.style.display = "flex";
  Four.style.display = "none";
});

nextTwo.addEventListener("click", () => {
  One.style.display = "none";
  Two.style.display = "none";
  Three.style.display = "flex";
});

nextThree.addEventListener("click", () => {
  One.style.display = "none";
  Two.style.display = "none";
  Three.style.display = "none";
  Four.style.display = "flex";
});

nextFour.addEventListener("click", () => {
  One.style.display = "none";
  Two.style.display = "none";
  Three.style.display = "none";
  Four.style.display = "none";
  Five.style.display = "flex";
});

document.querySelector(".refresh").addEventListener("click", function () {
  window.location.reload();
});

function enableSingleSelection() {
  const checkboxes = document.querySelectorAll('#plans input[type="checkbox"]');

  checkboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", function () {
      if (this.checked) {
        checkboxes.forEach((otherCheckbox) => {
          if (otherCheckbox !== this) {
            otherCheckbox.checked = false;
          }
        });
      }
    });
  });
}
enableSingleSelection();

let selectedPlanName = "";
let selectedMonthlyPrice = "";
function getInputValue() {
  const arcadeCheckbox = document.getElementById("arcade-plan");
  const advancedCheckbox = document.getElementById("advanced-plan");
  const proCheckbox = document.getElementById("pro-plan");

  function getPlanDetails(checkboxId) {
    const label = document.querySelector(`label[for="${checkboxId}"]`);
    const planName = label.querySelector("h3").textContent;
    const monthlyPrice = label.querySelector(".monthly").textContent;
    return [planName, monthlyPrice];
  }

  if (arcadeCheckbox.checked) {
    const arcadeDetails = getPlanDetails("arcade-plan");
    selectedPlanName = arcadeDetails[0];
    selectedMonthlyPrice = arcadeDetails[1];
  }

  if (advancedCheckbox.checked) {
    const advancedDetails = getPlanDetails("advanced-plan");
    selectedPlanName = advancedDetails[0];
    selectedMonthlyPrice = advancedDetails[1];
  }

  if (proCheckbox.checked) {
    const proDetails = getPlanDetails("pro-plan");
    selectedPlanName = proDetails[0];
    selectedMonthlyPrice = proDetails[1];
  }
  return [selectedPlanName, selectedMonthlyPrice];
}

const result = document.querySelector(".result");
const price = document.querySelector(".price");
const total = document.querySelector(".total");

let selectedAddOns = [];
function getSelectedAddOns() {
  const addons = document.querySelectorAll('.add-ons input[type="checkbox"]');
  addons.forEach((addon) => {
    if (addon.checked) {
      const label = document.querySelector(`label[for="${addon.id}"]`);
      const addonName = label.querySelector("h3").textContent;
      const price = label.parentElement.nextElementSibling.textContent;

      selectedAddOns.push({
        addonName: addonName,
        price: price,
      });
    }
  });
  return selectedAddOns;
}

nextThree.addEventListener("click", () => {
  selectedAddOns = getSelectedAddOns();
  result.innerHTML = "";
  price.innerHTML = "";
  let div = document.createElement("div");
  let h3 = document.createElement("h3");
  let button = document.createElement("button");
  let span = document.createElement("span");
  button.innerText = "Change";
  h3.innerText = selectedPlanName;
  span.innerText = selectedMonthlyPrice;
  div.appendChild(h3);
  div.appendChild(button);
  result.appendChild(div);
  result.appendChild(span);
  let totalPrice = parseFloat(selectedMonthlyPrice.replace(/[^0-9.-]+/g, ""));
  selectedAddOns.forEach((addon) => {
    if (addon.addonName && addon.price) {
      let planDiv = document.createElement("div");
      let planNameDiv = document.createElement("p");
      let planPriceDiv = document.createElement("span");
      planNameDiv.innerText = addon.addonName;
      input.checked
        ? (planPriceDiv.innerText = `$${addon.price.replace(
            /[^0-9.-]+/g,
            ""
          )}/yr`)
        : (planPriceDiv.innerText = `$${addon.price.replace(
            /[^0-9.-]+/g,
            ""
          )}/mo`);
      planDiv.appendChild(planNameDiv);
      planDiv.appendChild(planPriceDiv);
      price.appendChild(planDiv);
      let addonPrice = parseFloat(addon.price.replace(/[^0-9.-]+/g, ""));
      totalPrice += addonPrice;
    }
  });
  const totalElement = document.querySelector(".total h3");
  const total = document.querySelector(".total p");
  if (input.checked) {
    total.innerText = "Total (per year)";
    totalElement.innerText = `$${totalPrice}/yr`;
  } else {
    totalElement.innerText = `$${totalPrice}/mo`;
    total.innerText = "Total (per month)";
  }
});
