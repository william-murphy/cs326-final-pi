document.getElementById('login').addEventListener('click', login);

async function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    //alert("attempt log in");

    //check if username and corresponding password in database
    //if true successful login
    //else fail

    /*
    const response = await fetch('/login/user', {
        method: 'POST',
        body: JSON.stringify({

        })
    });
    */

    const loginRequest = await fetch('/login/user');
    const loginData = loginRequest.ok? await loginRequest.json() : [];

    if(loginData.length > 0) {
        console.log("logged in");
    }else {
        console.log("wrong username/password.")
    }
}