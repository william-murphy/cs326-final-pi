import {createServer} from 'http';
import {parse} from 'url';
import {join} from 'path';
import * as database from "./database.js";
import {writeFile, readFileSync, existsSync, fstat} from 'fs';

createServer(async (req, res) => {
    const parsed = parse(req.url, true);

    if(parsed.pathname === '/feed') {//GET
        //get image data from database
        const feed = await database.getInitialFeed();
        res.end(JSON.stringify(feed));

   } else if(parsed.pathname === '/feed/save') { //POST
        await database.saveFromFeed(req.query.username, req.query.recipeName);
        res.send("OK");

    } else if(parsed.pathname === '/recipe') { //GET
        //getSampleRecipes
        const recipes = await database.getSampleRecipes();
        res.end(JSON.stringify(recipes));

    } else if(parsed.pathname === '/recipe/search') { //GET
        //getInitialRecipes
        const recipes = await database.getInitialRecipes(req.query.input);
        res.end(JSON.stringify(recipes));

    /*} else if(parsed.pathname === '/recipe/load') { //GET*/

    } else if(parsed.pathname === '/recipe/save') { //POST
        await database.saveRecipe(req.query.username, req.query.recipeName);
        res.send("OK");

    } else if(parsed.pathname === '/people/search') { //GET
        //getInitialPeople
        const people = await database.getInitialPeople(req.query.input);
        res.end(JSON.stringify(people));

    /*} else if(parsed.pathname === '/people/load') { //GET*/

    /*} else if(parsed.pathname === '/people/follow') { //POST*/

    } else if(parsed.pathname === '/post/upload') { //POST
	    //createRecipe
         await database.createRecipe(req.query.username, req.query.recipe_name, req.query.recipe_desc);
         res.send("OK");

    } else if(parsed.pathname === '/profile') { //GET
        //getProfile
        const profile = await database.getProfile(req.query.username);
        res.end(JSON.stringify(profile));

    } else if(parsed.pathname === '/profile/edit') { //PUT/POST?
        //updateProfile
        await database.updateProfile(req.query.username, req.query.bio);
        res.send("OK");

    } else if(parsed.pathname === '/profile/delete') { //DELETE
        //deleteProfileRecipe
        await database.deleteProfileRecipe(req.query.recipe_id);
        res.send("OK");

   } else if(parsed.pathname === '/profile/unlike') { //POST
        await database.unlikeProfileRecipe1(req.query.recipe_id);
        await database.unlikeProfileRecipe2(req.query.username, req.query.recipe_id);
        res.send("OK");

   } else if(parsed.pathname === '/login/user') { //POST
        //login
        await database.login(req.query.username, req.query.password);
        res.send("OK");

    } else if(parsed.pathname === '/signup/user') { //POST
        //signup
        await database.signup(req.query.name, req.query.email, req.query.username, req.query.password, req.query.bio);
        res.send("OK");
    } else {
        const filename = parsed.pathname === '/' ? "index.html" : parsed.pathname.replace('/', '');
        const path = join("src/client/", filename);
        console.log("trying to serve " + path + "...");
        if (existsSync(path)) {
            if (filename.endsWith("html")) {
                res.writeHead(200, {"Content-Type" : "text/html"});
            } else if (filename.endsWith("css")) {
                res.writeHead(200, {"Content-Type" : "text/css"});
            } else if (filename.endsWith("js")) {
                res.writeHead(200, {"Content-Type" : "text/javascript"});
            } else {
                res.writeHead(200);
            }

            res.write(readFileSync(path));
            res.end();
        } else {
            res.writeHead(404);
            res.end();
        }
    }

}).listen(process.env.PORT || 8080);
