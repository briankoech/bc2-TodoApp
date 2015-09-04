function Authentication() {
	var ref = new Firebase("https://todo-apps.firebaseio.com/");

	this.user = ref.getAuth();

	this.userID;

	var saveNewUser = function (userObj) {

		ref.child('users').child(userObj.id).set(userObj);
	};

	this.isLoggedIn = function() {
		return  !! [ref.getAuth(), userID];
	};

	this.loginWithPW = function (userObj) {

		ref.authWithPassword (userObj, function(err, authData) {
			if(err) {
				alert("Wrong email/password combination");
			} 
			else {
				this.user = authData;

				//set userID to authData.uid;
				this.userID = authData.uid;
				
				//set cookie to save the session && redirect the user
				$.cookie('userID', this.userID, { expires: 2 });
				window.location.replace('./home.html');
			}
		}.bind(this));

	};

	// create user method(user registration)
	this.createUser = function (user) {
		ref.createUser(user, function(error, userData) {
			if(error) {
				switch (error.code) {
					case "EMAIL_TAKEN":
						alert("THe new user account can't be created coz email is already used.");
						break;
					case "INVALID_EMAIL":
						alert("The specified email is invalid");
						break;
					default:
						alert("Error creating the user", error);

				}
			} 
			else {
				//save uid to db and add child tasks;
				var uid = userData.uid;
				ref.child('users').child(uid).set( { tasks : {} });

				// call login function to automatically login the user
				this.loginWithPW(user);
			}
		}.bind(this));
	};

	// logout
	this.logout = function() {
		ref.unauth();
		this.cacheUser = null;
		return true;
	};

}
