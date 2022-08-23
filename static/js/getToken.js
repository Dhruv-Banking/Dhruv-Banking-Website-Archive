const apiURL = "https://dhruv-api-tau.vercel.app/";

async function getToken(name, password) {
	let tokenReturn = "";
	var myHeaders = new Headers();
	myHeaders.append("Content-Type", "application/json");

	var raw = JSON.stringify({
		name: name,
		password: password,
	});

	var requestOptions = {
		method: "POST",
		headers: myHeaders,
		body: raw,
		redirect: "follow",
	};

	await fetch(`${apiURL}users/login`, requestOptions)
		.then((response) => response.json())
		.then((result) => {
			tokenReturn = result.accessToken;
		})
		.catch((error) => console.log("error", error));

	return tokenReturn;
}
