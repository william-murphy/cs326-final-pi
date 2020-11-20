**DATATABLES**

CREATE TABLE USERS(
 username VARCHAR ( 50 ) PRIMARY KEY,
 email VARCHAR ( 255 ) UNIQUE NOT NULL,
 salt VARCHAR (255) NOT NULL,
 password VARCHAR (255) NOT NULL,
 bio VARCHAR (400), 
 profile_pic TEXT
);

Users table
| Column       | Data Type | Description                         |
|--------------|-----------|-------------------------------------|
| username     | String    | User’s username (primary key)       |
| email        | String    | The user’s login email              |
| salt         | String    | The salt value for password   	   |
| hash         | String    | The hash value for password   	   |
| bio          | String    | The bio user has for profile  	   |
| profile_pic  | String    | The imgur link to profile pic 	   |


CREATE TABLE RECIPES (
	recipe_id serial PRIMARY KEY,
	username VARCHAR ( 50 ) NOT NULL,
	recipe_name VARCHAR (50) NOT NULL,
	recipe_desc Text,
	recipe_likes INT NOT NULL,
 recipe_pic TEXT
);

Recipes table
| Column       | Data Type  | Description                               |
|--------------|------------|-------------------------------------------|
| recipe_id    | integer    | The unique id of the recipe (primary key) |                     
| username     | integer    | The username of user (unique identifier)  |
| recipe_name  | String     | The name of the recipe                    |
| recipe_desc  | String     | The description of the recipe             |
| recipe_likes | integer    | The number of likes the recipe has        |
| recipe_pic   | String     | The link to the image of the recipe       |


CREATE TABLE LIKED (
	recipe_id INT,
	username VARCHAR ( 50 ),
);

Liked table
| Column       | Data Type | Description                               |
|--------------|-----------|-------------------------------------------|
| recipe_id    | integer   | The id for recipe (unique)                |
| username     | string    | The username of user (unique identifier)  |  
 
 ## **Breakdown**
- Ji: Worked on database/index.js and login/sign up/people js files
- Dhruvi: created the required tables in our postgreSQL database on heroku app, worked on Worked on database + index.js, Milestone3.md, other little things in collaboration during group meetings.
- Will: Profile page backend and added functionality, added page to upload recipes and did backend, wrote some endpoints as well as some functions for database.js, worked on milestone2 documents
