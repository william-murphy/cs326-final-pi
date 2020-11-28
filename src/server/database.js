//import * as _pgp from "pg-promise";
//const pgp = require("pg-promise");
//import * as secrets from "../../secrets.json";
//const secrets = "secrets.json";
//import * as fs from "fs";
const fs = require("fs");
//import path from 'path';
const path = require("path");
//const __dirname = path.resolve();
/*
const pgp = require("pg-promise")({
    connect(client) {
        console.log('Connected to database:', client.connectionParameters.database);
    },

    disconnect(client) {
        console.log('Disconnected from database:', client.connectionParameters.database);
    }
});*/
const pgp = require("pg-promise");

let username;
let password;

if(!process.env.USERNAME) {
    //const secrets = "../../secrets.json";
    username = JSON.parse(fs.readFileSync(path.resolve(__dirname, "../../secrets.json"))).username;
} else {
    username = process.env.USERNAME;
}

if (!process.env.PASSWORD) {
    //const secrets = import('../../secrets.json');
    //const secrets = "../../secrets.json";
    password = JSON.parse(fs.readFileSync(path.resolve(__dirname, "../../secrets.json"))).password;
} else {
    password = process.env.PASSWORD;
}

const url = process.env.DATABASE_URL || `postgres://${username}:${password}@localhost/`;
const db = pgp()(url);

async function connectAndRun(task) {
    let connection = null;

    try {
        connection = await db.connect();
        return await task(connection);
    } catch (e) {
        throw e;
    } finally {
        try {
            connection.done();
        } catch(ignored) {

        }
    }
}

//Users [username, email, salt, password, bio, profile_pic],
//Recipes [recipe_id, username, recipe_name, recipe_desc, recipe_likes, recipe_pic],    //remove likes -> count in SQL table likes
//Liked [recipe_id, username]

//Feed


async function getInitialFeed() {
    return await connectAndRun(db => db.any("SELECT * FROM Recipes ORDER BY RANDOM() LIMIT 1;"));
}

async function saveFromFeed(recipe_id, username) {
    return await connectAndRun(db => db.none("INSERT INTO Liked Values ($1, $2);UPDATE Recipes SET recipe_likes = recipe_likes + 1 WHERE recipe_id = $1;", [recipe_id, username]));
}
//Recipe

/*async function getSampleRecipes() {
    return await connectAndRun(db => db.any("SELECT * FROM Recipes ORDER BY RANDOM() LIMIT 3;"));
}*/

async function searchRecipes(input) {
    return await connectAndRun(db => db.any("SELECT * FROM Recipes WHERE recipe_name = $1;", [input]));
}

async function saveRecipe(recipe_id, username) {
    return await connectAndRun(db => db.none("INSERT INTO Liked Values ($1, $2);", [recipe_id, username]));
}

//Create

async function createRecipe(username, recipe_name, recipe_desc, recipe_pic) {
    return await connectAndRun(db => db.none("INSERT INTO Recipes (username, recipe_name, recipe_desc, recipe_likes, recipe_pic) VALUES ($1, $2, $3, $4, $5);", [username, recipe_name, recipe_desc, 0, recipe_pic]));
}

//People

async function searchPeople(input) {
    return await connectAndRun(db => db.any("SELECT * FROM Users WHERE username = $1;", [input]));
}

//Profile

async function getProfile(username) {
    return {
         profile: await connectAndRun(db => db.one("SELECT * FROM Users WHERE username = $1;", [username])),
         recipes: await connectAndRun(db => db.any("SELECT * FROM Recipes WHERE username = $1;", [username])),
         liked: await connectAndRun(db => db.any("SELECT liked.recipe_id, recipes.username, recipe_name, recipe_desc, recipe_likes, recipe_pic FROM Liked JOIN Recipes ON Liked.recipe_id = Recipes.recipe_id WHERE Liked.username = $1;", [username]))
    };
}

// export async function getProfile(username) {
//     return await connectAndRun(db => db.one("SELECT * FROM Users WHERE username = $1;", [username]));
// }

async function updateProfile(username, bio) {
    return await connectAndRun(db => db.none("UPDATE Users SET bio = $1 WHERE username = $2;", [bio, username]));
}

async function updatePic(username, profile_pic) {
    return await connectAndRun(db => db.none("UPDATE Users SET profile_pic = $1 WHERE username = $2;", [profile_pic, username]));
}

async function deleteProfileRecipe(recipe_id) {
    return await connectAndRun(db => db.none("DELETE FROM Liked WHERE recipe_id = $1;", [recipe_id]));
}

async function unlikeProfileRecipe1(recipe_id) {
     return await connectAndRun(db => db.none("UPDATE Recipes SET recipe_likes = recipe_likes - 1 WHERE recipe_id = $1;", [recipe_id]));
}

async function unlikeProfileRecipe2(username, recipe_id) {
     return await connectAndRun(db => db.none("DELETE FROM Liked WHERE username = $1 AND recipe_id = $2;", [username, recipe_id]));
}

/*async function getLikes(recipe_id) {
    return await connectAndRun(db => db.any("SELECT COUNT($1) AS likes FROM Recipes;", [recipe_id]));
}*/

// export async function getRecipeData_fromLiked(username) {
//     return await connectAndRun(db => db.any("SELECT liked.recipe_id, recipes.username, recipe_name, recipe_desc, recipe_likes, recipe_pic FROM Liked JOIN Recipes ON Liked.recipe_id = Recipes.recipe_id WHERE Liked.username = $1;", [username]));
// }

//Login/Sign up

async function getUsername(username) {
    return await connectAndRun(db => db.any("SELECT username FROM Users WHERE username = $1;", [username]));
}

async function getPassword(username) {
    return await connectAndRun(db => db.one("SELECT salt, password FROM Users WHERE username = $1;", [username]));
}

async function signup(username, email, salt, hash, bio, profile_pic) { //bio empty when sign up
    return await connectAndRun(db => db.none("INSERT INTO Users VALUES ($1, $2, $3, $4, $5, $6);", [username, email, salt, hash, bio, profile_pic]));
}

module.exports = {
    getInitialFeed,
    saveFromFeed,
    /*getSampleRecipes,*/
    searchRecipes,
    saveRecipe,
    createRecipe,
    searchPeople,
    getProfile,
    updateProfile,
    updatePic,
    deleteProfileRecipe,
    unlikeProfileRecipe1,
    unlikeProfileRecipe2,
    getUsername,
    getPassword,
    signup
};

// signup("dnc", "dhruvi@email.com", "d437328q", "yu3ug237t2HHVA3", "Hi i am cool", "yo.goodwill.com").then(val=> console.log(val));
//searchRecipes("will").then(val=> console.log(val));
//getInitialFeed().then(val => console.log(val));
