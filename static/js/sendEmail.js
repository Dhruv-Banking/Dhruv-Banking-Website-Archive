const apiUrl = "https://dhruv-banking.vercel.app/";

function submitData() {
	const form = document.querySelector("form");
	form.addEventListener("submit", resetPassword);
}

submitData();

async function resetPassword() {
	const username = document.querySelector("#Username").value;

	if (username === undefined || username === "") {
		return alert("Please provide a username.");
	}

	let result = await resetPasswordRequest(username);

	if (result === true) {
		return alert(
			"Successfully sent email. Please check your email shortly"
		);
	} else {
		return alert(result.toString());
	}
}

async function resetPasswordRequest(username) {
	let res;

	var requestOptions = {
		method: "PUT",
		redirect: "follow",
	};

	await fetch(
		`${apiUrl}resetPasswordEmail?username=${username}`,
		requestOptions
	)
		.then((response) => response.json())
		.then((result) => {
			if (result.detail === "successfully sent the reset token!") {
				res = true;
			} else {
				res = result.detail;
			}
		})
		.catch((error) => console.log("error", error));

	return res;
}
