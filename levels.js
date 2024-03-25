let categories;
let currentCatId;

function populateSelect() {
    let ele = document.getElementById('categories');
    for (let i = 0; i < categories.length; i++) {
        ele.innerHTML += '<option value="' + categories[i]['id'] + '">' + categories[i]['name'] + '</option>';
    }
}

function show(id) {
    console.log (id);
    const easyButton = document.getElementById("easyButton");
    const mediumButton = document.getElementById("mediumButton");
    const hardButton = document.getElementById("hardButton");

    easyButton.href = `game.html?level=easy&categoryId=${id}`
    mediumButton.href = `game.html?level=medium&categoryId=${id}`
    hardButton.href = `game.html?level=hard&categoryId=${id}`
}

function submitName() {
  let name = document.getElementById("player-name-input").value;
  localStorage.setItem("playerName", name); 
  updateNameDisplay(name); 
  displayWelcomeMessage(name);
}

function updateNameDisplay(name) {
  let submittedNameElement = document.getElementById("submitted-name");
  submittedNameElement.textContent = "Explorer: " + name;
}

function setWelcomeMessage() {
  let playerName = localStorage.getItem("playerName");
  if (playerName) {
    let welcomeMessage = `Are you ready to explore the library, ${playerName}? Click a level to get started.`;
    document.getElementById("welcome-message").textContent = welcomeMessage;
  }
}

function displayWelcomeMessage(name) {
  let welcomeMessage = document.getElementById("welcome-message");
  welcomeMessage.innerText = `Are you ready to explore the library, ${name}? Click a level to get started.`;
  welcomeMessage.classList.add("visible");
}

async function setCategories() {
const response = await fetch ("https://opentdb.com/api_category.php")
const data =await response.json(); 
categories=data.trivia_categories;
populateSelect()
show(categories[0].id)
}

setCategories()

