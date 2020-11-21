const user = window.localStorage.getItem("user");

document.getElementById("publish").addEventListener("click", async function() {

	if (user === null) {
		console.log("test");
		window.location.href = "../index.html";
	}else {
		//store recipe data, TODO: image upload in NodeJS?
		const recipeTitle = document.getElementById("title").value;
		const recipeDescription = document.getElementById("description").value;
		const recipeImage = document.getElementById("image").value;

		const response = await fetch("/post/upload", {
	       method: 'POST',
	       headers: {
	         'Content-Type': 'application/json;charset=utf-8'
	       },
	       body: JSON.stringify({
			  username: user,
			  recipe_name: recipeTitle,
			  recipe_desc: recipeDescription,
			  recipe_pic: recipeImage
		  })
	     });
	     if (!response.ok) {
	       console.log(response.error);
	       return;
	  	}else {
		  alert("Successfully uploaded new recipe!");
		  //redirect to profile page
		  window.location.href = "../profile/index.html";
	  	}
	}
});
