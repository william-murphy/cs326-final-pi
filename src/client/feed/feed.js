const user = window.localStorage.getItem("user");
if (user === null) {
	window.location.href = "../index.html";
}

async function likeRecipe(id) {
     const response = await fetch("/feed/like", {
          method: 'POST',
          headers: {
               'Content-Type': 'application/json;charset=utf-8'
          },
          body: JSON.stringify({
               username: username, //still need a way to save username
               recipe_id: id
          })
     });
     if (!response.ok) {
          console.log(response.error);
          return;
     }else {
          alert("Successfully unliked recipe.");
     }
}

async function getNewRecipe() {
     const response = await fetch("/feed");
     if (!response.ok) {
         console.log(response.error);
         return;
    }else {
         data = await response.json();
         renderImages(data);
    }
}

function renderImages(data) {
     //Get parent element that holds the recipe and clear everything in it
     const parent = document.getElementsByClassName("card")[0];
     parent.innerHTML = "";

     //Fill in the parent div with the recipe data
     //recipe image
     const img = document.createElement("img").classList.add("card-img-top");
     img.alt="Current Recipe";
     //first card body
     const innerDivOne = document.createElement("div").classList.add("card-body");
     const h5 = document.createElement("h5").classList.add("card-title");
     const name = document.createTextNode(data.recipe_name);
     const likeButton = document.createElement("button").classList.add("btn", "btn-outline-*", "float-right");
     likeButton.type = "button";
     likeButton.appendChild(document.createElement("i").classList.add("far", "fa-heart", "fa-2x"));
     likeButton.addEventListener("click", async function() {
          await likeRecipe(data.recipe_id);
     });
     h5.appendChild(name);
     h5.appendChild(likeButton);
     const h6 = document.createElement("h6").classList.add("card-subtitle", "mb-2", "text-muted");
     h6.innerHTML = data.recipe_desc;
     innerDivOne.appendChild(h5);
     innerDivOne.appendChild(h6);
     //second card body
     const innerDivTwo = document.createElement("div").classList.add("card-body");
     const author = document.createTextNode(data.username);
     const nextButton = document.createElement("button").classList.add("btn", "btn-outline-danger", "float-right");
     nextButton.innerHTML = "Next";
     nextButton.addEventListener("click", async function() {
          await getNewRecipe();
     });
     innerDivTwo.append(author);
     innerDivTwo.append(nextButton);
     //append to parent
     parent.appendChild(img);
     parent.appendChild(innerDivOne);
     parent.appendChild(innerDivTwo);
}

window.addEventListener('load', async () => {

     const response = await fetch("/feed");
     if (!response.ok) {
         console.log(response.error);
         return;
    }else {
         data = await response.json();
         renderImages(data);
    }

});
