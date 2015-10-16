$(document).ready(function() {
	$("a.test-link").click(function(event) {
		alert("click on a link!");
		event.preventDefault();

		$(this).removeClass('alt-a');
		$(this).hide('slow');
	});

	$('a.test-link').addClass('alt-a');


	var t = $('#target'),
		ul = $('ul.menu');

	t.click(function() {
		/*ul.toggle('slow', function() {
			console.log('toggle done!!!');
		});*/
		ul.slideToggle('easeOutCubic');
	});
});