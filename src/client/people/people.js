async function search() {
    const input = document.getElementById('search-input').value;

    const feedRes = await fetch("/people/search/" + input);
    const feedDat = await feedRes.json();
    if (!feedRes.ok) {
        console.log(feedRes.error);
        return;
    }

    const searchResults = document.getElementById('search-results');

    while (searchResults.firstChild) {
        searchResults.removeChild(searchResults.firstChild);
    }



    for(const item of feedDat) {
        addPerson(searchResults, item.username, item.bio);
    }

    /*
    for(let i = 0; i < 3; i++) {
        addPerson(searchResults, "testing");
    }
    */

}

function addPerson(results, username, bio) {
    const card = document.createElement("div");
    card.classList.add("card", "w-50", "text-center", "mx-auto", "mt-5");

    const cardHeader = document.createElement("h5");
    cardHeader.classList.add("card-header");
    cardHeader.innerHTML = username;

    const cardBody = document.createElement("div");
    cardBody.classList.add("card-body");

    const cardTitle = document.createElement("h5");
    cardTitle.innerHTML = "Bio";

    const cardText = document.createElement("p");
    cardText.classList.add("card-text");
    cardText.innerHTML = bio;

    /*
    let link = document.createElement("a");
    link.classList.add("btn", "btn-primary", "text-white");
    link.innerHTML = "Follow";
    */

    cardBody.appendChild(cardTitle);
    cardBody.appendChild(cardText);
    //cardBody.appendChild(link);
    card.appendChild(cardHeader);
    card.appendChild(cardBody);
    results.appendChild(card);
}

document.getElementById('search').addEventListener('click', search);

/*
document.getElementById('compatibility').addEventListener('click', searchByCompatibility);

function searchByCompatibility() {
    alert("searching by compatibility");

    //find similar food tastes as user
    //highest % with food recipe titles
}
*/

//NOTE: div for holding search results
//document.getElementById('search-results')
