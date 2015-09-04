// Fetch the userID(cookie) cookie from the browser
var userID = $.cookie('userID');

var myDataRef = new Firebase("https://todo-apps.firebaseio.com/users/" + userID);

$("#btnSave").click(function() {
	var date = new Date();

	var taskTitle = $("#taskTitle").val();
	var taskDescription = $("#taskDescription").val();
	var dateCreated = date.getTime();
	var dateUpdated = date.getTime();
	var visibility = true;
	var priority = $(".priorityCB:checked").val();
	var actionDate = $("#taskDate").val();
	var reminderDate = $("#remDate").val();

// push the object to the db: push sets a unique key for each entry
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
	alert("Task Added!");
  
});

myDataRef.child('tasks').on('value', function(snapshot) {
	// Clear data on the dom
		$("#tab1").html('');
		$("#tab2").html('');
		$("#tab3").html('');

		var mytask = snapshot.val();
		var key = snapshot.key();

		var low_count = 0;
		var medium_count = 0;
		var high_count = 0;

		for(var key in mytask) {

			var today = new Date();
			var actiondate = new Date(mytask[key].actionDate);
			var remdate = new Date(mytask[key].reminderDate);

			/*if((actiondate.getTime() - today.getTime()) <= 86400000){
				count++;
				console.log("co");
			}*/
			// console.log(today+ " : " + actiondate + " : " + remdate);
			var date1 = today;
			var date2 = actiondate;
			var date3 = remdate;

			// get time difference from today
			var timeDiffFromToday = Math.abs(date2.getTime() - date1.getTime());
			var diffFromToday = Math.ceil(timeDiffFromToday / (1000 * 3600 * 24));

			// get time difference from reminder date
			var timeDiffFromRem = Math.abs(date2.getTime() - date3.getTime());
			var diffFromRem = Math.ceil(timeDiffFromRem / (1000 * 3600 * 24));


			// check if action date is today
			
			// console.log('from today : '+ diffFromToday+' from reminder: '+diffFromRem);

			if (mytask[key].priority === "1") {

				if(diffFromToday == 0 || diffFromToday == 1 || diffFromToday == diffFromRem){
					// this is the task action date so increment the notification
					high_count++;
				}
			
				$("#tab1").prepend('<div class="row"><div class="col-md-11"><a  id="task" href="#" class="list-group-item"><div class="col-md-2">'+
														mytask[key].actionDate + '</div><div class="col-md-4">' + mytask[key].taskTitle + '</div><div class="col-md-6">' + mytask[key].taskDescription +'</div></a></div><div class="col-md-1"><button onclick="delete_data(\''+key+'\')" class="btn btn-danger btn-lg"><i class="fa fa-trash"></i></button></div></div>');
				
			}
			else if (mytask[key].priority === "2") {

				if(diffFromToday == 0 || diffFromToday == 1 || diffFromToday == diffFromRem){
					// this is the task action date so increment the notification
					medium_count++;
				}

				$("#tab2").prepend('<div class="row"><div class="col-md-11"><a  id="task" href="#" class="list-group-item"><div class="col-md-2">' + mytask[key].actionDate + '</div><div class="col-md-4">' + mytask[key].taskTitle + '</div><div class="col-md-6">' + mytask[key].taskDescription +'</div></a></div><div class="col-md-1"><button onclick="delete_data(\''+key+'\')" class="btn btn-danger btn-lg"><i class="fa fa-trash"></i></button></div></div>');
			} 
			else {
				if(diffFromToday == 0 || diffFromToday == 1 || diffFromToday == diffFromRem){
					// this is the task action date so increment the notification
					low_count++;
				}
				$("#tab3").prepend('<div class="row"><div class="col-md-11"><a  id="task" href="#" class="list-group-item"><div class="col-md-2">'+ mytask[key].actionDate + '</div><div class="col-md-4">' + mytask[key].taskTitle + '</div><div class="col-md-6">' + mytask[key].taskDescription +'</div></a></div><div class="col-md-1"><button onclick="delete_data(\''+key+'\')" class="btn btn-danger btn-lg"><i class="fa fa-trash"></i></button></div></div>');
			}
		}

		$('.high_p').html(high_count);
		$('.medium_p').html(medium_count);
		$('.low_p').html(low_count);
		$(".note").html(high_count + medium_count + low_count);

			
});


function clearFields() {
	$("#taskForm").trigger("reset");
}


/*
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

*/

function delete_data(key){
	
	myDataRef.child('tasks').child(key).remove(function(error) {
		if(error) {
			alert("Unable to delete");
		}
		else {
			alert("Deleted successfully");
		}
	});
}

function logout()
{
	$.removeCookie('userID');
	window.location.replace('./login.html');
}