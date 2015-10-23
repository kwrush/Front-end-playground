$(document).ready(function() {

	var $win = $(window);
    var $navToggle = $('button.nav-toggle');
    var $nav = $('.navbar');
    var header = document.getElementById('header');
    
    /* Expand header when scroll to the top of page */
	(function() {
        var $h = $(header);
		var headerHeight = $h.height();

		$win.scroll(function() {
			var pos = $win.scrollTop();

			if (pos <= headerHeight / 3) {
				$h.removeClass('shrink');
			}
			else {
				$h.addClass('shrink');
			}
		});
	} ());
    
    /* Animate nav-toggle button, toggle navbar */
    (function() {
        $navToggle.click(function() {
            $(this).toggleClass('nav-toggle-x');
            
            $(this).hasClass('nav-toggle-x') ?               
                $nav.addClass('navbar-show') :
                $nav.removeClass('navbar-show');
        });
    } ());
	
});