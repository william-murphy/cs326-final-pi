## **APIs**
**Login/Sign up**
 - /login/user : logs in the user
 - /signup/user : sign up the user
 
 **Feed**
 - /feed : loads recent recipes shared
 - /feed/load : load more recipes
 - /feed/save : save/like recipe for profile
 
**Recipe**
 - /recipe/search : populate page with search results
 - /recipe/load : load more results
 - /recipe/save : save recipe to profile

**People**
 - /people/search : populate page with search results
 - /people/load : load more results
 - /people/follow : follow person
 
**Create**
 - /create : creates a new recipe and adds it to *my recipes* as well as recent recipes (shared to feed)

**Profile**
 - /profile : load default data (bio, *saved recipes, my recipes*)
 - /profile/edit : update user bio
 - /profile/delete : delete a recipe from profile

## **CRUD**

 **Create**
 - Takes four inputs which creates a new user by adding corresponding row (*name, email, username, password, bio*) to *Users* table
 <img src="https://github.com/william-murphy/cs326-final-pi/blob/main/docs/milestone2-images/signupform.PNG" width="700" height="514">
 
 **Update**
 - Extracts the field to update from the database and changes it to the new value. For example: A user can edit their bio on their profile page, update will allow to find the user through their id in our database and update their bio in there.
 <img src="https://github.com/william-murphy/cs326-final-pi/blob/main/docs/milestone2-images/UpdateBio-before.png" width="700" height="514">
 <img src="https://github.com/william-murphy/cs326-final-pi/blob/main/docs/milestone2-images/UpdateBio-after.png" width="700" height="514">
