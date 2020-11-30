async function search() {
    const recipe_name = document.getElementById("recipe").value;

    //check if recipe in database
    //if true display on webpage
    //else fail

    const feedRes = await fetch("/recipe/search/" + recipe_name);
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
    const card = document.createElement("div");
    card.classList.add("card", "bg-dark", "text-black", "grid-item");

    const embed = document.createElement("div");
    embed.classList.add("embed-responsive", "embed-responsive-16by9");
    const img = document.createElement("img");
    img.classList.add("card-img-top", "embed-responsive-item");
    img.alt = "Card image cap";
    img.src = data.recipe_pic;

    const overlay = document.createElement("div");
    overlay.classList.add("card-img-overlay");
    const title = document.createElement("h3");
    title.classList.add("card-title", "text-highlight");
    title.innerHTML = data.recipe_name;

    const description = document.createElement("p");
    description.classList.add("card-text", "text-highlight");
    description.innerHTML = data.recipe_desc;

    const button = document.createElement("button");
    button.classList.add("btn", "btn-danger", "w-25", "d-block", "mx-auto");
    button.innerHTML = 	 "Like" + '&#128155;';
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

document.getElementById('searchRecipe').addEventListener('click', search);
