var myDataRef = new Firebase("https://todo-apps.firebaseio.com/");
$("#btnSave").click(function() {
	console.log("I have been Clicked");

	var taskId = 1;
	var taskTitle = $("#taskTitle").val();
	var taskDescription = $("#taskDescription").val();
	var dateCreated = "10-10-10";
	var dateUpdated = "10-10-10";
	var userId = 1;
	var visibility = true;
	var priority = 5;
	var actionDate = "10-10-2013";
	var reminderDate = "10-10-2013";

// May use push insted of set
	myDataRef.push(
	{
		taskId : taskId,
		taskTitle : taskTitle,
		taskDescription : taskDescription,
		dateCreated : dateCreated,
		dateUpdated : dateUpdated,
		userId : userId,
		visibility : true,
		priority : 5,
		actionDate : actionDate,
		reminderDate : actionDate
	});

	console.log("Data sent!!");
  
});




var wait = myDataRef.on('child_added', function(snapshot) {
		var mytask = snapshot.val();
		displayTask(mytask.taskTitle, mytask.taskDescription);	
});

function displayTask(title, desc) {
	// $("#high").prepend("<a href="#" class="list-group-item">"+ title+"</a>");
	console.log("Title: " + title + " Descreption: " + desc);
}

wait;
