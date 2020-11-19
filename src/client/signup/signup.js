//Implemented in passport.js

/*
document.getElementById('signup').addEventListener('click', signup);

async function signup() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    //alert("attempting sign up");

    //send data to database, make new account

    const response = await fetch('/signup/user', {
        method: 'POST',
        body: JSON.stringify({
            name: name,
            email: email,
            username: username,
            password: password,
            bio: ""
        })
    });

    if(!response.ok) {
        console.error("Could not create an account.");
    }
    
}
*/