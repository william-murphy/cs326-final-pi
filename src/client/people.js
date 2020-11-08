document.getElementById('search').addEventListener('click', search);

async function search() {
    const searchInput = document.getElementById('search-input').value;

    //alert("searching");

    //find people by username
    let url = "https://localhost:8080/people/search/" + searchInput;
    //const searchRequest = await fetch('./people/search');
    const searchRequest = await fetch(url);
    const searchData = searchRequest.ok? await searchRequest.json() : [];

    const searchResults = document.getElementById('search-results');


    while (searchResults.firstChild) {
        searchResults.removeChild(searchResults.firstChild);
    }

    for(const item of searchData) {
        addPerson(searchResults, item.username);
    }

    /*
    for(let i = 0; i < searchData; i++) {
        addPerson(searchResults, "testing");
    }
    */
    
}

function addPerson(results, username) {
    let card = document.createElement("div");
    card.classList.add("card", "w-50", "text-center", "mx-auto", "mt-5");

    let cardHeader = document.createElement("h5");
    cardHeader.classList.add("card-header");
    cardHeader.innerHTML = username;

    let cardBody = document.createElement("div");
    cardBody.classList.add("card-body");

    let cardTitle = document.createElement("h5");
    cardTitle.innerHTML = "Bio";

    let cardText = document.createElement("p");
    cardText.classList.add("card-text");
    cardText.innerHTML = "Bio Placeholder";

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
