var authenticate = new Authentication();

$("#register-submit").click(function(){
	var username = $("#regusername").val();
	var password = $("#regpassword").val();
	var confirmpswd = $("#confirm-password").val();

	var userObj = {
		email: username,
		"password": password
	};

	var username = '';
	var pswd = '';


	authenticate.createUser(userObj);
	console.log(authenticate.isLoggedIn());

});

$("#login-submit").click(function() {
	var username = $("#username").val();
	var pswd = $("#password").val();

	var userObj = {
		"email" : username,
		"password": pswd
	};

	authenticate.loginWithPW(userObj);
	console.log(authenticate.userID);
	// if(authenticate.isLoggedIn){
	// 	console.log(authenticate.userID);
	// 	window.location.replace("./home.html?" + authenticate.isLoggedIn[1]);
	// } else {
	// 	location.reload();
	// }
	
});

function taskmodal(key) {
	$("#taskModal").modal();
};