const express = require("express")

const database = require("./database");

const path = require("path");

const passportFunctions = require("./passport");

const app = express();

// for managing session state
const expressSession = require('express-session');

const passport = require('passport');

const session = {
    secret : process.env.SECRET || 'SECRET', // set this encryption key in Heroku config (never in GitHub)!
    resave : false,
    saveUninitialized: false
};


__dirname = path.resolve();
app.use(express.static(__dirname + '/src/client/'));

app.use(expressSession(session));
app.use(passport.initialize());
app.use(passport.session());

app.use(express.json()); // allow JSON inputs
app.use(express.urlencoded({'extended' : true})); // allow URLencoded data

app.get("/feed", passportFunctions.checkLoggedIn, async (req, res) => {
    res.send(JSON.stringify(
        await database.getInitialFeed()
    ));
});

app.post("/feed/like", async (req, res) => {
    await database.saveFromFeed(req.body.recipe_id, req.user);
    res.end();
});

app.get("/recipe/search", passportFunctions.checkLoggedIn, async (req, res) => { //how to include input in function call?
    res.send(JSON.stringify(
        await database.searchRecipes(req.input)
    ));
});

app.post("/recipe/save", async (req, res) => {
    await database.saveRecipe(req.body.recipe_id, req.user);
    res.end();
});

app.post("/post/upload", passportFunctions.checkLoggedIn, async (req, res) => {
    await database.createRecipe(req.user, req.body.recipe_name, req.body.recipe_desc, req.body.recipe_pic);
    res.end();
});

app.get("/people/search", passportFunctions.checkLoggedIn, async (req, res) => { //how to include input in function call?
    res.send(JSON.stringify(
        await database.searchPeople(req.input)
    ));
});

app.get("/profile", passportFunctions.checkLoggedIn, async (req, res) => { //how to include input in function call?
    res.send(JSON.stringify(
        await database.getProfile(req.user)
    ));
});

app.post("/profile/edit", async (req, res) => {  //how to do put requests in express
    await database.updateProfile(req.user, req.body.bio);
    res.end();
});

app.post("/profile/edit-pic", async (req, res) => {  //how to do put requests in express
    await database.updatePic(req.user, req.body.profile_pic);
    res.end();
});

app.post("/profile/delete", async (req, res) => {  //delete requests in express
    await database.deleteProfileRecipe(req.body.recipe_id);
    res.end();
});

app.post("/profile/unlike", async (req, res) => { //put request + use two functions (both put and delete?)
    await database.unlikeProfileRecipe(req.user, req.body.recipe_id);
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

app.get('/',
    passportFunctions.checkLoggedIn,
	(req, res) => {
	    res.send("hello world");
	});

// Handle post data from the login.html form.
app.post('/login',
		passport.authenticate('local' , {     // use username/password authentication
	     'successRedirect' : '/feedPage',   // when we login, go to /private
	     'failureRedirect' : '/login'      // otherwise, back to login
	 }));

// Handle the URL /login (just output the login.html file).
app.get('/login',
	(req, res) => res.sendFile('/src/client/index.html',
				   { 'root' : __dirname }));

app.get('/feedPage',
    passportFunctions.checkLoggedIn,
	(req, res) => res.sendFile('/src/client/feed/index.html',
                   { 'root' : __dirname }));

// Handle logging out (takes us back to the login page).
app.get('/logout', (req, res) => {
    req.logout(); // Logs us out!
    res.redirect('/login'); // back to login
});


// Like login, but add a new user and password IFF one doesn't exist already.
// If we successfully add a new user, go to /login, else, back to /register.
// Use req.body to access data (as in, req.body['username']).
// Use res.redirect to change URLs.
app.post('/register',
     async (req, res) => {
          const email = req.body['email'];
          const username = req.body['username'];
          const password = req.body['password'];
          const bio = "";
          const profile_pic = "";
          if (await passportFunctions.addUser(username, email, password, bio, profile_pic)) {
               res.redirect('/login');
          } else {
               res.redirect('/register');
          }
     });

// Register URL
app.get('/register',
	(req, res) => res.sendFile('/src/client/signup/index.html',
				   { 'root' : __dirname }));

app.listen(process.env.PORT || 8080);
