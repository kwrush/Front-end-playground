$(document).ready(function() {

	var $win = $(window);
    var $navToggle = $('button.nav-toggle');
    var $nav = $('.navbar');
    var header = document.getElementById('header');

    /* Scroll to the selected anchor in navigation */
    (function() {
    	$('.navmenu a[href^="#"]').on('click', function(event) {

    		var target = $(this.hash);

    		if (target.length) {

    			event.preventDefault();

    			var $html = $('html, body');

    			// 75 is the general difference before and after we modify 
    			// the padding of the header
    			$html.animate({
    				scrollTop: target.offset().top - 75
    			}, 600);
    		}
    	});
    } ());

    
    /* Expand header when scroll to the top of page */
	(function() {
        var $h = $(header);
		var headerHeight = $h.height();

		$win.scroll(function() {
			var pos = $win.scrollTop();

			if (pos <= 35) {
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