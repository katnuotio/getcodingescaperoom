let categories;
let currentCatId;

function populateSelect() {
    var ele = document.getElementById('categories');
    for (var i = 0; i < categories.length; i++) {
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

function updateButtons () {
    console.log ("updatebutton")
    
}

async function setCategories() {
const response = await fetch ("https://opentdb.com/api_category.php")
const data =await response.json(); 
categories=data.trivia_categories;
console.log("categories")
populateSelect()
show(categories[0].id)
}

setCategories()

