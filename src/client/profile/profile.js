async function unlikeRecipe(id) {
	const response = await fetch("/profile/unlike", {
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
		const k = data.recipes.length<3 ? data.recipes.length : 3;
		for (let i=0; i<data.recipes.length; i+=3) {
			const group = document.createElement("DIV");
			group.classList.add("row");
			for (let j=0; j<k; j++) {

				if (data.recipes[i + j] === undefined) {
					break;
				}

				const parentDiv = document.createElement("DIV");
				parentDiv.classList.add("m-4", "card");
				const innerDiv = document.createElement("DIV");
				innerDiv.classList.add("card-body");

				const nameElement = document.createElement("h5");
				nameElement.innerHTML = data.recipes[i + j].recipe_name;

				const img = document.createElement("img"); //placeholder image
				img.src = data.recipes[i + j].recipe_pic;
				img.alt = "Food";
				img.width = "250";
				img.height = "250";

				const author = document.createElement("h6");
				author.innerHTML = "Recipe by " + data.recipes[i + j].username;

				const desc = document.createElement("div");
				desc.classList.add("scroll");
				const descText = document.createTextNode(data.recipes[i + j].recipe_desc);
				desc.appendChild(descText);

				const numLikes = document.createElement("span");
				numLikes.classList.add("m-2");
				numLikes.innerHTML = "❤️ " + data.recipes[i + j].recipe_likes;

				const remove = document.createElement("button");
				remove.classList.add("btn", "btn-outline-danger", "float-right", "m-2");
				remove.innerHTML = "Delete";
				remove.addEventListener("click", async function() {
					await removeRecipe(data.recipes[i + j].recipe_id);
				});

				innerDiv.appendChild(nameElement);
				innerDiv.appendChild(img);
				innerDiv.appendChild(author);
				innerDiv.appendChild(desc);
				innerDiv.appendChild(numLikes);
				innerDiv.appendChild(remove);
				parentDiv.appendChild(innerDiv);

				group.appendChild(parentDiv);
			}
			document.getElementById('content').appendChild(group);
		}
	}else { //render liked recipes
		const k = data.liked.length<3 ? data.liked.length : 3;
		for (let i=0; i<data.liked.length; i+=3) {
			const group = document.createElement("DIV");
			group.classList.add("row");
			for (let j=0; j<k; j++) {

				if (data.liked[i + j] === undefined) {
					break;
				}

				const parentDiv = document.createElement("DIV");
				parentDiv.classList.add("m-4", "card");
				const innerDiv = document.createElement("DIV");
				innerDiv.classList.add("card-body");

				const nameElement = document.createElement("h5");
				nameElement.innerHTML = data.liked[i + j].recipe_name;

				const img = document.createElement("img"); //placeholder image
				img.src = data.liked[i + j].recipe_pic;
				img.alt = "Food";
				img.width = "250";
				img.height = "250";

				const author = document.createElement("h6");
				author.innerHTML = "Recipe by " + data.liked[i + j].username;

				const desc = document.createElement("div");
				desc.classList.add("scroll");
				const descText = document.createTextNode(data.liked[i + j].recipe_desc);
				desc.appendChild(descText);

				const numLikes = document.createElement("span");
				numLikes.classList.add("m-2");
				numLikes.innerHTML = "❤️ " + data.liked[i + j].recipe_likes;

				const unlike = document.createElement("button");
				unlike.classList.add("btn", "btn-outline-danger", "float-right", "m-2");
				unlike.innerHTML = "Unlike";
				unlike.addEventListener("click", async function() {
					await unlikeRecipe(data.liked[i + j].recipe_id);
				});

				innerDiv.appendChild(nameElement);
				innerDiv.appendChild(img);
				innerDiv.appendChild(author);
				innerDiv.appendChild(desc);
				innerDiv.appendChild(numLikes);
				innerDiv.appendChild(unlike);
				parentDiv.appendChild(innerDiv);

				group.appendChild(parentDiv);
			}
			document.getElementById('content').appendChild(group);
		}
	}
}

//load my-recipes on page load
window.addEventListener("load", async function() {
	const response = await fetch("/getProfile");
	if (!response.ok) {
		console.log(response.error);
		return;
	}else {
		const data = await response.json();
		renderImages(data, true);
		populateProfile(data);
	}
});

//load my-recipes when button is clicked
document.getElementById("my").addEventListener("click", async function() {
	document.getElementById("my").innerHTML = "<b>My Recipes</b>";
	document.getElementById("liked").innerHTML = "Liked Recipes";
	document.getElementById("content").innerHTML = "";

	const response = await fetch("/getProfile");
		if (!response.ok) {
		console.log(response.error);
		return;
	}else {
		const data = await response.json();
		renderImages(data, true);
	}
});

//load saved recipes when button is clicked
document.getElementById("liked").addEventListener("click", async function() {
	document.getElementById("my").innerHTML = "My Recipes";
	document.getElementById("liked").innerHTML = "<b>Liked Recipes</b>";
	document.getElementById("content").innerHTML = "";
	const url = "/getProfile";
	const response = await fetch(url);
    if (!response.ok) {
		console.log(response.error);
		return;
    }else {
		const data = await response.json();
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
