'use strict';

// For loading environment variables.
require('dotenv').config();

const express = require('express');                 // express routing
const expressSession = require('express-session');  // for managing session state
const passport = require('passport');               // handles authentication
const LocalStrategy = require('passport-local').Strategy; // username/password strategy
//const app = express();
const minicrypt = require('./miniCrypt');
const db = require('./database');
const mc = new minicrypt();

// Session configuration

const session = {
    secret : process.env.SECRET || 'SECRET', // set this encryption key in Heroku config (never in GitHub)!
    resave : false,
    saveUninitialized: false
};

// Passport configuration

const strategy = new LocalStrategy(
    async (username, password, done) => {
	 const user = await findUser(username);
	if (user.length === 0) {
	    // no such user
	    return done(null, false, { 'message' : 'Wrong username' });
	}
	if (!(await validatePassword(username, password))) {
	    // invalid password
	    // should disable logins after N messages
	    // delay return to rate-limit brute-force attacks
	    await new Promise((r) => setTimeout(r, 2000)); // two second delay
	    return done(null, false, { 'message' : 'Wrong password' });
	}
	// success!
	// should create a user object here, associated with a unique identifier
	return done(null, username);
    });


// App configuration

passport.use(strategy);

// Convert user object to a unique identifier.
passport.serializeUser((user, done) => {
    done(null, user);
});
// Convert a unique identifier to a user object.
passport.deserializeUser((uid, done) => {
    done(null, uid);
});

// Returns true iff the user exists.
async function findUser(username) {
    return db.getUsername(username);
}

// TODO
// Returns true iff the password is the one we have stored (in plaintext = bad but easy).
async function validatePassword(name, pwd) {

    const data = await db.getPassword(name);
    return (mc.check(pwd, data.salt, data.password));

}

// Add a user to the "database".
// TODO
async function addUser(name, email, pwd, bio, profile_pic) {
	const user = await findUser(name);
     if (user.length !== 0) {
          return false;
     }
	const encrypted = mc.hash(pwd);
	const salt = encrypted[0];
	const hash = encrypted[1];
	// console.log("salt: " + salt + "hash: " + hash);
	// console.log("add_name: " + name);
	await db.signup(name, email, salt, hash, bio, profile_pic);
    return true;
}

// Routes

function checkLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
	// If we are authenticated, run the next route.
	next();
    } else {
	// Otherwise, redirect to the login page.
	res.redirect('/login');
    }
}

module.exports = {
	findUser,
	validatePassword,
	addUser,
	checkLoggedIn
}
