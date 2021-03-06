document.getElementById("publish").addEventListener("click", async function() {

	//store recipe data
	const recipeTitle = document.getElementById("title").value;
	const recipeDescription = document.getElementById("description").value;
	const recipeImage = document.getElementById("image").value;

	const response = await fetch("/post/upload", {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json;charset=utf-8'
		},
		body: JSON.stringify({
			recipe_name: recipeTitle,
			recipe_desc: recipeDescription,
			recipe_pic: recipeImage
		})
	});

	if (!response.ok) {
		console.log(response.error);
		return;
	} else {
		alert("Successfully uploaded new recipe!");
	}
});
