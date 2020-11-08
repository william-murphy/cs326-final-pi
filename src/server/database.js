const pgp = require("pg-promise")({
    connect(client) {
        console.log('Connected to database:', client.connectionParameters.database);
    },

    disconnect(client) {
        console.log('Disconnected from database:', client.connectionParameters.database);
    }
});

const username = "postgres";
const password = "admin";

const url = process.env.DATABASE_URL || `postgres://${username}:${password}@localhost/`;
const db = pgp(url);

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

async function getInitialFeed() {

}
/*
async function loadFeed() {

}
*/
async function saveRecipe(name) {

}

async function getInitialPeople() {

}
/*
async function loadPeople() {

}
*/

async function createRecipe() {

}

async function getProfile() {

}

async function updateProfile() {

}

async function deleteProfileRecipe() {

}

async function login(username, password) {

}

async function signup(name, email, username, password) {

}