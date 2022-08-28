let apiUrl = "http://localhost:3000/";

class postUser {
    constructor(username, firstname, lastname, email, password, token) {
        this.username = username;
        this.firstname = firstname;
        this.lastname = lastname;
        this.email = email;
        this.password = password;
        this.token = token;
    }
}

async function postUserFunc() {
    const username = document.querySelector("#Username").value;
    const firstname = document.querySelector("#Firstname").value;
    const lastname = document.querySelector("#Lastname").value;
    const email = document.querySelector("#Email").value;
    const password = document.querySelector("#Password").value;

    const user = new postUser(username, firstname, lastname, email, password);

    let token = await getPostUserToken(user);

    if (token === false) {
        return alert("Unknown error, please try again later.");
    }  

    user.token = token;

    console.log(user)

    let result = await requestVerifyEmail(user);

    if (result !== true) {
        alert("Unable to send verrification email. Please try again later");
        window.location.replace('/');
        return;
    }

    window.location.replace('/');
    alert("Successfully sent email to your inbox, please check your inbox.")
}

async function requestVerifyEmail(user) {
    let sentEmail = false;

    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${user.token}`);
    myHeaders.append("Content-Type", "application/json");
    
    var raw = JSON.stringify({
      "username": user.username,
      "firstname": user.firstname,
      "lastname": user.lastname,
      "email": user.email,
      "password": user.password
    });
    
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
    
    await fetch(`${apiUrl}verifyUserEmail`, requestOptions)
      .then(response => response.json())
      .then(result => {
        if (result.detail === "Successfully sent email, please check your inbox to verify your email.") {
            sentEmail = true;
        }
      })
      .catch(error => console.log('error', error));

    return sentEmail;
}

async function getPostUserToken(user) {
    let getToken = false;

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    
    var raw = JSON.stringify({
      "name": user.username,
      "password": user.password
    });
    
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
    
    await fetch(`${apiUrl}users/login`, requestOptions)
      .then(response => response.json())
      .then(result => {
        if (result.postUserToken !== undefined) {
            return getToken = result.postUserToken;
        }
      })
      .catch(error => console.log('error', error));

    return getToken;
}

function waitForSubmit() {
    const form = document.querySelector("form");
    form.addEventListener("submit", postUserFunc)
}

waitForSubmit();