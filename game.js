const playerName = localStorage.getItem("username") || "Joueur";
document.getElementById("player-name").innerText = playerName;

let score = parseInt(localStorage.getItem("score")) || 0;
let farms = parseInt(localStorage.getItem("farms")) || 0;
let factories = parseInt(localStorage.getItem("factories")) || 0;
let city = parseInt(localStorage.getItem("city")) || 0;
let boostMultiplier = parseInt(localStorage.getItem("boostMultiplier")) || 0;
let clickMultiplier = parseInt(localStorage.getItem("clickMultiplier")) || 1;

let initFarmPrice = 100
let initFactoryPrice = 1000
let initCityPrice = 5000
let initMultiplierPrice = 75
let initAutoClickerPrice = 5
let initBoostPrice = 100

let farmPrice = parseInt(localStorage.getItem("farmPrice")) || initFarmPrice;
let factoryPrice = parseInt(localStorage.getItem("factoryPrice")) || initFactoryPrice;
let cityPrice = parseInt(localStorage.getItem("cityPrice")) || initCityPrice;
let multiplierPrice = parseInt(localStorage.getItem("multiplierPrice")) || initMultiplierPrice;
let autoClickerPrice = parseInt(localStorage.getItem("autoClickerPrice")) || initAutoClickerPrice;
let boostPrice = parseInt(localStorage.getItem("boostPrice")) || initBoostPrice;

document.getElementById("score").innerText = score;
document.getElementById("farm-count").innerText = farms;
document.getElementById("factory-count").innerText = factories;
document.getElementById("city-count").innerText = city;
document.getElementById("boost-multiplier").innerText = boostMultiplier;

document.getElementById("farm-price").innerText = farmPrice;
document.getElementById("factory-price").innerText = factoryPrice;
document.getElementById("city-price").innerText = cityPrice;
document.getElementById("multiplier-price").innerText = multiplierPrice;
document.getElementById("auto-clicker-price").innerText = autoClickerPrice;
document.getElementById("boost-price").innerText = boostPrice;

function updateLocalStorage() {
  localStorage.setItem("score", score);
  localStorage.setItem("farms", farms);
  localStorage.setItem("factories", factories);
  localStorage.setItem("city", city);
  localStorage.setItem("boostMultiplier", boostMultiplier);
  localStorage.setItem("clickMultiplier", clickMultiplier);

  localStorage.setItem("farmPrice", farmPrice);
  localStorage.setItem("factoryPrice", factoryPrice);
  localStorage.setItem("cityPrice", cityPrice);
  localStorage.setItem("multiplierPrice", multiplierPrice);
  localStorage.setItem("autoClickerPrice", autoClickerPrice);
  localStorage.setItem("boostPrice", boostPrice);
}

function spawnDot() {
    const dot = document.createElement("div");
    const size = Math.random() * 20 + 10; // Taille entre 10px et 30px
    dot.className = "dot";
    dot.style.width = `${size}px`;
    dot.style.height = `${size}px`;
    dot.style.left = `${Math.random() * 90}%`;
    dot.style.top = `${Math.random() * 90}%`;

    dot.onclick = function () {
        // Calcul des points (inversé par rapport à la taille)
        let pointsGagnes = Math.round(6 - (size / 6)); // 5 pour les petits, 1 pour les grands
        pointsGagnes *= clickMultiplier * (1 + boostMultiplier / 100); // Appliquer les boosts
        
        score += pointsGagnes;
        score = Math.floor(score);  // Assurez-vous que le score reste un entier
        document.getElementById("score").innerText = score;
        updateLocalStorage();
        dot.remove();
    };

    document.getElementById("game-window").appendChild(dot);
    setTimeout(() => dot.remove(), 2000);
}

setInterval(spawnDot, 1000);
setInterval(() => {
  score += farms * 2 + factories * 10 + city * 25;
  score = Math.floor(score);  // Assurez-vous que le score reste un entier
  document.getElementById("score").innerText = score;
  updateLocalStorage();
}, 1000);

function buyFarm() {
  if (score >= farmPrice) {
    score -= farmPrice;
    score = Math.floor(score); // Assurez-vous que le score reste un entier
    farms++;
    farmPrice = Math.ceil(farmPrice * 1.1);
    updateUI();
    updateLocalStorage();
  }
}

function buyFactory() {
  if (score >= factoryPrice) {
    score -= factoryPrice;
    score = Math.floor(score); // Assurez-vous que le score reste un entier
    factories++;
    factoryPrice = Math.ceil(factoryPrice * 1.3);
    updateUI();
    updateLocalStorage();
  }
}

function buyCity() {
  if (score >= cityPrice) {
    score -= cityPrice;
    score = Math.floor(score); // Assurez-vous que le score reste un entier
    city++;
    cityPrice = Math.ceil(cityPrice * 1.3);
    updateUI();
    updateLocalStorage();
  }
}

function buyMultiplier() {
  if (score >= multiplierPrice) {
    score -= multiplierPrice;
    score = Math.floor(score); // Assurez-vous que le score reste un entier
    clickMultiplier *= 2;
    multiplierPrice = Math.ceil(multiplierPrice * 3.4);
    updateUI();
    updateLocalStorage();
  }
}

function buyAutoClicker() {
  if (score >= autoClickerPrice) {
    score -= autoClickerPrice;
    score = Math.floor(score); // Assurez-vous que le score reste un entier
    setInterval(() => spawnDot(), 1000);
    autoClickerPrice = Math.ceil(autoClickerPrice * 1.15);
    updateUI();
    updateLocalStorage();
  }
}

function buyPermanentBoost() {
  if (score >= boostPrice) {
    score -= boostPrice;
    score = Math.floor(score); // Assurez-vous que le score reste un entier
    boostMultiplier += 3;
    boostPrice = Math.ceil(boostPrice * 2.98);
    updateUI();
    updateLocalStorage();
  }
}

function updateUI() {
  document.getElementById("score").innerText = Math.floor(score);  // Assurez-vous que le score est un entier
  document.getElementById("farm-count").innerText = farms;
  document.getElementById("factory-count").innerText = factories;
  document.getElementById("city-count").innerText = city;
  document.getElementById("boost-multiplier").innerText = boostMultiplier;

  document.getElementById("farm-price").innerText = farmPrice;
  document.getElementById("factory-price").innerText = factoryPrice;
  document.getElementById("city-price").innerText = cityPrice;
  document.getElementById("multiplier-price").innerText = multiplierPrice;
  document.getElementById("auto-clicker-price").innerText = autoClickerPrice;
  document.getElementById("boost-price").innerText = boostPrice;
}

document.getElementById("reset-button").addEventListener("click", () => {
  localStorage.setItem("score", "0");
  localStorage.setItem("farms", "0");
  localStorage.setItem("factories", "0");
  localStorage.setItem("city", "0");
  localStorage.setItem("boostMultiplier", "0");
  localStorage.setItem("clickMultiplier", "1");

  localStorage.setItem("farmPrice", initFarmPrice);
  localStorage.setItem("factoryPrice", initFactoryPrice);
  localStorage.setItem("cityPrice", initCityPrice);
  localStorage.setItem("multiplierPrice", initMultiplierPrice);
  localStorage.setItem("autoClickerPrice", initAutoClickerPrice);
  localStorage.setItem("boostPrice", initBoostPrice);

  location.reload(); // Recharge la page pour appliquer les changements
});

document.getElementById("give-button").addEventListener("click", () => {
  localStorage.setItem("score", 10000000 + score);
  location.reload();
});
