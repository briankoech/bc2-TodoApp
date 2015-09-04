var authenticate = new Authentication();

$("#register-submit").click(function () {
	var username = $("#regusername").val();
	var password = $("#regpassword").val();
	var confirmpswd = $("#confirm-password").val();

	var userObj = 
	{
		email: username,
		"password": password
	};

	var username = '';
	var pswd = '';


	authenticate.createUser(userObj);

});

$("#login-submit").click(function () {
	var username = $("#username").val();
	var pswd = $("#password").val();

	var userObj = 
	{
		"email" : username,
		"password": pswd
	};

	authenticate.loginWithPW(userObj);
	
});


