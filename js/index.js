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

const fetchData = fetch("list.json")
  .then((response) => response.json())
  .then((jsonData) => {
    data = jsonData;
    initializeForm();
  })
  .catch((error) => console.error("Error fetching the JSON file:", error));

const populateSelect = (selectElement, options) => {
  selectElement.innerHTML = options
    .map((option) => `<option value="${option}">${option}</option>`)
    .join("");
};

const updateFlavorOptions = () => {
  const brand = brandSelect.value;
  if (data.iceCream[brand]) {
    populateSelect(flavorSelect, Object.keys(data.iceCream[brand]));
  } else {
    flavorSelect.innerHTML = "";
  }
  updateTotal();
};

const initializeForm = () => {
  populateSelect(brandSelect, Object.keys(data.iceCream));
  populateSelect(toppingSelect, Object.keys(data.topping));
  populateSelect(coneSelect, Object.keys(data.cones));
  updateFlavorOptions();
};

const updateTotal = () => {
  const brand = brandSelect.value;
  const flavor = flavorSelect.value;
  const scoops = parseInt(scoopsSelect.value);
  const topping = toppingSelect.value;
  const cone = coneSelect.value;

  const basePrice = (data.iceCream[brand] && data.iceCream[brand][flavor]) || 0;
  const toppingPrice = data.topping[topping] || 0;
  const conePrice = data.cones[cone] || 0;

  const totalPrice = basePrice * scoops + toppingPrice + conePrice;
  totalElement.textContent = totalPrice;
};

const resetForm = () => {
  brandSelect.selectedIndex = 0;
  scoopsSelect.value = 1;
  toppingSelect.selectedIndex = 0;
  coneSelect.selectedIndex = 0;
  updateFlavorOptions();
  complete.style.display = "none";
};

const showPopup = () => {
  if (totalElement.textContent !== "0") {
    complete.style.display = "flex";
  }
};
const closePopup = () => {
  if (totalElement.textContent !== "0") {
    complete.style.display = "none";
  }
};

brandSelect.addEventListener("change", updateFlavorOptions);
flavorSelect.addEventListener("change", updateTotal);
scoopsSelect.addEventListener("change", updateTotal);
toppingSelect.addEventListener("change", updateTotal);
coneSelect.addEventListener("change", updateTotal);
resetButton.addEventListener("click", resetForm);
submitButton.addEventListener("click", showPopup);
closeCompleteWindow.addEventListener("click", closePopup);
