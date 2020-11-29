async function likeRecipe(id) {
     const response = await fetch("/feed/like", {
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
          alert("Successfully liked recipe.");
     }
}

async function getNewRecipe() {
     document.getElementById('recipe-cards').innerHTML = "";
     const response = await fetch("/getFeed");
     const data = await response.json();
     if (!response.ok) {
         console.log(response.error);
         return;
    }else {
         renderImages(data);
    }
}

function renderImages(data) {
     console.log(data);
     const parent = document.getElementById("recipe-cards");
 
     let card = document.createElement("div");
     card.classList.add("card", "mb-3");
 
     let img = document.createElement("img");
     img.classList.add("card-img-top");
     img.src = data[0].recipe_pic;
 
     let cardBody = document.createElement("div");
     cardBody.classList.add("card-body");
 
     let title = document.createElement("h5");
     title.classList.add("card-title");
 
     let link = document.createElement("a");
     link.classList.add("card-link");
     link.innerHTML = data[0].recipe_name;
 
     let button = document.createElement("button");
     button.classList.add("btn", "btn-outline-*", "float-right");
     button.addEventListener("click", async function() {
         await likeRecipe(data[0].recipe_id);
     });
 
     let span = document.createElement("span");
     let icon = document.createElement("i");
     icon.classList.add("far", "fa-heart", "fa-2x")
 
     let subtitle = document.createElement("h6");
     subtitle.classList.add("card-subtitle", "mb-2", "text-muted");
     subtitle.innerHTML = data[0].recipe_desc;
 
     let cardBody2 = document.createElement("div");
     cardBody2.classList.add("card-body");
 
     let userLink = document.createElement("a");
     userLink.classList.add("card-link");
     userLink.innerHTML = data[0].username;
 
     let nextButton = document.createElement("button");
     nextButton.classList.add("btn", "btn-outline-danger", "float-right");
     nextButton.innerHTML = "Next";
 
     nextButton.addEventListener("click", async function () {
         await getNewRecipe();
     });
 
     span.appendChild(icon);
     button.appendChild(span);
     title.appendChild(link);
     title.appendChild(button);
     cardBody.appendChild(title);
     cardBody.appendChild(subtitle);
     cardBody2.appendChild(userLink);
     cardBody2.appendChild(nextButton);
 
     card.appendChild(img);
     card.appendChild(cardBody);

     card.appendChild(cardBody2);
     parent.appendChild(card);
 }

window.addEventListener('load', async () => {
     const response = await fetch("/getFeed");
     const data = await response.json();
     if (!response.ok) {
         console.log(response.error);
         return;
     }else {
         renderImages(data);
     }
});