var mock = {};

// Show/hide scripts based on buttons
$(".js-hide-show-button").click(function () {
    let  obj_id = "#" + this.id + "-section";
    if ($(obj_id).hasClass("hidden")) {
        $(this).html("hide script");
        $(obj_id).removeClass("hidden");
    }
    else {
        $(this).html("Not sure what to say?");
        $(obj_id).addClass("hidden");
    }
});

// subscribe form validation
$(document).ready(function () {
    var re_email = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var re_zip = /(^\d{5}$)|(^\d{5}-\d{4}$)/;

    $('#subscribe-form').submit(function () {
        // check if email is invalid
        if (!(re_email.test(this.elements["email"].value))) {
            $(this).find(':input[type=submit]').prop('disabled', true);
            $('#subscribe-error').html("Please input a valid password");
            return false;
        }
        else if (!(re_zip.test(this.elements["zip"].value))) {
            $(this).find(':input[type=submit]').prop('disabled', true);
            $('#subscribe-error').html("Please input a valid zip");
            return false;
        }
        else {
            $('#subscribe-error').html("");
            return true;
        }
    });
});


/*------------ Multi-step form -----------------*/
//jQuery time
var current_fs, next_fs, previous_fs; //fieldsets
var left, opacity, scale; //fieldset properties which we will animate
var animating; //flag to prevent quick multi-click glitches

$(".next").click(function () {

    if ($(this).hasClass("disabled")) {
        $("#postcard-error").empty().append(document.createTextNode(
            "Find your reps by selecting your completed address"
        ));
        $("#postcard-sen1").empty();
        $("#postcard-sen2").empty();
        $("#postcard-rep").empty();
        return false;
    }

    if (animating) return false;
    animating = true;

    if ( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
        $('html, body').animate({
            scrollTop: $("ul#progressbar").offset().top
        }, 800);
    }


    current_fs = $(this).parent();
    next_fs = $(this).parent().next();

    //activate next step on progressbar using the index of next_fs
    //    $("#progressbar li").eq($("fieldset").index(next_fs)).addClass("active");
    $(".progressbar-li").removeClass("active");
    $(".progressbar-li").eq($("fieldset").index(next_fs)).addClass("active");

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
});

