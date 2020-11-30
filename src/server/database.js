const fs = require("fs");
const path = require("path");
const pgp = require("pg-promise");

const url = process.env.DATABASE_URL || JSON.parse(fs.readFileSync(path.resolve(__dirname, "../../secrets.json"))).DATABASE_URL;
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

//Feed 

async function getInitialFeed() {
    return await connectAndRun(db => db.any("SELECT * FROM Recipes ORDER BY RANDOM() LIMIT 1;"));
}

async function saveFromFeed(recipe_id, username) {
    return await connectAndRun(db => db.none("INSERT INTO Liked Values ($1, $2);UPDATE Recipes SET recipe_likes = recipe_likes + 1 WHERE recipe_id = $1;", [recipe_id, username]));
}

async function searchRecipes(input) {
    return await connectAndRun(db => db.any("SELECT * FROM Recipes WHERE LOWER(recipe_name) LIKE LOWER('%' || $1 || '%') OR LOWER(username) LIKE LOWER('%' || $1 || '%')", [input]));
}

async function saveRecipe(recipe_id, username) {
    return await connectAndRun(db => db.none("INSERT INTO Liked Values ($1, $2);UPDATE Recipes SET recipe_likes = recipe_likes + 1 WHERE recipe_id = $1;", [recipe_id, username]));
}

//Create

async function createRecipe(username, recipe_name, recipe_desc, recipe_pic) {
    return await connectAndRun(db => db.none("INSERT INTO Recipes (username, recipe_name, recipe_desc, recipe_likes, recipe_pic) VALUES ($1, $2, $3, $4, $5);", [username, recipe_name, recipe_desc, 0, recipe_pic]));
}

//People

async function searchPeople(input) {
    return await connectAndRun(db => db.any("SELECT * FROM Users WHERE LOWER(username) LIKE LOWER('%' || $1 || '%');", [input]));
}

//Profile

async function getProfile(username) {
    return {
         profile: await connectAndRun(db => db.one("SELECT * FROM Users WHERE username = $1;", [username])),
         recipes: await connectAndRun(db => db.any("SELECT * FROM Recipes WHERE username = $1;", [username])),
         liked: await connectAndRun(db => db.any("SELECT liked.recipe_id, recipes.username, recipe_name, recipe_desc, recipe_likes, recipe_pic FROM Liked JOIN Recipes ON Liked.recipe_id = Recipes.recipe_id WHERE Liked.username = $1;", [username]))
    };
}

async function updateProfile(username, bio) {
    return await connectAndRun(db => db.none("UPDATE Users SET bio = $1 WHERE username = $2;", [bio, username]));
}

async function updatePic(username, profile_pic) {
    return await connectAndRun(db => db.none("UPDATE Users SET profile_pic = $1 WHERE username = $2;", [profile_pic, username]));
}

async function deleteRecipe(recipe_id) {
    return await connectAndRun(db => db.none("DELETE FROM Liked WHERE recipe_id = $1;DELETE FROM Recipes WHERE recipe_id = $1;", [recipe_id]));
}

async function unlikeProfileRecipe(username, recipe_id) {
     return await connectAndRun(db => db.none("UPDATE Recipes SET recipe_likes = recipe_likes - 1 WHERE recipe_id = $2;DELETE FROM Liked WHERE username = $1 AND recipe_id = $2;", [username, recipe_id]));
}

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
    searchRecipes,
    saveRecipe,
    createRecipe,
    searchPeople,
    getProfile,
    updateProfile,
    updatePic,
    deleteRecipe,
    unlikeProfileRecipe,
    getUsername,
    getPassword,
    signup
};
