$(function() {
	// $("#slider").slider();
	$("#slider").slider({
		value: 5,
		min: 1,
		max: 5,
		step: 1,
		slide: function(event, ui) {
			$("#priority").val(ui.value);
		}
	});
	$("#priority").val($("slider").slider("value"));
});
	
	
$(".taskItem").mouseover(function() {

});

$(".datetimepicker").datetimepicker();

$("#remCB").click(function() {
	if($(this).is(":checked")) {
		$("#reminder").show();
	} 
	else {
		$("#reminder").hide();
	}
});


