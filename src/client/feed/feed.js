function renderImages(data) {
    for (let i=0; i<data.myrecipes.length; i+=3) {
        let group = document.createElement("DIV");
        group.classList.add("row");
        for (let j=0; j<3; j++) {

            let parentDiv = document.createElement("DIV").classList.add("card");
            let innerDiv = document.createElement("DIV").classList.add("card-body");

            const nameElement = document.createElement("h5");
            nameElement.innerHTML = data.myrecipes[i + j].title;

            const img = 0; //What to do here?

            const descElement = document.createElement("h6");
            descElement.innerHTML = "Recipe by " + data.myrecipes[i + j].username;

            const numLikes = document.createElement("span");
            numLikes.innerHTML = "❤️ " + data.myrecipes[i + j].likes;

            innerDiv.appendChild(nameElement);
            innerDiv.appendChild(img);
            innerDiv.appendChild(descElement);
            innerDiv.appendChild(numLikes);
            parentDiv.appendChild(innerDiv);

        }
    }
}

window.addEventListener('load', async () => {

    const feedRes = await fetch("/feed");
    const feedDat = await feedRes.json();
    if (!feedRes.ok) {
        console.log(feedRes.error);
        return;
    }

    

    // document.getElementById('button').addEventListener('click', () => {

    // });

    const response = await fetch("/feed/save", {
                    method: 'POST',
                    body: JSON.stringify( { 
                        "name": name, 
                        "word": word, 
                        "score": currScore
                    })
                });
                if (!response.ok) {
                    console.log(response.error);
                    return;
                }
});

//like button -> should each one have a unique id, wouldn't that be a hassle?