$(".previous").click(function () {
    if (animating) return false;
    animating = true;

    current_fs = $(this).parent();
    previous_fs = $(this).parent().prev();

    //de-activate current step on progressbar
    //$("#progressbar li").eq($("fieldset").index(current_fs)).removeClass("active");

    $(".progressbar-li").removeClass("active");
    $(".progressbar-li").eq($("fieldset").index(previous_fs)).addClass("active");

    //show the previous fieldset
    previous_fs.show();
    //hide the current fieldset with style
    current_fs.animate({ opacity: 0 }, {
        step: function (now, mx) {
            //as the opacity of current_fs reduces to 0 - stored in "now"
            //1. scale previous_fs from 80% to 100%
            scale = 0.8 + (1 - now) * 0.2;
            //2. take current_fs to the right(50%) - from 0%
            left = ((1 - now) * 50) + "%";
            //3. increase opacity of previous_fs to 1 as it moves in
            opacity = 1 - now;
            current_fs.css({ 'left': left });
            previous_fs.css({ 'transform': 'scale(' + scale + ')', 'opacity': opacity, 'position': 'absolute' });
        },
        duration: 800,
        complete: function () {
            current_fs.hide();
            animating = false;
        },
        //this comes from the custom easing plugin
        easing: 'easeInOutBack'
    });
});
$(".postcard-img").click(function () {
    // once an image is selected, turn all selected off
    $(".postcard-img").removeClass('postcard-selected');

    // turn that image to be selected
    $(this).addClass('postcard-selected');

    // update hidden field 
    $("#postcard-front").val($(this).attr("alt"));
    // MOCK: update front image
    $("#postcard-mock-front").children('img').attr('src', "/img/postcard/" + $("#postcard-front").val() + "-sm.jpg");
    // MOCK: update back image
    $("#postcard-mock-back").children('img').attr('src', "/img/postcard/" + $("#postcard-front").val() + "-h1.png");

    return false;
})
// Validation for the initial postcard creation form
$('#postcard-story').on('change keyup paste', function () {
    var oldlength = parseInt($('#postcard-story-char span').html());
    var currentLength = $(this).val().length;
    if (currentLength == oldlength) return true;
    else $('#postcard-story-char span').html(300 - currentLength);
});
$("#postcard-form-validate").click(function () {
    // check if any forms are blank
    if (!($("#postcard-fname").val())) {
        $(this).find(':input[type=submit]').prop('disabled', true);
        $('#postcard-error-2').html("First name cannot be blank");
        return false;
    }
    if (!($("#postcard-lname").val())) {
        $(this).find(':input[type=submit]').prop('disabled', true);
        $('#postcard-error-2').html("Last name cannot be blank");
        return false;
    }
    if (!($("#postcard-email").val())) {
        $(this).find(':input[type=submit]').prop('disabled', true);
        $('#postcard-error-2').html("Email cannot be blank");
        return false;
    }

    var re_email = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    // check if email is invalid
    if (!(re_email.test($("#postcard-email").val()))) {
        $(this).find(':input[type=submit]').prop('disabled', true);
        $('#postcard-error-2').html("Please input a valid email");
        return false;
    }

    if ($('#postcard-story').val().length > 300) {
        $(this).find(':input[type=submit]').prop('disabled', true);
        $('#postcard-error-2').html("Story cannot be greater than 300 char");
        return false;
    }

    // OPEN TO THE NEXT SCREEN
    if (animating) return false;
    animating = true;

    if ( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
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
    $('.mock-fname').html($("#postcard-fname").val());
    $('.mock-linit').html($("#postcard-lname").val().substring(0, 1));
    $('#mock-story').html($("#postcard-story").val());
    if (!$.trim($("#mock-story").html())) $('#mock-story').html("I'm sending this postcard on behalf of Americas' healthcare.")

    return true;
});

$("#postcard-submit-friend").click(function () {
    window.open ('https://www.facebook.com/dialog/feed?app_id=1257081251043986&link=https://www.fightforhealthcare.org/friends/trumpcare-postcard-tsunami-rep?utm_source=facebook&utm_campaign=postcard_0&utm_medium=sharetopay', 'newwindow', config = 'height=400, width=600, toolbar=no, menubar=no, scrollbars=no, resizable=no, location=no, directories=no, status=no');
    return true;
});

// FIND YOUR REPRESENTATIVES
$("#postcard-address")
    .geocomplete()
    .bind("geocode:result", function (event, result) {
        // MOCK: Set the 'to' address information
        let  address = result.formatted_address.replace(/^\d+\s+/, '');
        $('.mock-address-line1').html(address.substr(0, address.indexOf(',')));
        $('.mock-address-line2').html(address.substr(address.indexOf(',') + 2, address.length));

        // loop through address_components and set value of addresses
        for (var i = 0; i < result.address_components.length; i++) {
            if (result.address_components[i].types[0] == "route") {
                $("#address-line1").val(result.address_components[i].short_name);
            }
            if (result.address_components[i].types[0] == "locality") {
                $("#address-city").val(result.address_components[i].long_name);
            }
            if (result.address_components[i].types[0] == "administrative_area_level_1") {
                $("#address-state").val(result.address_components[i].short_name);
            }
            if (result.address_components[i].types[0] == "postal_code") {
                $("#address-zip").val(result.address_components[i].short_name);
            }
        }

        /* FORM: Set the address of the individual
        console.log($("#address-line1").val());
        console.log($("#address-city").val());
        console.log($("#address-state").val());
        console.log($("#address-zip").val());
        */


        // Call on the Civic Information API
        gapi.client.setApiKey('AIzaSyAY6i_IaQ8wW-g1Vi96IDqMuEUkv_sCPg8');
        lookup(result.formatted_address, renderResults);
    });
$("#postcard-address").blur(function () {
    $("#postcard-address-button").addClass("disabled");

    $("#postcard-error").empty().append(document.createTextNode(
        "Find your reps by selecting your completed address"
    ));
    $("#postcard-sen1").empty();
    $("#postcard-sen2").empty();
    $("#postcard-rep").empty();
});

/**
 * Build and execute request to look up voter info for provided address.
 * @param {string} address Address for which to fetch voter info.
 * @param {function(Object)} callback Function which takes the
 *     response object as a parameter.
 */
function lookup(address, callback) {
    /**
     * Request object for given parameters.
     * @type {gapi.client.HttpRequest}
     */
    var req = gapi.client.request({
        'path' : '/civicinfo/v2/representatives',
        'params': {
            'key': 'AIzaSyAY6i_IaQ8wW-g1Vi96IDqMuEUkv_sCPg8',
            'levels': 'country',
            'address': address
        }
    });
    req.execute(callback);
}

/**
 * Render results in the DOM.
 * @param {Object} response Response object returned by the API.
 * @param {Object} rawResponse Raw response from the API.
 */
function renderResults(response, rawResponse) {

    var el = document.getElementById('postcard-results');
    if (!response || response.error) {
        $("#postcard-results").empty().append(document.createTextNode(
            "Could not find your reps. Please refresh the page."
        ));
        return;
    }
    // print out senator 1
    $("#postcard-error").empty();
    $("#postcard-sen1").empty().append(document.createTextNode(
        response.officials[2].name + ", Senator"
    ));
    // MOCK: set senator name and address
    $('.mock-rep-name').html(response.officials[2].name);
    $('.mock-rep-address-line1').html(response.officials[2].address[0].line1);
    $('.mock-rep-address-line2').html(response.officials[2].address[0].city + ", " + response.officials[2].address[0].state + " " + response.officials[2].address[0].zip);

    // FORM: Set the address of the individual
    $("#rep1-name").val("Senator " + response.officials[2].name);
    $("#rep1-address").val(response.officials[2].address[0].line1);
    $("#rep1-zip").val(response.officials[2].address[0].zip);

    // print out senator 2
    $("#postcard-sen2").empty().append(document.createTextNode(
        response.officials[3].name + ", Senator"
    ));
    // FORM: Set the address of the individual
    $("#rep2-name").val("Senator " + response.officials[3].name);
    $("#rep2-address").val(response.officials[3].address[0].line1);
    $("#rep2-zip").val(response.officials[3].address[0].zip);

    // print out representative
    if (!response.officials[4]) {
        $("#postcard-error").empty().append(document.createTextNode(
            "Address not specific enough to find representatives"
        ));
        $("#postcard-sen1").empty();
        $("#postcard-sen2").empty();
        $("#postcard-rep").empty();
    }
    else {
        $("#postcard-rep").empty().append(document.createTextNode(
            response.officials[4].name + ", Representative " + response.offices[3].name.replace("United States House of Representatives ", "")
        ));
        // activate button
        $("#postcard-address-button").removeClass("disabled");
    }
    // FORM: Set the address of the individual
    $("#rep3-name").val("Representative " + response.officials[4].name);
    $("#rep3-address").val(response.officials[4].address[0].line1);
    $("#rep3-zip").val(response.officials[4].address[0].zip);

    /* FORM: Set the address of the individual
    console.log($("#rep1-name").val());
    console.log($("#rep1-address").val());
    console.log($("#rep2-name").val());
    console.log($("#rep1-zip").val());
    console.log($("#rep2-zip").val());
    console.log($("#rep3-zip").val());*/

}

