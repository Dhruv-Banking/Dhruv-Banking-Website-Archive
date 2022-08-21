const Transfer_Money_sameAccount = document.querySelector(
	"#DHR__Main-Transfer_Money_sameAccount"
);

Transfer_Money_sameAccount.addEventListener("submit", getTransferData);

class User {
	constructor(username, password, amount, token) {
		this.username = username;
		this.password = password;
		this.amount = amount;
		this.token = token;
	}
}

async function getTransferData() {
	let selectFrom = document.getElementById("transferFrom");
	let valueFrom = selectFrom.options[selectFrom.selectedIndex].value;

	let selectTo = document.getElementById("transferTo");
	let valueTo = selectTo.options[selectTo.selectedIndex].value;

	let amount = document.getElementById("Amount").value;

	const user = new User(
		window.sessionStorage.getItem("username"),
		window.sessionStorage.getItem("password"),
		amount,
		window.sessionStorage.getItem("token")
	);

	if (valueFrom === valueTo) {
		alert(
			"Can not send money from from the same account as the account recieving."
		);
	}
	if (valueFrom === "Checkings" && valueTo === "Savings") {
		let result = await transferMoneyCheckingsToSavings(
			user.username,
			user.password,
			user.amount,
			user.token
		);

		if (result !== true) {
			return alert(result);
		}

		alert("Successfully transfered money, please reload to see changes.");
	} else if (valueFrom === "Savings" && valueTo === "Checkings") {
		let result = await transferMoneySavingToCheckings(
			user.username,
			user.password,
			user.amount,
			user.token
		);

		if (result !== true) {
			return alert(result);
		}

		alert("Successfully transfered money, please reload to see changes.");
	}
}

async function transferMoneyCheckingsToSavings(
	username,
	password,
	amount,
	token
) {
	let success;

	var myHeaders = new Headers();
	myHeaders.append("Authorization", `Bearer ${token}`);
	myHeaders.append("Content-Type", "application/json");

	var raw = JSON.stringify({
		amount: parseFloat(amount),
		password: password,
	});

	var requestOptions = {
		method: "PUT",
		headers: myHeaders,
		body: raw,
		redirect: "follow",
	};

	await fetch(
		`${apiURL}checkingsToSavings?username=${username}`,
		requestOptions
	)
		.then((response) => response.json())
		.then((result) => {
			if (
				result.detail !==
				`Successfully transferred ${amount} from checkings to savings`
			) {
				return (success = result.detail);
			}

			success = true;
		})
		.catch((error) => console.log("error", error));

	return success;
}

async function transferMoneySavingToCheckings(
	username,
	password,
	amount,
	token
) {
	let success;

	var myHeaders = new Headers();
	myHeaders.append("Authorization", `Bearer ${token}`);
	myHeaders.append("Content-Type", "application/json");

	var raw = JSON.stringify({
		amount: parseFloat(amount),
		password: password,
	});

	var requestOptions = {
		method: "PUT",
		headers: myHeaders,
		body: raw,
		redirect: "follow",
	};

	await fetch(
		`${apiURL}savingsToCheckings?username=${username}`,
		requestOptions
	)
		.then((response) => response.json())
		.then((result) => {
			if (
				result.detail !==
				`Successfully transered ${amount} from savings to checkings`
			) {
				return (success = result.detail);
			}

			success = true;
		})
		.catch((error) => console.log("error", error));

	return success;
}
