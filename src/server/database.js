const pgp = require("pg-promise")({
    connect(client) {
        console.log('Connected to database:', client.connectionParameters.database);
    },

    disconnect(client) {
        console.log('Disconnected from database:', client.connectionParameters.database);
    }
});

const username = "postgres";
const password = "admin";

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

//three tables: Users [name, email, username, password, bio], Recipes [username, recipeName], Saved [username, recipeName]


//Feed

export async function getInitialFeed() {
    return await connectAndRun(db => db.any("SELECT * FROM Recipes;"));
}
/*
async function loadFeed() {

}
*/
export async function saveFromFeed(username, recipeName) {
    return await connectAndRun(db => db.none("INSERT INTO Saved Values ($1, $2);", [username, recipeName]));
}

//Recipe

export async function getSampleRecipes() {
    return await connectAndRun(db => db.any("SELECT * FROM Recipes ORDER BY RANDOM() LIMIT 2;"));
}

export async function getInitialRecipes(input) {
    return await connectAndRun(db => db.any("SELECT * FROM Recipes WHERE recipeName = $1;", [input]));
}

//People

export async function getInitialPeople(input) {
    return await connectAndRun(db => db.any("SELECT * FROM Users WHERE username = $1;", [input]));
}
/*
async function loadPeople() {

}
*/

//Create

export async function saveRecipe(username, recipeName) {
    return await connectAndRun(db => db.none("INSERT INTO Saved Values ($1, $2);", [username, recipeName]));
}

export async function createRecipe(username, recipeName, recipeDescription) {
    return await connectAndRun(db => db.none("INSERT INTO Recipes VALUES ($1, $2, $3);", [username, recipeName, recipeDescription]));
}

//Profile

export async function getProfile(username) {
    return await connectAndRun(db => db.one("SELECT * FROM Users WHERE username = $1;", [username]));
}

export async function updateProfile(username, bio) {
    return await connectAndRun(db => db.none("UPDATE Users SET bio = $1 WHERE username = $2;", [bio, username]));
}

export async function deleteProfileRecipe(username, recipeName) {
    return await connectAndRun(db => db.none("DELETE FROM Saved WHERE username = $1 AND recipeName = $2;", [username, recipeName]));
}

//Login/Sign up

export async function login(username, password) {
    return await connectAndRun(db => db.one("SELECT * FROM Users WHERE username = $1 AND password = $2;", [username, password]));
}

export async function signup(name, email, username, password, bio) { //bio empty when sign up
    return await connectAndRun(db => db.none("INSERT INTO Users VALUES ($1, $2, $3, $4, $5);", [name, email, username, password, bio]));
}
