import {createServer} from 'http';
import {parse} from 'url';
import * as utils from "./database.js";

createServer(async (req, res) => {
    const parsed = parse(req.url, true);

    if(parsed.pathname === '/feed') {//GET
        //get image data from database

    } else if(parsed.pathname === '/feed/load') { //GET
        //get image data from database

    } else if(parsed.pathname === '/feed/save') { //POST

    } else if(parsed.pathname === '/recipe') { //GET

    } else if(parsed.pathname === '/recipe/search') { //GET

    /*} else if(parsed.pathname === '/recipe/load') { //GET*/

    } else if(parsed.pathname === '/recipe/save') { //POST

    } else if(parsed.pathname === '/people/search') { //GET

    /*} else if(parsed.pathname === '/people/load') { //GET*/

    /*} else if(parsed.pathname === '/people/follow') { //POST*/

    } else if(parsed.pathanme === '/create') { //POST

    } else if(parsed.pathname === '/profile') { //GET

    } else if(parsed.pathname === '/profile/edit') { //PUT/POST?

    } else if(parsed.pathname === '/profile/delete') { //DELETE/POST?

    } else if(parsed.pathname === '/login/user') { //POST

    } else if(parsed.pathname === '/signup/user') { //POST

    } else {

    }

}).listen(process.env.PORT || 8080);