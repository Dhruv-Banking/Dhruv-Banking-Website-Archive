const apiURL = "https://dhruv-banking.vercel.app/";

async function authLoggedIn() {
	let username = window.sessionStorage.getItem("username");

	if (username === null) {
		return window.location.replace("/");
	}

	let token = window.sessionStorage.getItem("token");

	window.document.title = `${username} | Dhruv Banking`;

	// Put all values
	const checkings = document.getElementById("checkings");
	const savings = document.getElementById("savings");

	let userData = await getUserData(username, token);

	// Put the values
	checkings.innerHTML = `$${userData.checkings}`;
	savings.innerHTML = `$${userData.savings}`;
}

async function getUserData(username, token) {
	let data;

	var myHeaders = new Headers();
	myHeaders.append("Authorization", `Bearer ${token}`);

	var requestOptions = {
		method: "GET",
		headers: myHeaders,
		redirect: "follow",
	};

	await fetch(`${apiURL}specificUser?username=${username}`, requestOptions)
		.then((response) => response.json())
		.then((result) => {
			data = result[0];
		})
		.catch((error) => console.log("error", error));

	return data;
}

authLoggedIn();

function logOut() {
	window.sessionStorage.removeItem("username");
	window.sessionStorage.removeItem("password");
	window.sessionStorage.removeItem("token");
}
