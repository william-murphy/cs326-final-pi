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
        await database.saveRecipe(req.query.username, req.query.recipeName);
        res.send("OK");
    } else if(parsed.pathname === '/recipe') { //GET
        //getSampleRecipes

    } else if(parsed.pathname === '/recipe/search') { //GET
        //getInitialRecipes
    
    /*} else if(parsed.pathname === '/recipe/load') { //GET*/

    } else if(parsed.pathname === '/recipe/save') { //POST

    } else if(parsed.pathname === '/people/search') { //GET
        //getInitialPeople

    /*} else if(parsed.pathname === '/people/load') { //GET*/

    /*} else if(parsed.pathname === '/people/follow') { //POST*/

    } else if(parsed.pathanme === '/create') { //POST
        //createRecipe

    } else if(parsed.pathname === '/profile') { //GET
        //getProfile

    } else if(parsed.pathname === '/profile/edit') { //PUT/POST?
        //updateProfile

    } else if(parsed.pathname === '/profile/delete') { //DELETE/POST?
        //deleteProfileRecipe

    } else if(parsed.pathname === '/login/user') { //POST
        //login

    } else if(parsed.pathname === '/signup/user') { //POST
        //signup

    } else {

    }

}).listen(process.env.PORT || 8080);