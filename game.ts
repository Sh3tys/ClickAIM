const playerName: string = localStorage.getItem("username") || "Joueur";
document.getElementById("player-name")!.innerText = playerName;

let score: number = parseInt(localStorage.getItem("score") || "0");
let farms: number = parseInt(localStorage.getItem("farms") || "0");
let factories: number = parseInt(localStorage.getItem("factories") || "0");
let city: number = parseInt(localStorage.getItem("city") || "0");
let boostMultiplier: number = parseInt(localStorage.getItem("boostMultiplier") || "0");
let clickMultiplier: number = parseInt(localStorage.getItem("clickMultiplier") || "1");

const initFarmPrice = 100;
const initFactoryPrice = 1000;
const initCityPrice = 5000;
const initMultiplierPrice = 75;
const initAutoClickerPrice = 5;
const initBoostPrice = 100;

let farmPrice: number = parseInt(localStorage.getItem("farmPrice") || initFarmPrice.toString());
let factoryPrice: number = parseInt(localStorage.getItem("factoryPrice") || initFactoryPrice.toString());
let cityPrice: number = parseInt(localStorage.getItem("cityPrice") || initCityPrice.toString());
let multiplierPrice: number = parseInt(localStorage.getItem("multiplierPrice") || initMultiplierPrice.toString());
let autoClickerPrice: number = parseInt(localStorage.getItem("autoClickerPrice") || initAutoClickerPrice.toString());
let boostPrice: number = parseInt(localStorage.getItem("boostPrice") || initBoostPrice.toString());

document.getElementById("score")!.innerText = score.toString();
document.getElementById("farm-count")!.innerText = farms.toString();
document.getElementById("factory-count")!.innerText = factories.toString();
document.getElementById("city-count")!.innerText = city.toString();
document.getElementById("boost-multiplier")!.innerText = boostMultiplier.toString();

document.getElementById("farm-price")!.innerText = farmPrice.toString();
document.getElementById("factory-price")!.innerText = factoryPrice.toString();
document.getElementById("city-price")!.innerText = cityPrice.toString();
document.getElementById("multiplier-price")!.innerText = multiplierPrice.toString();
document.getElementById("auto-clicker-price")!.innerText = autoClickerPrice.toString();
document.getElementById("boost-price")!.innerText = boostPrice.toString();

function updateLocalStorage(): void {
  localStorage.setItem("score", score.toString());
  localStorage.setItem("farms", farms.toString());
  localStorage.setItem("factories", factories.toString());
  localStorage.setItem("city", city.toString());
  localStorage.setItem("boostMultiplier", boostMultiplier.toString());
  localStorage.setItem("clickMultiplier", clickMultiplier.toString());
  localStorage.setItem("farmPrice", farmPrice.toString());
  localStorage.setItem("factoryPrice", factoryPrice.toString());
  localStorage.setItem("cityPrice", cityPrice.toString());
  localStorage.setItem("multiplierPrice", multiplierPrice.toString());
  localStorage.setItem("autoClickerPrice", autoClickerPrice.toString());
  localStorage.setItem("boostPrice", boostPrice.toString());
}

function spawnDot(): void {
    const dot = document.createElement("div");
    const size = Math.random() * 20 + 10;
    dot.className = "dot";
    dot.style.width = `${size}px`;
    dot.style.height = `${size}px`;
    dot.style.left = `${Math.random() * 90}%`;
    dot.style.top = `${Math.random() * 90}%`;

    dot.onclick = function () {
        let pointsGagnes = Math.round(6 - (size / 6)) * clickMultiplier * (1 + boostMultiplier / 100);
        score += Math.floor(pointsGagnes);
        document.getElementById("score")!.innerText = score.toString();
        updateLocalStorage();
        dot.remove();
    };

    document.getElementById("game-window")!.appendChild(dot);
    setTimeout(() => dot.remove(), 2000);
}

setInterval(spawnDot, 1000);
setInterval(() => {
  score += farms * 2 + factories * 10 + city * 25;
  document.getElementById("score")!.innerText = score.toString();
  updateLocalStorage();
}, 1000);

function buyItem(price: number, increment: () => void, updatePrice: () => void): void {
  if (score >= price) {
    score -= price;
    increment();
    updatePrice();
    updateUI();
    updateLocalStorage();
  }
}

function buyFarm() { buyItem(farmPrice, () => farms++, () => farmPrice = Math.ceil(farmPrice * 1.1)); }
function buyFactory() { buyItem(factoryPrice, () => factories++, () => factoryPrice = Math.ceil(factoryPrice * 1.3)); }
function buyCity() { buyItem(cityPrice, () => city++, () => cityPrice = Math.ceil(cityPrice * 1.3)); }
function buyMultiplier() { buyItem(multiplierPrice, () => clickMultiplier *= 2, () => multiplierPrice = Math.ceil(multiplierPrice * 3.4)); }
function buyAutoClicker() { buyItem(autoClickerPrice, () => setInterval(spawnDot, 1000), () => autoClickerPrice = Math.ceil(autoClickerPrice * 1.15)); }
function buyPermanentBoost() { buyItem(boostPrice, () => boostMultiplier += 3, () => boostPrice = Math.ceil(boostPrice * 2.98)); }

function updateUI(): void {
  document.getElementById("score")!.innerText = score.toString();
  document.getElementById("farm-count")!.innerText = farms.toString();
  document.getElementById("factory-count")!.innerText = factories.toString();
  document.getElementById("city-count")!.innerText = city.toString();
  document.getElementById("boost-multiplier")!.innerText = boostMultiplier.toString();
}

document.getElementById("reset-button")!.addEventListener("click", () => {
  localStorage.clear();
  location.reload();
});

document.getElementById("give-button")!.addEventListener("click", () => {
  score += 10000000;
  updateLocalStorage();
  location.reload();
});