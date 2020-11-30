# **Team Name:** pi

## **Application Name:** S(pi)ghetti & Meatballs

### **Semester:** Fall 2020

**Overview:** Our project idea is to make a space for users to have their own personal recipe library. The application will allow users to create their own food recipes and look at other users' recipes as well. Users will be able to like and save food recipes from the feed to their own profile as well as search up specific recipes from the database. The data that will come with recipes include data for recipe names, ingredients, recipe image, and user likes. Users can also find other users by their username and can interact with them by viewing their profiles and liking recipes.

**Team Overview:**

-Dhruvi Chauhan, dnchauhan
-Ji Ye, jye6013
-William Murphy, william-murphy 

**User Interface:**

 - Login/Signup: When the user first goes on the website, it will take the user to the login page. Before interacting further, the user should login with their account or sign up for a new account.

<img src="https://github.com/william-murphy/cs326-final-pi/blob/main/docs/final-images/login.JPG" width="700" height="404">

<img src="https://github.com/william-murphy/cs326-final-pi/blob/main/docs/final-images/signup.JPG" width="700" height="404">

 - Feed: This page is the application's feed page where the user can see the most recent recipes shared by users. They can interact with the recipe posts by saving it to their profile.

<img src="https://github.com/william-murphy/cs326-final-pi/blob/main/docs/final-images/feed.JPG" width="700" height="621">

 - Recipes: The user can search for recipes and save it to their profile.

<img src="https://github.com/william-murphy/cs326-final-pi/blob/main/docs/final-images/recipe.JPG" width="700" height="404">

 - People: This page allows the user to find people by username.

 <img src="https://github.com/william-murphy/cs326-final-pi/blob/main/docs/final-images/people.JPG" width="700" height="404">

 - Post: This page allows the user to post a recipe of their own along with a picture. This will show up on the 'My recipe' section of user's profile.

<img src="https://github.com/william-murphy/cs326-final-pi/blob/main/docs/final-images/post.JPG" width="700" height="404">

 - Profile: This is the profile page where the user can edit their avatar as well as their bio. They can also see recipes saved from searching for recipes or liked from the feed page on the Liked Recipes tab. There is also another tab, My Recipes, where the user can see the recipes they created themselves.

<img src="https://github.com/william-murphy/cs326-final-pi/blob/main/docs/final-images/profile-my-recipes.JPG" width="700" height="404">

<img src="https://github.com/william-murphy/cs326-final-pi/blob/main/docs/final-images/profile-liked.JPG" width="700" height="404">

 - Logout: Lets the user log out from the application.

**APIs:**

Login/Sign up

 - /login/user : logs in the user
 - /signup/user : sign up the user

 Feed

 - /getFeed : loads recent recipes shared
 - /feed/like : load more recipes

Recipe

 - /recipe/search/:input : populate page with search results
 - /recipe/save : save recipe to profile

People

 - /people/search/:input : populate page with search results

Post

 - /post/upload : creates a new recipe and adds it to *my recipes* as well as recent recipes (shared to feed)

Profile

 - /getProfile : load default data (bio, *saved recipes, my recipes*)
 - /profile/edit : update user bio
 - /profile/edit-pic : update user's profile picture
 - /profile/delete : delete a recipe from profile
 - /profile/unlike : unlike a recipe from profile

 Authentication

- /login : Log into the account
- /logout : Log out of account
- /register : Signup for an account

**Database:** 

Users table
| Column       | Data Type | Description                         |
|--------------|-----------|-------------------------------------|
| username     | String    | User’s username (primary key)       |
| email        | String    | The user’s login email              |
| salt         | String    | The salt value for password   	     |
| hash         | String    | The hash value for password   	     |
| bio          | String    | The bio user has for profile  	     |
| profile_pic  | String    | The imgur link to profile pic 	     |


Recipes table
| Column       | Data Type  | Description                               |
|--------------|------------|-------------------------------------------|
| recipe_id    | integer    | The unique id of the recipe (primary key) |
| username     | integer    | The username of user (unique identifier)  |
| recipe_name  | String     | The name of the recipe                    |
| recipe_desc  | String     | The description of the recipe             |
| recipe_likes | integer    | The number of likes the recipe has        |
| recipe_pic   | String     | The link to the image of the recipe       |


Liked table
| Column       | Data Type | Description                               |
|--------------|-----------|-------------------------------------------|
| recipe_id    | integer   | The id for recipe (unique)                |
| username     | string    | The username of user (unique identifier)  |

**URL Routes/Mappings:** A final up-to-date table of all the URL routes that your application supports and a short description of what those routes are used for. You should also indicate any authentication and permissions on those routes.

**Authentication/Authorization:** A final up-to-date description of how users are authenticated and any permissions for specific users (if any) that you used in your application. You should mention how they relate to which UI views are accessible.

**Division of Labor:** 

-Milestone 1:
Dhruvi: Worked on wireframes & HTML/CSS for feed and recipe lookup pages.
Ji: Worked on wireframes & HTML/CSS for login/sign up and people pages.
Will: Worked on wireframes & HTML/CSS for profile page.

-Milestone 2:
Dhruvi: Worked on feed + recipe .js/.html files, end-point structure, the milestone2 markdown
Ji: Worked on database/index.js and login/sign up/people js files
Will: Profile page backend and added functionality, added page to upload recipes and did backend, wrote some endpoints as well as some functions for database.js, worked on milestone2 documents

-Milestone 3:
Dhruvi: created the datatables, worked on Worked on database + index.js, Milestone3.md
Ji: Worked on database/index.js, implementing login/signup to passport.js
Will: Profile and Post pages, some database functions, image uploading

**Conclusion:**

 A conclusion describing your team’s experience in working on this project. This should include what you learned through the design and implementation process, the difficulties you encountered, what your team would have liked to know before starting the project that would have helped you later, and any other technical hurdles that your team encountered.