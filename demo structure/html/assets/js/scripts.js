jQuery = jQuery.noConflict();
var KSCAPE = {
	init: function() {
		// init code goes here
		//HTML5 Sementic elements
		document.createElement("header");
		document.createElement("nav");
		document.createElement("main");
		document.createElement("figure");
		document.createElement("footer");

		// Links with role button: Add click functionality when enter pressed
		KSCAPE.buttonSpace();
	},

	/*
	Function Name : KSCAPE.buttonSpace
	Creates button behavior in links with button role
	@version: 10-09-2019 updated
	*/
	buttonSpace: function() {		
		
	},
};

// when the page is ready, initialize everything
jQuery(document).on('ready', function() {
	KSCAPE.init();
});


$('.owl-carousel').owlCarousel({
    loop:true,
    items:1,
    dot:true,
    margin:10,
    nav:true,
})
$(function () {
	$('#datetimepicker5').datetimepicker({
		defaultDate: "11/1/2013",
		disabledDates: [
			moment("12/25/2013"),
			new Date(2013, 11 - 1, 21),
			"11/22/2013 00:53"
		]
	});
});