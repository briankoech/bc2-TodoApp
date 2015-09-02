var mydataref = new Firebase("https://todo-apps.firebaseio.com/users");


function authenticateUser(name, pswd) {
	console.log("Least");
	var myname = name;
	var mypswd = pswd, passed = 1;

	var myref = mydataref.child(myname); 
	myref.once("value", function(snapshot) {
		var user = snapshot.val();

		console.log(user.username+ " " + user.password);
		console.log(myname+ " " + mypswd);
		if((user.username) === myname && (user.password) === mypswd){
			
			passed = 2;
			console.log(passed);
		}

		return (passed === 2 )? true: false;
	});

	
}


$("#login-submit").click(function() {

	var username = $("#username").val();
	var password = $("#password").val();

	var myref = mydataref.child(username);

	myref.once("value", function(snapshot) {
		var user = snapshot.val();

		console.log(user.username+ " " + user.password);
		console.log(myname+ " " + mypswd);
		if((user.username) === myname && (user.password) === mypswd){
			
			window.location.replace("http://google.com");
		}

		alert("wrong password");
	});

	
});

