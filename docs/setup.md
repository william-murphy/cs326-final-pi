## **Creating Tables (PostgreSQL)**
CREATE TABLE USERS(
&nbsp;&nbsp;&nbsp;username VARCHAR ( 50 ) PRIMARY KEY,
&nbsp;&nbsp;&nbsp;email VARCHAR ( 255 ) UNIQUE NOT NULL,
&nbsp;&nbsp;&nbsp;salt VARCHAR (255) NOT NULL,
&nbsp;&nbsp;&nbsp;password VARCHAR (255) NOT NULL,
&nbsp;&nbsp;&nbsp;bio VARCHAR (400),
&nbsp;&nbsp;&nbsp;profile_pic TEXT
);

CREATE TABLE RECIPES (
&nbsp;&nbsp;&nbsp;recipe_id serial PRIMARY KEY,
&nbsp;&nbsp;&nbsp;username VARCHAR ( 50 ) NOT NULL,
&nbsp;&nbsp;&nbsp;recipe_name VARCHAR (50) NOT NULL,
&nbsp;&nbsp;&nbsp;recipe_desc Text,
&nbsp;&nbsp;&nbsp;recipe_likes INT NOT NULL,
&nbsp;&nbsp;&nbsp;recipe_pic TEXT
);

CREATE TABLE LIKED (
&nbsp;&nbsp;&nbsp;recipe_id INT,
&nbsp;&nbsp;&nbsp;username VARCHAR ( 50 )
);

## **Setup**
- git clone https://github.com/william-murphy/cs326-final-pi.git
- npm install

## **Running Application**
- npm run start
