document.getElementById("publish").addEventListener("click", async function() {

	//store recipe data, TODO: image upload in NodeJS?
	const userName = "willmurphy23"; //example dummy userName
	const recipeTitle = document.getElementById("title").value;
	const recipeDescription = document.getElementById("description").value;

	const response = await fetch("http://localhost:8080/post", {
       method: 'POST',
       headers: {
         'Content-Type': 'application/json;charset=utf-8'
       },
       body: JSON.stringify({
		  user: userName,
		  title: recipeTitle,
		  desc: recipeDescription
	  })
     });
     if (!response.ok) {
       console.log(response.error);
       return;
  }else {
	  alert("Successfully uploaded new recipe!");

  }
})
