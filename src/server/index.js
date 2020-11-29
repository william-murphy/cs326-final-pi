const express = require("express");
const database = require("./database");
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

const path = require("path");
__dirname = path.resolve();

app.use(express.static(__dirname + '/src/client/'));

app.use(expressSession(session));
app.use(passport.initialize());
app.use(passport.session());

app.use(express.json()); // allow JSON inputs
app.use(express.urlencoded({'extended' : true})); // allow URLencoded data

app.get("/getFeed", passportFunctions.checkLoggedIn, async (req, res) => {
    res.send(JSON.stringify(
        await database.getInitialFeed()
    ));
});

app.post("/feed/like", passportFunctions.checkLoggedIn, async (req, res) => {
    await database.saveFromFeed(req.body.recipe_id, req.user);
    res.end();
});

app.get("/recipe/search/:input", passportFunctions.checkLoggedIn, async (req, res) => { //how to include input in function call?
    res.send(JSON.stringify(
        await database.searchRecipes(req.params.input)
    ));
});

app.post("/recipe/save", passportFunctions.checkLoggedIn, async (req, res) => {
    await database.saveRecipe(req.body.recipe_id, req.user);
    res.end();
});

app.post("/post/upload", passportFunctions.checkLoggedIn, async (req, res) => {
    await database.createRecipe(req.user, req.body.recipe_name, req.body.recipe_desc, req.body.recipe_pic);
    res.end();
});

app.get("/people/search/:input", passportFunctions.checkLoggedIn, async (req, res) => { //how to include input in function call?
    res.send(JSON.stringify(
        await database.searchPeople(req.params.input)
    ));
});

app.get("/getProfile", passportFunctions.checkLoggedIn, async (req, res) => { //how to include input in function call?
    res.send(JSON.stringify(
        await database.getProfile(req.user)
    ));
});

app.post("/profile/edit", passportFunctions.checkLoggedIn, async (req, res) => {  //how to do put requests in express
    await database.updateProfile(req.user, req.body.bio);
    res.end();
});

app.post("/profile/edit-pic", passportFunctions.checkLoggedIn, async (req, res) => { 
    await database.updatePic(req.user, req.body.profile_pic);
    res.end();
});

app.post("/profile/delete", passportFunctions.checkLoggedIn, async (req, res) => {  
    await database.deleteRecipe(req.body.recipe_id);
    res.end();
});

app.post("/profile/unlike", passportFunctions.checkLoggedIn, async (req, res) => { 
    await database.unlikeProfileRecipe(req.user, req.body.recipe_id);
    res.end();
});

// Handle post data from the login.html form.
app.post('/login',
		passport.authenticate('local' , {     // use username/password authentication
            'successRedirect' : '/feed',   // when we login, go to /private
            'failureRedirect' : '/login'      // otherwise, back to login
}));

// Handle the URL /login (just output the login.html file).
app.get('/login',
	(req, res) => res.sendFile('/src/client/index.html',
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
