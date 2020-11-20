const user = window.localStorage.getItem("user");

async function unlikeRecipe(id) {
	const response = await fetch("/profile/unlike", {
       method: 'POST',
       headers: {
         'Content-Type': 'application/json;charset=utf-8'
       },
       body: JSON.stringify({
		  username: user,
		  recipeId: id
	  })
     });
     if (!response.ok) {
       console.log(response.error);
       return;
  	}else {
	  alert("Successfully unliked recipe.");
	  //Refresh page
	  window.location.reload();
  	}
}

async function removeRecipe(id) {
	const response = await fetch("/profile/delete", {
       method: 'DELETE',
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
	  alert("Successfully deleted recipe.");
	  //Refresh page
	  window.location.reload();
  	}
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
				nameElement.innerHTML = data.myrecipes[i + j].recipe_name;

				const img = createElement("img").classList.add("img-fluid"); //placeholder image
				img.src = "../images/food.jpeg";
				img.alt = "Food";
				img.width = "250";
				img.height = "250";

				const descElement = document.createElement("h6");
				descElement.innerHTML = "Recipe by " + data.myrecipes[i + j].username;

				const numLikes = document.createElement("span");
				numLikes.innerHTML = "❤️ " + data.myrecipes[i + j].recipe_likes;

				const remove = document.createElement("button").classList.add("btn", "btn-outline-danger");
				remove.innerHTML = "Delete";
				remove.addEventListener("click", async function() {
					await deleteRecipe(data.myrecipes[i + j].recipe_id);
				});

				innerDiv.appendChild(nameElement);
				innerDiv.appendChild(img);
				innerDiv.appendChild(descElement);
				innerDiv.appendChild(numLikes);
				innerDiv.appendChild(remove);
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
				nameElement.innerHTML = data.likedrecipes[i + j].recipe_name;

				const img = createElement("img").classList.add("img-fluid"); //placeholder image
				img.src = "../images/food.jpeg";
				img.alt = "Food";
				img.width = "250";
				img.height = "250";

				const descElement = document.createElement("h6");
				descElement.innerHTML = "Recipe by " + data.likedrecipes[i + j].username;

				const numLikes = document.createElement("span");
				numLikes.innerHTML = "❤️ " + data.likedrecipes[i + j].recipeLikes;

				const unlike = document.createElement("button").classList.add("btn", "btn-outline-danger");
				unlike.innerHTML = "Unlike";
				unlike.addEventListener("click", async function() {
					await unlikeRecipe(data.likedrecipes[i + j].recipeId);
				});

				innerDiv.appendChild(nameElement);
				innerDiv.appendChild(img);
				innerDiv.appendChild(descElement);
				innerDiv.appendChild(numLikes);
				innerDiv.appendChild(unlike);
				parentDiv.appendChild(innerDiv);

			}
		}
	}
}

//load my-recipes on page load
window.addEventListener("load", async function() {

	//Retrieve user info from database
	

	const url = "/profile?username=" + user;
	const response = await fetch(url);
     if (!response.ok) {
         console.log(response.error);
         return;
    }else {
	    data = await response.json();
	    renderImages(data, true);
    }
});

//load my-recipes when button is clicked
document.getElementById("my").addEventListener("click", async function() {
	document.getElementById("my").innerHTML = "<b>My Recipes</b>";
	document.getElementById("liked").innerHTML = "Liked Recipes";
	document.getElementById("content").innerHTML = "";
	const url = "/profile?username=" + user;
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
	const url = "/profile?username=" + user;
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
	const response = await fetch("/profile/edit", {
       method: 'POST',
       headers: {
         'Content-Type': 'application/json;charset=utf-8'
       },
       body: JSON.stringify({username: user, bio: newBio})
     });
     if (!response.ok) {
       console.log(response.error);
       return;
  	}else {
	  alert("Profile updated successfully");
  	}
});
