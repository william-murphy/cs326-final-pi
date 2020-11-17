async function search() {
    const recipe_name = document.getElementById("recipe").value;

    //check if recipe in database
    //if true display on webpage
    //else fail

    const feedRes = await fetch("/recipe/search");
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
    //img.src = "../images/ClassicGreenbeanCasserole.jpg";

    let overlay = document.createElement("div");
    overlay.classList.add("card-img-overlay");
    let title = document.createElement("h3");
    title.classList.add("card-title");
    title.innerHTML = data.title;
    let description = document.createElement("p");
    description.classList.add("card-text");
    description.innerHTML = data.description;

    embed.appendChild(img);
    overlay.appendChild(title);
    overlay.appendChild(description);
    card.appendChild(embed);
    card.appendChild(overlay);
    parent.appendChild(card);
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
    
    const response = await fetch("/recipe/save", {
                    method: 'POST',
                    body: JSON.stringify( { 
                        "name": name, 
                        "author": word, 
                        "likes": currScore,
                        "picture": picture
                    })
                });
                if (!response.ok) {
                    console.log(response.error);
                    return;
                }

    document.getElementById('searchRecipe').addEventListener('click', search);
})