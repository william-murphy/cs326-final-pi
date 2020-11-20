import {createServer} from 'http';
import {parse} from 'url';
import {join} from 'path';
import {writeFile, readFileSync, existsSync} from 'fs';
import pgp from "pg-promise";

// CREATE TABLE wordScores (name VARCHAR(255), word VARCHAR(255), score INT, PRIMARY KEY(name, word, score));
// CREATE TABLE gameScores (name VARCHAR(255), score INT, PRIMARY KEY(name, score));

// Local Postgres credentials
const username = "postgres";
const password = "admin";

const url = process.env.DATABASE_URL || `postgres://${username}:${password}@localhost/`;
const db = pgp()(url);

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

createServer(async (req, res) => {
    const parsed = parse(req.url, true);

    if (parsed.pathname === "/login/user") {
        let body = '';
        req.on('data', data => body += data);
        req.on('end', async () => {
            const data = JSON.parse(body);
            login(data.username, data.password);
            res.end();
        });
    } else if (parsed.pathname === "/signup/user") {
        let body = '';
        req.on('data', data => body += data);
        req.on('end', async () => {
            const data = JSON.parse(body);
            signup(data.username, data.name, data.email, data.password, data.bio);
            res.end();
        });
    } else if (parsed.pathname === '/feed') {
        res.end(JSON.stringify(
            getInitialFeed()
        ));
    } else if(parsed.pathname === "/feed/save") {
        let body = '';
        req.on('data', data => body += data);
        req.on('end', async () => {
            const data = JSON.parse(body);
            saveFromFeed(data.recipe_id, data.username);
            res.end();
        });
    }  else if (parsed.pathname === '/recipe/search') {
        res.end(JSON.stringify(
            searchRecipes(input)
        ));
    } else if (parsed.pathname === "/recipe/save") {
        let body = '';
        req.on('data', data => body += data);
        req.on('end', async () => {
            const data = JSON.parse(body);
            saveRecipe(data.recipe_id, data.username);
            res.end();
        });
    } else if (parsed.pathname === "/post/upload") {
        let body = '';
        req.on('data', data => body += data);
        req.on('end', async () => {
            const data = JSON.parse(body);
            createRecipe(data.username, data.recipe_name, data.recipe_desc);
            res.end();
        });
    } else if (parsed.pathname === '/people/search') {
        res.end(JSON.stringify(
            searchPeople(input)
        ));
    } else if (parsed.pathname === '/profile') {
        res.end(JSON.stringify(
            getProfile(username)
        ));
    } else if (parsed.pathname === "/profile/edit") {
        let body = '';
        req.on('data', data => body += data);
        req.on('end', async () => {
            const data = JSON.parse(body);
            updateProfile(data.username, data.bio);
            res.end();
        });
    } else if (parsed.pathname === "/profile/delete") {
        let body = '';
        req.on('data', data => body += data);
        req.on('end', async () => {
            const data = JSON.parse(body);
            deleteProfileRecipe(data.name, data.score);
            res.end();
        });
    } else if (parsed.pathname === "/profile/unlike") {
        let body = '';
        req.on('data', data => body += data);
        req.on('end', async () => {
            const data = JSON.parse(body);
            unlikeProfileRecipe(data.username, data.recipe_id);
            res.end();
        });
    } else {
        // If the client did not request an API endpoint, we assume we need to fetch a file.
        // This is terrible security-wise, since we don't check the file requested is in the same directory.
        // This will do for our purposes.
        const filename = parsed.pathname === '/' ? "index.html" : parsed.pathname.replace('/', '');
        const path = join("client/", filename);
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