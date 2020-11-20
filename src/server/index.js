import pgPromise from 'pg-promise';
const pgp = pgPromise({});

import * as _express from "express"
const express = _express["default"];

const app = express();

app.use('/', express.static('./client'));

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

app.get("/feed", async (req, res) => { 
    res.send(JSON.stringify(
        await getInitialFeed()
    ));
});

app.post("/feed/save", async (req, res) => {
    await client.db("scrabble").collection("gameScores").insertOne(req.body);
    res.end();

    req.on('end',()=>{
        const post_data = JSON.parse(body);
        saveFromFeed(post_data.recipe_id, post_data.username);
    });
    res.send("OK");
});


app.get("/recipe/search", async (req, res) => { //how to include input in function call?
    res.send(JSON.stringify(
        await client.db("scrabble").collection("wordScores").find().sort({ score: -1 }).limit(10).toArray()
    ));
    const recipe_search = await searchRecipes();
    res.send(JSON.stringify(recipe_search));
});

app.post("/recipe/save", async (req, res) => {
    await client.db("scrabble").collection("gameScores").insertOne(req.body);
    res.end();
    
    req.on('end',()=>{
        const post_data = JSON.parse(body);
        saveRecipe(post_data.recipe_id, post_data.username);
    });
    res.send("OK");
});

app.post("/post/upload", async (req, res) => {
    await client.db("scrabble").collection("gameScores").insertOne(req.body);
    res.end();
    
    req.on('end',()=>{
        const post_data = JSON.parse(body);
        createRecipe(post_data.username, post_data.recipe_name, post_data.recipe_desc);
    });
    res.send("OK");
});

app.get("/people/search", async (req, res) => { //how to include input in function call?
    res.send(JSON.stringify(
        await client.db("scrabble").collection("wordScores").find().sort({ score: -1 }).limit(10).toArray()
    ));
    const user_search = await searchPeople(??);
    res.send(JSON.stringify(user_search));
});

app.get("/profile", async (req, res) => { //how to include input in function call?
    res.send(JSON.stringify(
        await client.db("scrabble").collection("wordScores").find().sort({ score: -1 }).limit(10).toArray()
    ));
    const getUserProfile = await getProfile(??);
    res.send(JSON.stringify(getUserProfile));
});

app.post("/profile/edit", async (req, res) => {  //how to do put requests in express
    await client.db("scrabble").collection("gameScores").insertOne(req.body);
    res.end();
    
    req.on('end',()=>{
        const post_data = JSON.parse(body);
        updateProfile(post_data.username, post_data.bio);
    });
    res.send("OK");
});

app.post("/profile/delete", async (req, res) => {  //delete requests in express
    await client.db("scrabble").collection("gameScores").insertOne(req.body);
    res.end();
    
    req.on('end',()=>{
        const post_data = JSON.parse(body);
        deleteProfileRecipe(post_data.name, post_data.score);
    });
    res.send("OK");
});

app.post("/profile/unlike", async (req, res) => { //put request + use two functions (both put and delete?)
    await client.db("scrabble").collection("gameScores").insertOne(req.body);
    res.end();
    
    req.on('end',()=>{
        const post_data = JSON.parse(body);
        unlikeProfileRecipe(post_data.username, post_data.recipe_id)
    });
    res.send("OK");
});

app.listen(process.env.PORT || 8080);
