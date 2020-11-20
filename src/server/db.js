import pgPromise from 'pg-promise';
const pgp = pgPromise({});

import * as _express from "express"
const express = _express["default"];

// Local PostgreSQL credentials
const username = "postgres";
const password = "dhruvinc";

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
//Recipes [recipe_id, username, recipe_name, recipe_desc, recipe_pic],    //remove likes -> count in SQL table likes
//Liked [recipe_id, username] 

//Use join

//Feed

export async function getInitialFeed() {
    return await connectAndRun(db => db.any("SELECT * FROM Recipes ORDER BY RANDOM() LIMIT 1"));
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

//Create -> 

export async function createRecipe(username, recipe_name, recipe_desc) {
    return await connectAndRun(db => db.none("INSERT INTO Recipes VALUES ($1, $2, $3, $4, $5);", [DEFAULT, username, recipe_name, recipe_desc, 0]));
}

//People

export async function searchPeople(input) {
    return await connectAndRun(db => db.any("SELECT * FROM Users WHERE username LIKE ''%' + $1 + '%'' ;", [input])); 
}

//Profile

export async function getProfile(username) {
    return await connectAndRun(db => db.one("SELECT * FROM Users WHERE username = $1;", [username]));
}

export async function updateProfile(username, bio) {
    return await connectAndRun(db => db.none("UPDATE Users SET bio = $1 WHERE username = $2;", [bio, username]));
}

export async function deleteProfileRecipe(recipe_id) {
    return await connectAndRun(db => db.none("DELETE FROM Liked WHERE recipeId = $1;", [recipe_id]));
}

// export async function unlikeProfileRecipe1(recipe_id) {
//      return await connectAndRun(db => db.none("UPDATE Recipes SET recipe_likes = recipe_likes - 1 WHERE recipe_id = $1;", [recipe_id]));
// }

export async function unlikeProfileRecipe(username, recipe_id) {
     return await connectAndRun(db => db.none("DELETE FROM Liked WHERE username = $1 AND recipe_id = $2", [username, recipe_id]));
}

export async function getLikes(recipe_id) {
    return await connectAndRun(db => db.any("SELECT COUNT($1) AS recipe_likes FROM Recipes;", [recipe_id]));
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

// // EXPRESS SETUP
// const app = express();

// app.use('/', express.static('./client'));

// app.post("/login/user", async (req, res) => {
//     let body='';
//     req.on('data',data=>body+=data);
//     req.on('end',()=>{
//         const post_data = JSON.parse(body);
//         login(post_data.username, post_data.password);
//     });
//     res.send("OK");
// });

// app.post("/signup/user", async (req, res) => {
//     let body='';
//     req.on('data',data=>body+=data);
//     req.on('end',()=>{
//         const post_data = JSON.parse(body);
//         signup(post_data.username, post_data.name, post_data.email, post_data.password, post_data.bio);
//     });
//     res.send("OK");
// });

// app.get("/feed", async (req, res) => { 
//     const getFeed = await getInitialFeed();
//     res.send(JSON.stringify(getFeed));
// });

// app.post("/feed/save", async (req, res) => {
//     let body='';
//     req.on('data',data=>body+=data);
//     req.on('end',()=>{
//         const post_data = JSON.parse(body);
//         saveFromFeed(post_data.recipe_id, post_data.username);
//     });
//     res.send("OK");
// });


// app.get("/recipe/search", async (req, res) => { //how to include input in function call?
//     const recipe_search = await searchRecipes();
//     res.send(JSON.stringify(recipe_search));
// });

// app.post("/recipe/save", async (req, res) => {
//     let body='';
//     req.on('data',data=>body+=data);
//     req.on('end',()=>{
//         const post_data = JSON.parse(body);
//         saveRecipe(post_data.recipe_id, post_data.username);
//     });
//     res.send("OK");
// });

// app.post("/post/upload", async (req, res) => {
//     let body='';
//     req.on('data',data=>body+=data);
//     req.on('end',()=>{
//         const post_data = JSON.parse(body);
//         createRecipe(post_data.username, post_data.recipe_name, post_data.recipe_desc);
//     });
//     res.send("OK");
// });

// app.get("/people/search", async (req, res) => { //how to include input in function call?
//     const user_search = await searchPeople(??);
//     res.send(JSON.stringify(user_search));
// });

// app.get("/profile", async (req, res) => { //how to include input in function call?
//     const getUserProfile = await getProfile(??);
//     res.send(JSON.stringify(getUserProfile));
// });

// app.put("/profile/edit", async (req, res) => {  //how to do put requests in express
//     let body='';
//     req.on('data',data=>body+=data);
//     req.on('end',()=>{
//         const post_data = JSON.parse(body);
//         updateProfile(post_data.username, post_data.bio);
//     });
//     res.send("OK");
// });

// app.delete("/profile/delete", async (req, res) => {  //delete requests in express
//     let body='';
//     req.on('data',data=>body+=data);
//     req.on('end',()=>{
//         const post_data = JSON.parse(body);
//         deleteProfileRecipe(post_data.name, post_data.score);
//     });
//     res.send("OK");
// });

// app.put("/profile/unlike", async (req, res) => { //put request + use two functions (both put and delete?)
//     let body='';
//     req.on('data',data=>body+=data);
//     req.on('end',()=>{
//         const post_data = JSON.parse(body);
//         unlikeProfileRecipe(post_data.username, post_data.recipe_id)
//     });
//     res.send("OK");
// });

// app.listen(process.env.PORT || 8080);