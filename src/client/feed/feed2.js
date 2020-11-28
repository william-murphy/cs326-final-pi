

//testing
const data = { 1:{recipe_id:"1", username:"testing1", recipe_desc:"spaghetti1", recipe_name:"spaghetti1", recipe_pic:"https://www.cscassets.com/recipes/wide_cknew/wide_25335.jpg"},
2:{recipe_id:"2", username:"testing2", recipe_desc:"spaghetti2", recipe_name:"spaghetti2", recipe_pic:"https://www.cscassets.com/recipes/wide_cknew/wide_25335.jpg"}};
let loadedFeed = false;

function renderImages(data) {
    const parent = document.getElementById("recipe-cards");

    let card = document.createElement("div");
    card.classList.add("card", "mb-3");

    let img = document.createElement("img");
    img.classList.add("card-img-top");
    img.src = data.recipe_pic;

    let cardBody = document.createElement("div");
    cardBody.classList.add("card-body");

    let title = document.createElement("h5");
    title.classList.add("card-title");

    let link = document.createElement("a");
    link.classList.add("card-link");
    link.innerHTML = data.recipe_name;

    let button = document.createElement("button");
    button.classList.add("btn", "btn-outline-*", "float-right");

    let span = document.createElement("span");
    let icon = document.createElement("i");
    icon.classList.add("far", "fa-heart", "fa-2x")

    let subtitle = document.createElement("h6");
    subtitle.classList.add("card-subtitle", "mb-2", "text-muted");
    subtitle.innerHTML = data.recipe_desc;

    let cardBody2 = document.createElement("div");
    cardBody2.classList.add("card-body");

    let userLink = document.createElement("a");
    userLink.classList.add("card-link");
    userLink.innerHTML = data.username;

    let nextButton = document.createElement("button");
    nextButton.classList.add("btn", "btn-outline-danger", "float-right");
    nextButton.innerHTML = "Next";

    nextButton.addEventListener("click", async function () {
        await getNewRecipe();
    });

    span.appendChild(icon);
    button.appendChild(span);
    title.appendChild(link);
    title.appendChild(button);
    cardBody.appendChild(title);

    cardBody2.appendChild(userLink);
    cardBody2.appendChild(nextButton);

    card.appendChild(img);
    card.appendChild(cardBody);
    card.appendChild(cardBody2);

    parent.appendChild(card);
}

async function getNewRecipe() {
    
    if (!loadedFeed) {
        document.getElementById('load-feed').remove();
        loadedFeed = true;
    }
    
    //testing
    /*
    let key = Object.keys(data)[Math.floor(Math.random()*Object.keys(data).length)];
    renderImages(data[key]);
    */
    

    
    const feedRes = await fetch("/feed");
    const feedDat = await feedRes.json();
    if (!feedRes.ok) {
       console.log(feedRes.error);
       return;
    }
    

    for (const item of feedDat) {
        renderRecipes(item);
    }
    
    

}

document.getElementById("load-feed").addEventListener("click", getNewRecipe);

/*
window.addEventListener('load', async () => {
   getNewRecipe();
});
*/
