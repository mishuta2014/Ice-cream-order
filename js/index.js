// Get elements
const brandSelect = document.getElementById("brand");
const flavorSelect = document.getElementById("flavor");
const scoopsSelect = document.getElementById("scoops");
const toppingSelect = document.getElementById("topping");
const coneSelect = document.getElementById("cone");
const totalElement = document.getElementById("total");
const resetButton = document.getElementById("zero");
const submitButton = document.querySelector(".submit");
const complete = document.querySelector(".complete");
const closeCompleteWindow = document.querySelector("#closeButn");
let data;
fetch("list.json")
  .then((response) => response.json())
  .then((jsonData) => {
    data = jsonData;
    initializeForm();
  })
  .catch((error) => console.error("Error fetching the JSON file:", error));

  const initializeForm = () => {
  updateFlavorOptions();
  initializeToppingOptions();
  initializeConeOptions();
};

const updateFlavorOptions = () => {
  const brand = brandSelect.value;
  flavorSelect.innerHTML = "";
  if (data.iceCream[brand]) {
    Object.keys(data.iceCream[brand]).forEach((flavor) => {
      const option = document.createElement("option");
      option.value = flavor;
      option.textContent = flavor;
      flavorSelect.appendChild(option);
    });
  }
  updateTotal();
};
const initializeToppingOptions = () => {
  toppingSelect.innerHTML = "";
  Object.keys(data.topping).forEach((topping) => {
    const option = document.createElement("option");
    option.value = topping;
    option.textContent = topping;
    toppingSelect.appendChild(option);
  });
};
const initializeConeOptions = () => {
  coneSelect.innerHTML = "";
  Object.keys(data.cones).forEach((cone) => {
    const option = document.createElement("option");
    option.value = cone;
    option.textContent = cone;
    coneSelect.appendChild(option);
  });
};

// Update total cost
const updateTotal = () => {
  const brand = brandSelect.value;
  const flavor = flavorSelect.value;
  const scoops = parseInt(scoopsSelect.value);
  const topping = toppingSelect.value;
  const cone = coneSelect.value;
  let basePrice = 0;
  if (data.iceCream[brand] && data.iceCream[brand][flavor]) {
    basePrice = data.iceCream[brand][flavor];
  }
  const toppingPrice = data.topping[topping] || 0;
  const conePrice = data.cones[cone] || 0;
  const totalPrice = basePrice * scoops + toppingPrice + conePrice;
  totalElement.textContent = totalPrice;
};

// Reset the form
const resetForm = () => {
  brandSelect.selectedIndex = 0;
  updateFlavorOptions();
  scoopsSelect.value = 1;
  toppingSelect.selectedIndex = 0;
  coneSelect.selectedIndex = 0;
  updateTotal();
  complete.style.display = "none";
};

// Event listeners
brandSelect.addEventListener("change", updateFlavorOptions);
flavorSelect.addEventListener("change", updateTotal);
scoopsSelect.addEventListener("change", updateTotal);
toppingSelect.addEventListener("change", updateTotal);
coneSelect.addEventListener("change", updateTotal);
resetButton.addEventListener("click", resetForm);
submitButton.addEventListener("click", () => {
  if (totalElement.textContent === "0") {
    return;
  } else {
    complete.style.display = "flex";
  }
});
closeCompleteWindow.addEventListener("click", () => {
  complete.style.display = "none";
});
