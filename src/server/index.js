import pgPromise from 'pg-promise';
const pgp = pgPromise({});

import * as _express from "express"

import * as database from "./database.js";

import path from 'path';

const express = _express["default"];
const app = express();
const __dirname = path.resolve();

app.use(express.static(__dirname + '/src/client/'));

app.get("/feed", async (req, res) => {
    res.send(JSON.stringify(
        await database.getInitialFeed()
    ));
});

app.post("/feed/save", async (req, res) => {
    await database.saveFromFeed(req.recipe_id, req.username);
    res.end();
});


app.get("/recipe/search", async (req, res) => { //how to include input in function call?
    res.send(JSON.stringify(
        await database.searchRecipes(req.input)
    ));
});

app.post("/recipe/save", async (req, res) => {
    await database.saveRecipe(req.recipe_id, req.username);
    res.end();
});

app.post("/post/upload", async (req, res) => {
    await database.createRecipe(req.username, req.recipe_name, req.recipe_desc, req.recipe_pic);
    res.end();
});

app.get("/people/search", async (req, res) => { //how to include input in function call?
    res.send(JSON.stringify(
        await database.searchPeople(req.input)
    ));
});

app.get("/profile", async (req, res) => { //how to include input in function call?
    res.send(JSON.stringify(
        await database.getProfile(req.username)
    ));
});

app.post("/profile/edit", async (req, res) => {  //how to do put requests in express
    await database.updateProfile(req.username, req.bio);
    res.end();
});

app.post("/profile/delete", async (req, res) => {  //delete requests in express
    await database.deleteProfileRecipe(req.recipe_id);
    res.end();
});

app.post("/profile/unlike", async (req, res) => { //put request + use two functions (both put and delete?)
    await database.unlikeProfileRecipe1(req.recipe_id);
    await database.unlikeProfileRecipe2(req.username, req.recipe_id);
    res.end();
});

//getting username
app.get("/username", async (req, res) => {
    res.send(JSON.stringify(
        await database.getUsername(req.username)
    ));
});

//getting password info
app.get("/password", async (req, res) => {
    res.send(JSON.stringify(
        await database.getPassword(req.username)
    ));
});

//creating user
app.post("/user", async (req, res) => {
    await database.signup(req.username, req.email, req.salt, req.hash, req.bio, req.profile_pic);
    res.end();
});

app.listen(process.env.PORT || 8080);


// app.post("/login/user", async (req, res) => {
//     let body='';
//     req.on('data',data=>body+=data);
//     req.on('end',()=>{
//         const req = JSON.parse(body);
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
