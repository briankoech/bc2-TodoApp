function Task () {
	
	this.taskId = 1;
	this.taskTitle = $("#taskTitle").val();
	this.taskDescription = $("#taskDescription").val();
	this.dateCreated = date.getTime();
	this.dateUpdated = date.getTime();
	this.userId = 1;
	this.visibility = true;
	this.priority = $(".priorityCB:checked").val();
	this.actionDate = $("#taskDate").val();
	this.reminderDate = $("#remDate").val();
	this.username = "brian";
}