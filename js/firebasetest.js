
var userID = "88b51674-0138-4140-90ee-4fcee712ef26";

var myDataRef = new Firebase("https://todo-apps.firebaseio.com/users/" + userID);

$("#btnSave").click(function() {
	console.log("I have been Clicked");
	var date = new Date();

	var taskId = 1;
	var taskTitle = $("#taskTitle").val();
	var taskDescription = $("#taskDescription").val();
	var dateCreated = date.getTime();
	var dateUpdated = date.getTime();
	var userId = 1;
	var visibility = true;
	var priority = $(".priorityCB:checked").val();
	var actionDate = $("#taskDate").val();
	var reminderDate = $("#remDate").val();

// May use push instead of set
	var myref = myDataRef.child('tasks');
	myref.push(
	{
		taskId : taskId,
		taskTitle : taskTitle,
		taskDescription : taskDescription,
		dateCreated : dateCreated,
		dateUpdated : dateUpdated,
		userId : userId,
		visibility : true,
		priority : priority,
		actionDate : actionDate,
		reminderDate : actionDate
	});
	clearFields();
	console.log("Data sent!!");
  
});

myDataRef.child('tasks').on('value', function(snapshot) {
		$("#tab1").html('');
		$("#tab2").html('');
		$("#tab3").html('');
		var mytask = snapshot.val();
		var key = snapshot.key();
		// console.log(mytask);

		for(var key in mytask){
			// console.log(mytask[key].taskTitle, mytask[key].taskDescription, mytask[key].priority);
			if (mytask[key].priority === "1") {
				console.log(mytask[key].taskTitle, mytask[key].taskDescription, mytask[key].priority)
				
				$("#tab1").prepend('<a  id="task" onClick=taskmodal("'+ key +'") class="list-group-item"><div class="row"><div class="col-md-4">' + mytask[key].actionDate +'</div><div class="col-md-4">' + mytask[key].taskTitle+ '</div><div class="col-md-4">' +mytask[key].reminderDate+ '</div></div></a>');

			}
			else if (mytask[key].priority === "2") {
				console.log(mytask[key].taskTitle, mytask[key].taskDescription, mytask[key].priority)
				$("#tab2").prepend('<a  id="task" href="#" class="list-group-item"><div class="row"><div class="col-md-4">' + mytask[key].actionDate +'</div><div class="col-md-4">' + mytask[key].taskTitle+ '</div><div class="col-md-4">' + mytask[key].reminderDate+ '</div></div></a>');

			} 
			else {
				console.log(mytask[key].taskTitle, mytask[key].taskDescription, mytask[key].priority);
				$("#tab3").prepend('<a  id="task" href="#" class="list-group-item"><div class="row"><div class="col-md-4">' + mytask[key].actionDate +'</div><div class="col-md-4">' + mytask[key].taskTitle+ '</div><div class="col-md-4">' + mytask[key].reminderDate+ '</div></div></a>');
			}
		}

			
});
//wait;


var updateObj = function(key, obj) {
	myDataRef.child(key).update(obj, function(error) {
		if(error) {
			console.log("error occurred");
			return false;
		} 
		else {
			console.log("Update successful");
			return true;
		}
	});
};

var deleteObj = function(key) {
	myDataRef.child(key).remove(function(error) {
		if(error) {
			console.log("Error on deleton" + error);
			return false;
		} else{
			console.log("Deleted successfully!");
			return true;
		}
	});


};

function clearFields() {
	$("#taskForm").trigger("reset");
}
