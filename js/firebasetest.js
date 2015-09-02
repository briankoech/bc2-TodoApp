var myDataRef = new Firebase("https://todo-apps.firebaseio.com/users/brian/tasks");
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
	var username = "brian";

// May use push instead of set
	myDataRef.push(
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
		reminderDate : actionDate,
		username : username
	});

	clearFields();
	console.log("Data sent!!");
  
});


var wait = myDataRef.on('child_added', function(snapshot) {
		var mytask = snapshot.val();
		console.log(mytask +"on: " + mytask.taskTitle + " " + mytask.taskDescription);
		displayTask(mytask.taskTitle, mytask.taskDescription, mytask.priority);	
});

function displayTask(title, desc, priority) {

	if(priority === "1") {
		$("#tab1").prepend('<a href="#" class="list-group-item"><h4>'+ title+'</h4> <p> '+ desc+'</p>'+'</a>');
		console.log("Title: " + title + " Discreption: " + desc);
	}
	else if(priority === "2") {
		$("#tab2").prepend('<a href="#" class="list-group-item"><h4>'+ title+'</h4> <p> '+ desc+'</p>'+'</a>');
		console.log("Title: " + title + " Discreption: " + desc);
	}
	else if(priority === "3"){
		$("#tab3").prepend('<a href="#" class="list-group-item"><h4>'+ title+'</h4> <p> '+ desc+'</p>'+'</a>');
		console.log("Title: " + title + " Discreption: " + desc);
	} 
	else {
		alert("No priority");
	}
	
	
}

//wait;

function clearFields() {
	$("#taskForm").trigger("reset");
}
