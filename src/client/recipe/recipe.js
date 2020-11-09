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

}

window.addEventListener('load', async () => {

    const feedRes = await fetch("/recipe");
    const feedDat = await feedRes.json();
    if (!feedRes.ok) {
        console.log(feedRes.error);
        return;
    }

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