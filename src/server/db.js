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

//three tables: Users [username, name, email, password, bio], Recipe [recipeid, username, recipename, description, likes], Saved [recipeid, username]


//Feed

export async function getInitialFeed() {
    return await connectAndRun(db => db.any("SELECT * FROM Recipes;"));
}

export async function saveFromFeed(recipeID, username) {
    return await connectAndRun(db => db.none("INSERT INTO Saved Values ($1, $2);", [recipeID, username]));
}

//Recipe

export async function getSampleRecipes() {
    return await connectAndRun(db => db.any("SELECT * FROM Recipes ORDER BY RANDOM() LIMIT 3;"));
}

export async function getInitialRecipes(input) {
    return await connectAndRun(db => db.any("SELECT * FROM Recipes WHERE recipeName = $1;", [input]));
}

//People

// export async function getInitialPeople(input) {
//     return await connectAndRun(db => db.any("SELECT * FROM Users WHERE username = $1;", [input]));
// }

export async function getInitialPeople(input) {
    return await connectAndRun(db => db.one("SELECT * FROM Users WHERE username = $1 OR name = $1;", [input]));
}

//Create

export async function saveRecipe(recipeID, username) {
    return await connectAndRun(db => db.none("INSERT INTO Saved Values ($1, $2);", [recipeID, username]));
}

export async function createRecipe(username, recipeName, description) {
    return await connectAndRun(db => db.none("INSERT INTO Recipes VALUES ($1, $2, $3, $4);", [username, recipeName, description, 0]));
}

//Profile

export async function getProfile(username) {
    return await connectAndRun(db => db.one("SELECT * FROM Users WHERE username = $1;", [username]));
}

export async function updateProfile(username, bio) {
    return await connectAndRun(db => db.none("UPDATE Users SET bio = $1 WHERE username = $2;", [bio, username]));
}

export async function deleteProfileRecipe(recipeId) {
    return await connectAndRun(db => db.none("DELETE FROM Saved WHERE recipeId = $1;", [recipeId]));
}

export async function unlikeProfileRecipe1(recipeId) {
     return await connectAndRun(db => db.none("UPDATE likes SET likes = likes - 1 WHERE recipeId = $1;", [recipeId]));
}

export async function unlikeProfileRecipe2(username, recipeId) {
     return await connectAndRun(db => db.none("DELETE FROM Saved WHERE username = $1 AND recipeId = $2", [username, recipeId]));
}

//Login/Sign up

export async function login(username, password) {
    return await connectAndRun(db => db.one("SELECT * FROM Users WHERE username = $1 AND password = $2;", [username, password]));
}

export async function signup(username, name, email, password, bio) { //bio empty when sign up
    return await connectAndRun(db => db.none("INSERT INTO Users VALUES ($1, $2, $3, $4, $5);", [username, name, email, password, bio]));
}

// EXPRESS SETUP
const app = express();

app.use('/', express.static('./client'));

app.post("/login/user", async (req, res) => {
    let body='';
    req.on('data',data=>body+=data);
    req.on('end',()=>{
        const post_data = JSON.parse(body);
        login(post_data.username, post_data.password);
    });
    res.send("OK");
});

app.post("/signup/user", async (req, res) => {
    let body='';
    req.on('data',data=>body+=data);
    req.on('end',()=>{
        const post_data = JSON.parse(body);
        signup(post_data.username, post_data.name, post_data.email, post_data.password, post_data.bio);
    });
    res.send("OK");
});

app.get("/feed", async (req, res) => {
    const getFeed = await getInitialFeed();
    res.send(JSON.stringify(getFeed));
});

app.post("/feed/save", async (req, res) => {
    let body='';
    req.on('data',data=>body+=data);
    req.on('end',()=>{
        const post_data = JSON.parse(body);
        addWordScore(post_data.name, post_data.word, post_data.score);
    });
    res.send("OK");
});


app.get("/recipe/search", async (req, res) => {
    const gameScore = await getHighestGame();
    res.send(JSON.stringify(gameScore));
});

app.post("/recipe/save", async (req, res) => {
    let body='';
    req.on('data',data=>body+=data);
    req.on('end',()=>{
        const post_data = JSON.parse(body);
        addWordScore(post_data.name, post_data.word, post_data.score);
    });
    res.send("OK");
});

app.get("/people/search", async (req, res) => {
    const gameScore = await getHighestGame();
    res.send(JSON.stringify(gameScore));
});

app.post("/create", async (req, res) => {
    let body='';
    req.on('data',data=>body+=data);
    req.on('end',()=>{
        const post_data = JSON.parse(body);
        addGameScore(post_data.name, post_data.score);
    });
    res.send("OK");
});

app.post("/post/upload", async (req, res) => {
    let body='';
    req.on('data',data=>body+=data);
    req.on('end',()=>{
        const post_data = JSON.parse(body);
        addGameScore(post_data.name, post_data.score);
    });
    res.send("OK");
});

app.get("/profile", async (req, res) => {
    const gameScore = await getHighestGame();
    res.send(JSON.stringify(gameScore));
});

app.post("/profile/edit", async (req, res) => {
    let body='';
    req.on('data',data=>body+=data);
    req.on('end',()=>{
        const post_data = JSON.parse(body);
        addGameScore(post_data.name, post_data.score);
    });
    res.send("OK");
});

app.delete("/profile/delete", async (req, res) => {  //
    let body='';
    req.on('data',data=>body+=data);
    req.on('end',()=>{
        const post_data = JSON.parse(body);
        addGameScore(post_data.name, post_data.score);
    });
    res.send("OK");
});

app.post("/profile/unlike", async (req, res) => {
    let body='';
    req.on('data',data=>body+=data);
    req.on('end',()=>{
        const post_data = JSON.parse(body);
        addGameScore(post_data.name, post_data.score);
    });
    res.send("OK");
});

app.listen(process.env.PORT || 8080);