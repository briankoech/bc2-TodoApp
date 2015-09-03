function Authentication() {
	var ref = new Firebase("https://todo-apps.firebaseio.com/");

	this.user = ref.getAuth();

	this.userID;

	var saveNewUser = function(userObj) {
		console.log("Niko hapa");
		ref.child('users').child(userObj.id).set(userObj);

	};

	this.isLoggedIn = function() {
		return  !! [ref.getAuth(), userID];
	};

	this.loginWithPW = function (userObj) {

		ref.authWithPassword(userObj, function(err, authData) {
			if(err){
				console.log("Error!");
				return "wrong pswd";
			} else {
				authData.email = userObj.email;
				this.user = authData;

				//set userID to authData.uid;
				this.userID = authData.uid;
				console.log(this.userID);
			
				//callback on register and cdobReg()
				// cbOnReg && cbOnReg(true);
			}
		}.bind(this));

	};

	// create user method(user registration)
	this.createUser = function (user) {
		ref.createUser(user, function(error, userData) {
			if(error) {
				switch (error.code) {
					case "EMAIL_TAKEN":
						console.log("THe new user account can't be created coz email is already used.");
						break;
					case "INVALID_EMAIL":
						console.log("The specified email is invalid");
						break;
					default:
						console.log("Error creating the user", error);

				}
			} else {
				console.log(userData);
				//save uid to db;
				var x = userData.uid;
				ref.child('users').child(x).set({tasks : {
					task1 : {
						title : "task1",
						description : "task1"
					},
					task2 : {
						title : "task2",
						description: "desc 2"
					}
				}});

				// call login function
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