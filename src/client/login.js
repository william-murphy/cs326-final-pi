//Implemented in passport

/*document.getElementById('login').addEventListener('click', login);

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
/*
    let url = '/login/user?username=' + username + '&password=' + password;
    const loginRequest = await fetch(url);
    const loginData = loginRequest.ok? await loginRequest.json() : [];
    let storage = window.localStorage;

    if(loginData.length > 0) {
        console.log("logged in");
        storage.setItem('user', JSON.stringify(loginData.username));
    }else {
        console.log("wrong username/password.")
    }
}
*/