const loader = document.getElementById("loader");

class User {
	constructor(username, password) {
		this.username = username;
		this.password = password;
	}
}

async function loginAuthAndToken() {
	const username = document.querySelector("#Username").value;
	const password = document.querySelector("#Password").value;

	const user = new User(username, password);

	loader.style.visibility = "visible";

	let token = await getToken(user.username, user.password);
	if (token === undefined) {
		loader.style.visibility = "hidden";
		return alert(
			"Unable to authenticate your login, please try again later."
		);
	}

	if (!(await authLogin(user.username, user.password, token))) {
		loader.style.visibility = "hidden";
		return alert(
			"Unable to authenticate your login, please try again later."
		);
	}

	window.sessionStorage.setItem("username", user.username);
	window.sessionStorage.setItem("password", user.password);
	window.sessionStorage.setItem("token", token);

	window.location.replace(`/profile`);
}

async function authLogin(username, password, token) {
	let userLoggedIn = false;

	var myHeaders = new Headers();
	myHeaders.append("Authorization", `Bearer ${token}`);
	myHeaders.append("Content-Type", "application/json");

	var raw = JSON.stringify({
		username: username,
		password: password,
	});

	var requestOptions = {
		method: "POST",
		headers: myHeaders,
		body: raw,
		redirect: "follow",
	};

	await fetch(
		"https://dhruv-api-tau.vercel.app/authUserLogin",
		requestOptions
	)
		.then((response) => response.json())
		.then((result) => {
			if (result.detail !== "Success") {
				return userLoggedIn;
			}

			userLoggedIn = true;
		})
		.catch((error) => console.log("error", error));

	console.log(userLoggedIn);

	return userLoggedIn;
}

function getData() {
	const form = document.querySelector("form");
	form.addEventListener("submit", loginAuthAndToken);
}

getData();
