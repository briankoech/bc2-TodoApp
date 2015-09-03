
var userID = "88b51674-0138-4140-90ee-4fcee712ef26";

var myDataRef = new Firebase("https://todo-apps.firebaseio.com/users/" + userID);

$("#btnSave").click(function() {
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
		taskTitle : taskTitle,
		taskDescription : taskDescription,
		dateCreated : dateCreated,
		dateUpdated : dateUpdated,
		visibility : true,
		priority : priority,
		actionDate : actionDate,
		reminderDate : reminderDate
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
				
				$("#tab1").prepend('<a  id="task" onClick=taskmodal("'+ key +'") class="list-group-item"><div class="row"><div class="col-md-4">' + mytask[key].actionDate +'</div><div class="col-md-4">' + mytask[key].taskTitle+ '</div><div class="col-md-4">' +mytask[key].reminderDate+ '</div></div></a>');

			}
			else if (mytask[key].priority === "2") {
				$("#tab2").prepend('<a  id="task" onClick=taskmodal("'+ key +'") class="list-group-item"><div class="row"><div class="col-md-4">' + mytask[key].actionDate +'</div><div class="col-md-4">' + mytask[key].taskTitle+ '</div><div class="col-md-4">' + mytask[key].reminderDate+ '</div></div></a>');

			} 
			else {
				$("#tab3").prepend('<a  id="task" onClick=taskmodal("'+ key +'") class="list-group-item"><div class="row"><div class="col-md-4">' + mytask[key].actionDate +'</div><div class="col-md-4">' + mytask[key].taskTitle+ '</div><div class="col-md-4">' + mytask[key].reminderDate+ '</div></div></a>');
			}
		}

			
});
//wait;

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

function taskmodal(key) {

	console.log(key);
	 $("#taskmodal").modal();
	console.log("modal is shown");
	myDataRef.child('tasks').child("'"+key+"'").on('value', function(snapshot) {
		var showntask = snapshot.val();
		console.log("this is "+showntask);
		$("#modalTaskTitle").append('<input type="text" class="form-control" id="taskTitle" value="'+  +'">');
		$("#modalTaskDescription").append('<textarea class="form-control" id="taskDescription" value="'+ +'"></textarea>');
		$("#modalActionDate").append('<input type="text" class="form-control" id="actionDate" value="'+ +'">');
		$("#modalReminderDate").append('<input type="text" class="form-control" id="reminderDate" value="'+ +'">');

	});
};


$("#btnupdate").click(function() {
	var taskTitle = $("#title").val();
	var taskDescription = $("#description").val();
	var dateUpdated = date.getTime();
	var userId = 1;
	var visibility = true;
	var priority = $(".priorityCB:checked").val();
	var actionDate = $("#actiondate").val();
	var reminderDate = $("#reminderdate").val();

	var key;

	var updatedTask = {
		taskTitle : taskTitle,
		taskDescription : taskDescription,
		dateUpdated : dateUpdated,
		actionDate : actionDate,
		reminderDate : reminderDate
	};

	myDataRef.child('tasks').child("'"+key+"'").update(updatedTask, function(error) {
		if(error){
			alert("Error on update");
		} 
		else {
			alert("Updated successfully");
		}
	});
});

$("#btndelete").click(function() {
	var key;
	myDataRef.child('tasks').child("'"+ key +"'").remove(function(error) {
		if(error) {
			alert("Unable to delete");
		}
		else {
			alert("Delete successful");
		}
	});

});

function reminder() {
	var date = new Date();

	

}