// Validation for the initial postcard creation form
$('#postcard-story-trump').on('change keyup paste', function () {
	var oldlength = parseInt($('#postcard-story-char-trump span').html());
	var currentLength = $(this).val().length;
	if (currentLength == oldlength) return true;
	else $('#postcard-story-char-trump span').html(300 - currentLength);
});
$("#postcard-form-validate-trump").click(function () {
    console.log("boop");

	// check if any forms are blank
	if (!($("#postcard-fname-trump").val())) {
		$(this).find(':input[type=submit]').prop('disabled', true);
		$('#postcard-error-2-trump').html("First name cannot be blank");
		return false;
	}
	console.log("1");
	if (!($("#postcard-lname-trump").val())) {
		$(this).find(':input[type=submit]').prop('disabled', true);
		$('#postcard-error-2-trump').html("Last name cannot be blank");
		return false;
	}
	console.log("2");
    if (!($("#postcard-zip-trump").val())) {
		$(this).find(':input[type=submit]').prop('disabled', true);
		$('#postcard-error-2-trump').html("Zip cannot be blank");
		return false;
	}
	console.log("3");
	if (!($("#postcard-email-trump").val())) {
		$(this).find(':input[type=submit]').prop('disabled', true);
		$('#postcard-error-2-trump').html("Email cannot be blank");
		return false;
	}

	var re_email = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	// check if email is invalid
	if (!(re_email.test($("#postcard-email-trump").val()))) {
		$(this).find(':input[type=submit]').prop('disabled', true);
		$('#postcard-error-2-trump').html("Please input a valid email");
		return false;
	}
	console.log("4");

	if ($('#postcard-story-trump').val().length > 300) {
		$(this).find(':input[type=submit]').prop('disabled', true);
		$('#postcard-error-2-trump').html("Story cannot be greater than 300 char");
		return false;
	}
	console.log("5");

	// OPEN TO THE NEXT SCREEN
	if (animating) return false;
	animating = true;

	if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
		$('html, body').animate({
			scrollTop: $("ul#progressbar").offset().top
		}, 800);
	}

	current_fs = $(this).parent();
	next_fs = $(this).parent().next();

	//show the next fieldset
	next_fs.show();
	//hide the current fieldset with style
	current_fs.animate({ opacity: 0 }, {
		step: function (now, mx) {
			//as the opacity of current_fs reduces to 0 - stored in "now"
			//1. scale current_fs down to 80%
			scale = 1 - (1 - now) * 0.2;
			//2. bring next_fs from the right(50%)
			left = (now * 50) + "%";
			//3. increase opacity of next_fs to 1 as it moves in
			opacity = 1 - now;
			current_fs.css({ 'transform': 'scale(' + scale + ')', 'position': 'absolute' });
			next_fs.css({ 'left': left, 'opacity': opacity });
		},
		duration: 800,
		complete: function () {
			current_fs.hide();
			animating = false;
		},
		//this comes from the custom easing plugin
		easing: 'easeInOutBack'
	});

	// add in information
	$('.mock-fname').html($("#postcard-fname-trump").val());
	$('.mock-linit').html($("#postcard-lname-trump").val().substring(0,1));
    $('.mock-zip').html($("#postcard-zip-trump").val());
	$('#mock-story').html($("#postcard-story-trump").val());
	if (!$.trim($("#mock-story").html())) $('#mock-story').html("I'm sending this postcard on behalf of Americas' healthcare.")

	return true;
});

$("#postcard-submit-friend-trump").click(function () {
	window.open ('https://www.facebook.com/dialog/feed?app_id=1257081251043986&link=https://www.fightforhealthcare.org/ides-of-trump?utm_source=facebook&utm_campaign=ides&utm_medium=sharetopay', 'newwindow', config='height=400, width=600, toolbar=no, menubar=no, scrollbars=no, resizable=no, location=no, directories=no, status=no');
	return true;
});