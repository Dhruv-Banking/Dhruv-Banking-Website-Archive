const Transfer_Money_AnotherAccount = document.querySelector(
	"#DHR__Main-Transfer_Money_toAnotherUser"
);

Transfer_Money_AnotherAccount.addEventListener("submit", getData);

class AnotherUser {
	constructor(userFrom, userTo, amount, password, token) {
		this.userFrom = userFrom;
		this.userTo = userTo;
		this.amount = amount;
		this.password = password;
		this.token = token;
	}
}

async function getData() {
	let userTo = document.getElementById("Username").value;
	let amount = document.getElementById("AmountTransfer").value;
	let userFrom = window.sessionStorage.getItem("username");
	let token = window.sessionStorage.getItem("token");
	let password = window.sessionStorage.getItem("password");

	if (amount < 0) {
		return alert("Can not send money if it's less than 0.");
	}

	const user = new AnotherUser(userFrom, userTo, amount, password, token);

	let result = await transferMoneyAnotherUser(
		user.userFrom,
		user.userTo,
		user.amount,
		user.password,
		user.token
	);

	if (result !== true) {
		return alert(result);
	}

	alert("Successfully transfered money, please reload to see changes.");
}

async function transferMoneyAnotherUser(
	userFrom,
	userTo,
	amount,
	password,
	token
) {
	let success;

	var myHeaders = new Headers();
	myHeaders.append("Authorization", `Bearer ${token}`);
	myHeaders.append("Content-Type", "application/json");

	var raw = JSON.stringify({
		userTo: userTo,
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
		`${apiURL}transferToAnotherUser?userFrom=${userFrom}`,
		requestOptions
	)
		.then((response) => response.json())
		.then((result) => {
			if (
				result.detail !==
				`Successfully transferred ${amount} from '${userFrom}' to '${userTo}'`
			) {
				return (success = result.detail);
			}

			success = true;
		})
		.catch((error) => console.log("error", error));

	return success;
}
