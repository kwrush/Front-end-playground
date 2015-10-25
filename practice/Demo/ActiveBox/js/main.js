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

                if ($navToggle.hasClass('nav-toggle-x')) {

                    $navToggle.toggleClass('nav-toggle-x');
                    $nav.removeClass('navbar-show');
                }

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

    /* Slider */
    (function() {
        var timer = null;
        var $slideItem = $('.slides li');
        var $indicator = $('.slider-indicator li');

        /* auto play */
        function play() {

            stopPlay();

            timer = setInterval(function() {
                $slideItem.toggleClass('show-slide');
                $indicator.toggleClass('active-indicator');
            }, 10000);
        }
        play();

        // stop timer
        function stopPlay() {
            clearInterval(timer);
            timer = null;
        }

        // fire or stop timer when mouse leave or enter the slider
        $('.flex-slider').on(
                {
                    mouseenter: function() {
                        stopPlay();
                    },

                    mouseleave: function() {
                        play();
                    }
                }
            );

        // click on indicator
        $('.slider-indicator').on('click', $indicator, function(event) {
            var target = event.target;
            var index = target ? target.dataset.index : undefined;

            if(index) {
                $indicator.removeClass('active-indicator');
                $slideItem.removeClass('show-slide');

                $($slideItem[index]).addClass('show-slide');
                $($indicator[index]).addClass('active-indicator');

                play();
            }
        });      

    } ());

    /* Resize image with hover */
    /*(function() {
        $('.work a')
    } ());*/
	
});