import {createServer} from 'http';
import {parse} from 'url';
import {join} from 'path';
import {writeFile, readFileSync, existsSync} from 'fs';

/*
let database;
if (existsSync("database.json")) {
    database = JSON.parse(readFileSync("database.json"));
} else {
    database = {
        wordScores: [],
        gameScores: []
    };
}
*/

createServer(async (req, res) => {
    const parsed = parse(req.url, true);

    if (parsed.pathname === '/feed') { //GET
      //get image data from database
      res.end(JSON.stringify(
          //image data from database
      ));
    }else if (parsed.pathname === '/feed/load') { //GET
      //get image data from database
      res.end(JSON.stringify(
          //image data from database
      ));
    }else if (parsed.pathname === '/feed/save') { //POST
      let body = '';
      req.on('data', data => body += data);
      req.on('end', () => {
          const data = JSON.parse(body);
          //enter data in database according to given data
      });
    }else if (parsed.pathname === '/recipe/') { //GET
      //get recipe data from database
      res.end(JSON.stringify(
          //recipe data from database
      ));
    }else if (parsed.pathname === '/recipe/search') { //GET
      //get recipe data from database
      res.end(JSON.stringify(
        //recipe data from database
    ));
    }else if (parsed.pathname === '/recipe/load') { //GET
        //load more recipe from database
      res.end(JSON.stringify(
        //image data from database
    ));
    }else if (parsed.pathname === '/recipe/save') { //POST

    }else if (parsed.pathname === '/people/search') { //GET

    }else if (parsed.pathname === '/people/load') { //GET

    }else if (parsed.pathname === '/people/follow') { //POST

    }else if (parsed.pathname === '/profile') { //GET

    }else if (parsed.pathname === '/profile/edit') { //PUT/POST?

    }/*else if (parsed.pathname === '/profile/recipe') { //GET

    }*/else if (parsed.pathname === '/profile/delete') { //POST
        //unsave a recipe or delete one that user posted
    }else if (parsed.pathname === '/login/user') { //POST

    }/*else if (parsed.pathname === '/login/forgot-password') {

    }*/else if (parsed.pathname === '/signup/user') { //POST

    }

    /*
    if (parsed.pathname === '/wordScore') {
        let body = '';
        req.on('data', data => body += data);
        req.on('end', () => {
            const data = JSON.parse(body);
            database.wordScores.push({
                name: data.name,
                word: data.word,
                score: data.score
            });

            writeFile("database.json", JSON.stringify(database), err => {
                if (err) {
                    console.err(err);
                } else res.end();
            });
        });
    } else if (parsed.pathname === '/gameScore') {
        let body = '';
        req.on('data', data => body += data);
        req.on('end', () => {
            const data = JSON.parse(body);
            database.gameScores.push({
                name: data.name,
                score: data.score
            });

            writeFile("database.json", JSON.stringify(database), err => {
                if (err) {
                    console.err(err);
                } else res.end();
            });
        });
    } else if (parsed.pathname === '/highestWordScores') {
        res.end(JSON.stringify(
            database.wordScores.sort((a, b) => b.score - a.score).filter((v, i) => i < 10)
        ));
    } else if (parsed.pathname === '/highestGameScores') {
        res.end(JSON.stringify(
            database.gameScores.sort((a, b) => b.score - a.score).filter((v, i) => i < 10)
        ));
    */
    /*}*/ else {
        // If the client did not request an API endpoint, we assume we need to fetch and serve a file.
        // This is terrible security-wise, since we don't check the file requested is in the same directory.
        // This will do for our purposes.
        const filename = parsed.pathname === '/' ? "index.html" : parsed.pathname.replace('/', '');
        const path = join("client/", filename);
        console.log("trying to serve " + path + "...");
        if (existsSync(path)) {
            if (filename.endsWith("html")) {
                res.writeHead(200, {"Content-Type" : "text/html"});
            }else if (filename.endsWith("css")) {
                res.writeHead(200, {"Content-Type" : "text/css"});
            }else if (filename.endsWith("js")) {
                res.writeHead(200, {"Content-Type" : "text/javascript"});
            }else {
              res.writeHead(200);
            }

            // TODO you need to check for other filetypes and write the correct MIME type in the header.
            // Without these, the browser is sometime incapable of interpreting the file as it should
            // (Notably for JS files)

            res.write(readFileSync(path));
            res.end();
        } else {
            res.writeHead(404);
            res.end();
        }
    }
}).listen(8080);
