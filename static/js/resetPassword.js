const apiUrl = "https://dhruv-api-tau.vercel.app/"

function resetPassCall() {
	const form = document.querySelector("form");
	form.addEventListener("submit", resetPassword);
}

resetPassCall();

async function resetPassword() {
    const params = new Proxy(new URLSearchParams(window.location.search), {
        get: (searchParams, prop) => searchParams.get(prop),
    });

    let token = params.token;

    if (token === ""|| token === undefined) {
        return window.location.replace(`/`);
    }

    const password = document.querySelector("#Password").value;
    const passwordConfirm = document.querySelector("#confirmPassword").value

    if (password !== passwordConfirm) {
        return alert("Passwords are not the same.")
    }

    let result = await resetPasswordReq(token, password);

    if (result === true) {
        alert("Successfully reset password!");
        return window.location.replace('/login');
    } else {
        alert(result.toString());
    }
}

async function resetPasswordReq(token, newPassword) {
    let res;

    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
        "newPassword": newPassword,
    });

    var requestOptions = {
        method: 'PUT',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    await fetch(`${apiUrl}resetPassword`, requestOptions)
    .then(response => response.json())
    .then(result => {
        if (result.detail === "Successfully updated your password") {
            res = true
        } else {
            res = result.detail;
        }
    })
    .catch(error => console.log('error', error));


    return res;
}