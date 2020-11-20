import * as _pgp from "pg-promise";
//import * as secrets from "../../secrets.json";
const secrets = "secrets.json";
import * as fs from "fs";

const pgp = _pgp["default"]({
    connect(client) {
        console.log('Connected to database:', client.connectionParameters.database);
    },

    disconnect(client) {
        console.log('Disconnected from database:', client.connectionParameters.database);
    }
});

const username = "postgres";
let password = "admin";
if (!process.env.PASSWORD) {
    password = JSON.parse(fs.readFileSync(secrets)).password;
} else {
    password = process.env.PASSWORD;
}    

const url = process.env.DATABASE_URL || `postgres://${username}:${password}@localhost/`;
const db = pgp(url);

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

export async function getInitialFeed() {
    return await connectAndRun(db => db.one("SELECT * FROM Recipes ORDER BY RANDOM() LIMIT 1"));
}

export async function saveFromFeed(recipe_id, username) {
    return await connectAndRun(db => db.none("INSERT INTO Liked Values ($1, $2);", [recipe_id, username]));
}

//Recipe

export async function getSampleRecipes() {
    return await connectAndRun(db => db.any("SELECT * FROM Recipes ORDER BY RANDOM() LIMIT 3;"));
}

export async function searchRecipes(input) {
    return await connectAndRun(db => db.any("SELECT * FROM Recipes WHERE recipe_name LIKE ''%' + $1 + '%'';", [input]));
}

export async function saveRecipe(recipe_id, username) {
    return await connectAndRun(db => db.none("INSERT INTO Liked Values ($1, $2);", [recipe_id, username]));
}

//Create 

export async function createRecipe(username, recipe_name, recipe_desc, recipe_pic) {
    return await connectAndRun(db => db.none("INSERT INTO Recipes VALUES ($1, $2, $3, $4, $5, $6);", [DEFAULT, username, recipe_name, recipe_desc, 0, recipe_pic]));
}

//People

export async function searchPeople(input) {
    return await connectAndRun(db => db.any("SELECT * FROM Users WHERE username LIKE ''%' + $1 + '%'' ;", [input])); 
}

//Profile

export async function getProfile(username) {
    return {
         profile: await connectAndRun(db => db.one("SELECT * FROM Users WHERE username = $1;", [username])),
         recipes: await connectAndRun(db => db.one("SELECT * FROM Recipes WHERE username = $1;", [username])),
         liked: await connectAndRun(db => db.one("SELECT * FROM Liked WHERE username = $1;", [username]))
    };
}

// export async function getProfile(username) {
//     return await connectAndRun(db => db.one("SELECT * FROM Users WHERE username = $1;", [username]));
// }

export async function updateProfile(username, bio) {
    return await connectAndRun(db => db.none("UPDATE Users SET bio = $1 WHERE username = $2;", [bio, username]));
}

export async function deleteProfileRecipe(recipe_id) {
    return await connectAndRun(db => db.none("DELETE FROM Liked WHERE recipe_id = $1;", [recipe_id]));
}

export async function unlikeProfileRecipe1(recipe_id) {
     return await connectAndRun(db => db.none("UPDATE Recipes SET recipe_likes = recipe_likes - 1 WHERE recipe_id = $1;", [recipe_id]));
}

export async function unlikeProfileRecipe2(username, recipe_id) {
     return await connectAndRun(db => db.none("DELETE FROM Liked WHERE username = $1 AND recipe_id = $2", [username, recipe_id]));
}

export async function getLikes(recipe_id) {
    return await connectAndRun(db => db.any("SELECT COUNT($1) AS likes FROM Recipes;", [recipe_id]));
}

export async function getRecipeData_fromLiked(username) {
    return await connectAndRun(db => db.any("SELECT recipe_id, recipe_name FROM Liked JOIN Recipes ON Liked.recipe_id = Recipes.recipe_id WHERE Liked.username = $1;", [username]));
}

//Login/Sign up

export async function login(username, password) {
    return await connectAndRun(db => db.any("SELECT * FROM Users WHERE username = $1 AND password = $2;", [username, password]));
}

export async function signup(username, email, salt, password, bio, profile_pic) { //bio empty when sign up
    return await connectAndRun(db => db.none("INSERT INTO Users VALUES ($1, $2, $3, $4, $5, $6);", [username, email, salt, password, bio, profile_pic]));
}
