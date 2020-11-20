async function search() {
    const recipe_name = document.getElementById("recipe").value;

    //check if recipe in database
    //if true display on webpage
    //else fail

    const feedRes = await fetch("/recipe/search?input=" + recipe_name);
    const feedDat = await feedRes.json();
    if (!feedRes.ok) {
        console.log(feedRes.error);
        return;
    }

    const parent = document.getElementById("recipe-cards");
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }

    for (const item of feedDat) {
        renderRecipes(item);
    }
}

function renderRecipes(data) {
    const parent = document.getElementById("recipe-cards");
    let card = document.createElement("div");
    card.classList.add("card", "bg-dark", "text-black", "grid-item");

    let embed = document.createElement("div");
    embed.classList.add("embed-responsive", "embed-responsive-16by9");
    let img = document.createElement("img");
    img.classList.add("card-img-top", "embed-responsive-item");
    img.alt = "Card image cap";
    //img src?  
    img.src = data.recipe_pic;

    let overlay = document.createElement("div");
    overlay.classList.add("card-img-overlay");
    let title = document.createElement("h3");
    title.classList.add("card-title");
    title.innerHTML = data.title;
    let description = document.createElement("p");
    description.classList.add("card-text");
    description.innerHTML = data.description;

    let button = document.createElement("button");
    button.classList.add("btn", "btn-danger", "w-25", "d-block", "mx-auto");
    button.innerHTML = "Save";
    button.addEventListener("click", async function() {
        await saveRecipe(data.recipe_id);
    });

    embed.appendChild(img);
    overlay.appendChild(title);
    overlay.appendChild(description);
    card.appendChild(embed);
    card.appendChild(overlay);
    parent.appendChild(card);
    parent.appendChild(button);
}


async function saveRecipe(id) {
    const response = await fetch("/recipe/save", {
        method: 'POST',
        headers: {
             'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({
             username: username,
             recipe_id: id
        })
   });
   if (!response.ok) {
        console.log(response.error);
        return;
   }else {
        alert("Successfully saved recipe.");
   }
}

window.addEventListener('load', async () => {
    const feedRes = await fetch("/recipe");
    const feedDat = await feedRes.json();
    if (!feedRes.ok) {
        console.log(feedRes.error);
        return;
    }

    for (const item of feedDat) {
        renderRecipes(item);
    }

    //EXAMPLE
    /*
    let recipes = { 1:{title:"testing", description:"description"}};

    for (let key of Object.keys(recipes)) {
        renderRecipes(recipes[key]);
    }
    */

    document.getElementById('searchRecipe').addEventListener('click', search);
})