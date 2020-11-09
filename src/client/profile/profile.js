function deleteRecipe() {
	
}

function renderImages(data, mode) {
	if (mode) { //render my recipes
		for (let i=0; i<data.myrecipes.length; i+=3) {
			let group = document.createElement("DIV");
			group.classList.add("row");
			for (let j=0; j<3; j++) {

				let parentDiv = document.createElement("DIV").classList.add("m-4", "card");
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
	}else { //render liked recipes
		for (let i=0; i<data.likedrecipes.length; i+=3) {
			let group = document.createElement("DIV");
			group.classList.add("row");
			for (let j=0; j<3; j++) {

				let parentDiv = document.createElement("DIV").classList.add("m-4", "card");
				let innerDiv = document.createElement("DIV").classList.add("card-body");

				const nameElement = document.createElement("h5");
				nameElement.innerHTML = data.likedrecipes[i + j].title;

				const img = 0; //What to do here?

				const descElement = document.createElement("h6");
				descElement.innerHTML = "Recipe by " + data.likedrecipes[i + j].username;

				const numLikes = document.createElement("span");
				numLikes.innerHTML = "❤️ " + data.likedrecipes[i + j].likes;

				innerDiv.appendChild(nameElement);
				innerDiv.appendChild(img);
				innerDiv.appendChild(descElement);
				innerDiv.appendChild(numLikes);
				parentDiv.appendChild(innerDiv);

			}
		}
	}
}

//load my-recipes on page load
window.addEventListener("load", async function() {
	//const username = how do we get username?!?!
	const url = "http://localhost:8080/profile?username=" + username;
	const response = await fetch(url);
     if (!response.ok) {
         console.log(response.error);
         return;
    }else {
	    data = await response.json();
	    /*
	    document.getElementById("name").value = profileData.name;
	    //document.getElementById("avatar")
	    document.getElementById("bio").value = profileData.bio;
	    */

	    //populate pictures (assuming liked receipes and my recipes are each
         //stored as an array of objects)
	    renderImages(data, true);
    }
});

//load my-recipes when button is clicked
document.getElementById("my").addEventListener("click", async function() {
	document.getElementById("my").innerHTML = "<b>My Recipes</b>";
	document.getElementById("liked").innerHTML = "Liked Recipes";
	document.getElementById("content").innerHTML = "";
	const url = "http://localhost:8080/profile?username=" + username;
	const response = await fetch(url);
     if (!response.ok) {
         console.log(response.error);
         return;
    }else {
	    data = await response.json();
	    renderImages(data, true);
    }
});

//load saved recipes when button is clicked
document.getElementById("liked").addEventListener("click", async function() {
	document.getElementById("my").innerHTML = "My Recipes";
	document.getElementById("liked").innerHTML = "<b>Liked Recipes</b>";
	document.getElementById("content").innerHTML = "";
	const url = "http://localhost:8080/profile?username=" + username;
	const response = await fetch(url);
     if (!response.ok) {
         console.log(response.error);
         return;
    }else {
	    data = await response.json();
	    renderImages(data, false);
    }
});

//edit profile
document.getElementById("edit").addEventListener("click", async function() {
	const newBio = document.getElementById("bio").value;
	const response = await fetch("http://localhost:8080/profile/edit", {
       method: 'POST',
       headers: {
         'Content-Type': 'application/json;charset=utf-8'
       },
       body: JSON.stringify({username: username, bio: newBio})
     });
     if (!response.ok) {
       console.log(response.error);
       return;
  	}else {
	  alert("Profile updated successfully");
  	}
});
