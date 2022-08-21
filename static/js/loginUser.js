const apiURL = ""; 


async function loginAuth() {
 const data = {
    username: document.querySelector("#Username").value,
    password: document.querySelector("#Password").value
 }

 await fetch(`${apiURL}`)
}


function getData() {
    const form = document.querySelector("form");
    form.addEventListener("submit", loginAuth);    
}

getData();
