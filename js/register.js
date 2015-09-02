var ref = new Firebase("https://todo-apps.firebaseio.com/users");

function User(username, password){
	this.username = username;
	this.password = password;
}

// function getData() {
// 	// checkUsernameAvailability(username);
// }

function register(user) {
	console.log(user);
	var user_name = user.username;
	var pswd = user.password;

	var usersRef = ref.child(user_name);
	usersRef.set({
				username: user_name,
				password: pswd, 
				tasks: {title: "homepage"}	
		});
	console.log(user.username + " " + user.password + " registered");
}

$("#register-submit").click(function() {

	var username = $("#regusername").val();
	var password = $("#regpassword").val();
	var confirmpswd = $("#confirm-password").val();

	console.log(username + password);
	var user = new User(username, password);

	var reg = register(user);

	reg;

	alert("User added successfully. Now you can login");
});
