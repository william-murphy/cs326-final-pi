async function unlikeRecipe(id) {
	const response = await fetch("/profile/unlike", {
       method: 'POST',
       headers: {
         'Content-Type': 'application/json;charset=utf-8'
       },
       body: JSON.stringify({
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
	  alert("Successfully deleted recipe.");
	  //Refresh page
	  window.location.reload();
  	}
}

function populateProfile(data) {
	//Get data from data
	const username = data.profile.username;
	const bio = data.profile.bio;
	const image = data.profile.profile_pic;

	//Populate profile with data
	document.getElementById("avatar").src = image;
	document.getElementById("name").innerHTML = username;
	document.getElementById("bio").innerHTML = bio;
}

function renderImages(data, mode) {
	if (mode) { //render my recipes
		for (let i=0; i<data.recipes.length; i+=3) {
			let group = document.createElement("DIV");
			group.classList.add("row");
			for (let j=0; j<3; j++) {

				let parentDiv = document.createElement("DIV").classList.add("m-4", "card");
				let innerDiv = document.createElement("DIV").classList.add("card-body");

				const nameElement = document.createElement("h5");
				nameElement.innerHTML = data.recipes[i + j].recipe_name;

				const img = createElement("img").classList.add("img-fluid"); //placeholder image
				img.src = data.recipes[i + j].recipe_pic;
				img.alt = "Food";
				img.width = "250";
				img.height = "250";

				const descElement = document.createElement("h6");
				descElement.innerHTML = "Recipe by " + data.recipes[i + j].username;

				const numLikes = document.createElement("span");
				numLikes.innerHTML = "❤️ " + data.recipes[i + j].recipe_likes;

				const remove = document.createElement("button").classList.add("btn", "btn-outline-danger");
				remove.innerHTML = "Delete";
				remove.addEventListener("click", async function() {
					await deleteRecipe(data.recipes[i + j].recipe_id);
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
		for (let i=0; i<data.liked.length; i+=3) {
			let group = document.createElement("DIV");
			group.classList.add("row");
			for (let j=0; j<3; j++) {

				let parentDiv = document.createElement("DIV").classList.add("m-4", "card");
				let innerDiv = document.createElement("DIV").classList.add("card-body");

				const nameElement = document.createElement("h5");
				nameElement.innerHTML = data.liked[i + j].recipe_name;

				const img = createElement("img").classList.add("img-fluid"); //placeholder image
				img.src = data.liked[i + j].recipe_pic;
				img.alt = "Food";
				img.width = "250";
				img.height = "250";

				const descElement = document.createElement("h6");
				descElement.innerHTML = "Recipe by " + data.liked[i + j].username;

				const numLikes = document.createElement("span");
				numLikes.innerHTML = "❤️ " + data.liked[i + j].recipe_likes;

				const unlike = document.createElement("button").classList.add("btn", "btn-outline-danger");
				unlike.innerHTML = "Unlike";
				unlike.addEventListener("click", async function() {
					await unlikeRecipe(data.liked[i + j].recipe_id);
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
	const response = await fetch("/profile");
	console.log(response);
     if (!response.ok) {
         console.log(response.error);
         return;
    }else {
	    data = await response.json();
	    renderImages(data, true);
	    populateProfile(data);
    }

});

//load my-recipes when button is clicked
document.getElementById("my").addEventListener("click", async function() {
	document.getElementById("my").innerHTML = "<b>My Recipes</b>";
	document.getElementById("liked").innerHTML = "Liked Recipes";
	document.getElementById("content").innerHTML = "";

	const response = await fetch("/profile");
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
       body: JSON.stringify({
		  bio: newBio
	  })
     });
     if (!response.ok) {
       console.log(response.error);
       return;
  	}else {
	  alert("Profile updated successfully");
	  window.location.reload(true);
  	}
});

//edit profile
document.getElementById("edit-pic").addEventListener("click", async function() {
	const newPic = document.getElementById("pic-link").value;
	const response = await fetch("/profile/edit-pic", {
       method: 'POST',
       headers: {
         'Content-Type': 'application/json;charset=utf-8'
       },
       body: JSON.stringify({
		  profile_pic: newPic
	  })
     });
     if (!response.ok) {
       console.log(response.error);
       return;
  	}else {
	  alert("Profile updated successfully");
	  window.location.reload(true);
  	}
});
