$(function () {
	// $("#slider").slider();
	$("#slider").slider( {
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
	

$(".datetimepicker").datetimepicker();

$("#remCB").click(function () {
	if($(this).is(":checked")) {
		$("#reminder").show();
	} 
	else {
		$("#reminder").hide();
	}
});


$(function () {

    $('#login-form-link').click(function(e) {
		$("#login-form").delay(100).fadeIn(100);
 		$("#register-form").fadeOut(100);
		$('#register-form-link').removeClass('active');
		$(this).addClass('active');
		e.preventDefault();
	});
	$('#register-form-link').click(function(e) {
		$("#register-form").delay(100).fadeIn(100);
 		$("#login-form").fadeOut(100);
		$('#login-form-link').removeClass('active');
		$(this).addClass('active');
		e.preventDefault();
	});

});

