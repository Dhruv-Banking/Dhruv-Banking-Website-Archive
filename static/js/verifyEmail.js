const apiUrl = "https://dhruv-banking.vercel.app/";

function verifyEmailCall() {
	const form = document.querySelector("form");
	form.addEventListener("submit", verifyEmail);
}

verifyEmailCall();

async function verifyEmail() {
	const params = new Proxy(new URLSearchParams(window.location.search), {
		get: (searchParams, prop) => searchParams.get(prop),
	});

	let token = params.token;

	if (token === "" || token === undefined) {
		return window.location.replace(`/`);
	}

	let result = await postUserToDatabase(token);

	if (result !== true) {
		alert(result);
		return window.location.replace(`/`);
	}

	alert("User successfully created!");
	window.location.replace("/login");
}

async function postUserToDatabase(token) {
	let resultPost;

	var myHeaders = new Headers();
	myHeaders.append("Authorization", `Bearer ${token}`);

	var requestOptions = {
		method: "POST",
		headers: myHeaders,
		redirect: "follow",
	};

	await fetch(`${apiUrl}postUser`, requestOptions)
		.then((response) => response.json())
		.then((result) => {
			if (result.detail === "user has been successfully created!") {
				resultPost = true;
			} else {
				resultPost = result.detail;
			}
		})
		.catch((error) => console.log("error", error));

	return resultPost;
}
