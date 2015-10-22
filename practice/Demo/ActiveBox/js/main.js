$(document).ready(function() {

	var $win = $(window);
	var header = document.getElementById('header');

	(function() {
		var headerHeight = $(header).height();

		$win.scroll(function() {
			var pos = $win.scrollTop();

			if (pos <= headerHeight / 3) {
				$(header).removeClass('shrink');
			}
			else {
				$(header).addClass('shrink');
			}
		});

	} ());
	
});