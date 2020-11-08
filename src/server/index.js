import {createServer} from 'http';
import {parse} from 'url';
import * as database from "./database.js";

createServer(async (req, res) => {
    const parsed = parse(req.url, true);

    if(parsed.pathname === '/feed') {//GET
        //get image data from database
        const feed = await database.getInitialFeed();
        res.end(JSON.stringify(feed));

    /*} else if(parsed.pathname === '/feed/load') { //GET*/
        //get image data from database

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
         await database.createRecipe(req.query.user, req.query.title, req.query.desc);
         res.send("OK");

    } else if(parsed.pathname === '/profile') { //GET
        //getProfile
        const profile = await database.getProfile(req.query.username);
        res.end(JSON.stringify(profile));

    } else if(parsed.pathname === '/profile/edit') { //PUT/POST?
        //updateProfile
        await database.updateProfile(req.query.username, req.query.bio);
        res.send("OK");

    } else if(parsed.pathname === '/profile/delete') { //DELETE/POST?
        //deleteProfileRecipe
        await database.deleteProfileRecipe(req.query.username, req.query.recipeName);
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

    }

}).listen(process.env.PORT || 8080);
