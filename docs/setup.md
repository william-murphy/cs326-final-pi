## **Creating Tables (PostgreSQL)**
CREATE TABLE USERS(
<br />&nbsp;&nbsp;&nbsp;username VARCHAR ( 50 ) PRIMARY KEY,
<br />&nbsp;&nbsp;&nbsp;email VARCHAR ( 255 ) UNIQUE NOT NULL,
<br />&nbsp;&nbsp;&nbsp;salt VARCHAR (255) NOT NULL,
<br />&nbsp;&nbsp;&nbsp;password VARCHAR (255) NOT NULL,
<br />&nbsp;&nbsp;&nbsp;bio VARCHAR (400),
<br />&nbsp;&nbsp;&nbsp;profile_pic TEXT
<br />);

CREATE TABLE RECIPES (
<br />&nbsp;&nbsp;&nbsp;recipe_id serial PRIMARY KEY,
<br />&nbsp;&nbsp;&nbsp;username VARCHAR ( 50 ) NOT NULL,
<br />&nbsp;&nbsp;&nbsp;recipe_name VARCHAR (50) NOT NULL,
<br />&nbsp;&nbsp;&nbsp;recipe_desc Text,
<br />&nbsp;&nbsp;&nbsp;recipe_likes INT NOT NULL,
<br />&nbsp;&nbsp;&nbsp;recipe_pic TEXT
<br />);

CREATE TABLE LIKED (
<br />&nbsp;&nbsp;&nbsp;recipe_id INT,
<br />&nbsp;&nbsp;&nbsp;username VARCHAR ( 50 )
<br />);

## **Setup**
- git clone https://github.com/william-murphy/cs326-final-pi.git
- npm install

## **Running Application**
- npm run start
