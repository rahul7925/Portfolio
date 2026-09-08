;(function () {
	
	'use strict';



	var isMobile = {
		Android: function() {
			return navigator.userAgent.match(/Android/i);
		},
			BlackBerry: function() {
			return navigator.userAgent.match(/BlackBerry/i);
		},
			iOS: function() {
			return navigator.userAgent.match(/iPhone|iPad|iPod/i);
		},
			Opera: function() {
			return navigator.userAgent.match(/Opera Mini/i);
		},
			Windows: function() {
			return navigator.userAgent.match(/IEMobile/i);
		},
			any: function() {
			return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
		}
	};

	var fullHeight = function() {

		if ( !isMobile.any() ) {
			
			
		}

	};


	var counter = function() {
		$('.js-counter').countTo({
			 formatter: function (value, options) {
	      return value.toFixed(options.decimals);
	    },
		});
	};


	var counterWayPoint = function() {
		if ($('#colorlib-counter').length > 0 ) {
			$('#colorlib-counter').waypoint( function( direction ) {
										
				if( direction === 'down' && !$(this.element).hasClass('animated') ) {
					setTimeout( counter , 400);					
					$(this.element).addClass('animated');
				}
			} , { offset: '90%' } );
		}
	};

	// Animations
	var contentWayPoint = function() {
		var i = 0;
		$('.animate-box').waypoint( function( direction ) {

			if( direction === 'down' && !$(this.element).hasClass('animated') ) {
				
				i++;

				$(this.element).addClass('item-animate');
				setTimeout(function(){

					$('body .animate-box.item-animate').each(function(k){
						var el = $(this);
						setTimeout( function () {
							var effect = el.data('animate-effect');
							if ( effect === 'fadeIn') {
								el.addClass('fadeIn animated');
							} else if ( effect === 'fadeInLeft') {
								el.addClass('fadeInLeft animated');
							} else if ( effect === 'fadeInRight') {
								el.addClass('fadeInRight animated');
							} else {
								el.addClass('fadeInUp animated');
							}

							el.removeClass('item-animate');
						},  Math.min(k * 50, 400) );
					});
					
				}, 100);
				
			}

		} , { offset: '85%' } );
	};


	var burgerMenu = function() {

		$('.js-colorlib-nav-toggle').on('click', function(event){
			event.preventDefault();
			var $this = $(this);

			if ($('body').hasClass('offcanvas')) {
				$this.removeClass('active');
				$('body').removeClass('offcanvas');	
			} else {
				$this.addClass('active');
				$('body').addClass('offcanvas');	
			}
		});



	};

	// Click outside of offcanvass
	var mobileMenuOutsideClick = function() {

		$(document).click(function (e) {
	    var container = $("#colorlib-aside, .js-colorlib-nav-toggle");
	    if (!container.is(e.target) && container.has(e.target).length === 0) {

	    	if ( $('body').hasClass('offcanvas') ) {

    			$('body').removeClass('offcanvas');
    			$('.js-colorlib-nav-toggle').removeClass('active');
			
	    	}
	    	
	    }
		});

		$(window).scroll(function(){
			if ( $('body').hasClass('offcanvas') ) {

    			$('body').removeClass('offcanvas');
    			$('.js-colorlib-nav-toggle').removeClass('active');
			
	    	}
		});

	};

	var clickMenu = function() {

		$('#navbar a:not([class="external"])').click(function(event){
			var section = $(this).data('nav-section'),
				navbar = $('#navbar');

				if ( $('[data-section="' + section + '"]').length ) {
					var targetOffset = $('[data-section="' + section + '"]').offset().top - 55;
					if ('scrollBehavior' in document.documentElement.style) {
						window.scrollTo({ top: targetOffset, behavior: 'smooth' });
					} else {
						$('html, body').animate({ scrollTop: targetOffset }, 500);
					}
			   }

		    if ( navbar.is(':visible')) {
		    	navbar.removeClass('in');
		    	navbar.attr('aria-expanded', 'false');
		    	$('.js-colorlib-nav-toggle').removeClass('active');
		    }

		    event.preventDefault();
		    return false;
		});


	};

	// Reflect scrolling in navigation
	var navActive = function(section) {

		var $el = $('#navbar > ul');
		$el.find('li').removeClass('active');
		$el.each(function(){
			$(this).find('a[data-nav-section="'+section+'"]').closest('li').addClass('active');
		});

	};

	var navigationSection = function() {

		var $section = $('section[data-section]');
		
		$section.waypoint(function(direction) {
		  	
		  	if (direction === 'down') {
		    	navActive($(this.element).data('section'));
		  	}
		}, {
	  		offset: '150px'
		});

		$section.waypoint(function(direction) {
		  	if (direction === 'up') {
		    	navActive($(this.element).data('section'));
		  	}
		}, {
		  	offset: function() { return -$(this.element).height() + 155; }
		});

	};






	var sliderMain = function() {
		
	  	$('#colorlib-hero .flexslider').flexslider({
			animation: "fade",
			slideshow: true,
			slideshowSpeed: 5000,
			animationSpeed: 800,
			directionNav: false,
			controlNav: true,
			touch: true,
			pauseOnHover: false,
			pauseOnAction: false,
			start: function(){
				setTimeout(function(){ $('.slider-text').removeClass('animated fadeInUp'); $('.flex-active-slide').find('.slider-text').addClass('animated fadeInUp'); }, 100);
			},
			before: function(){
				setTimeout(function(){ $('.slider-text').removeClass('animated fadeInUp'); $('.flex-active-slide').find('.slider-text').addClass('animated fadeInUp'); }, 100);
			}
	  	});

		// Optional dot click/touch navigation without interrupting loop
		$(document).on('click touchend', '#colorlib-hero .flex-control-nav li a, #colorlib-hero .flex-control-nav li', function(e) {
			e.preventDefault();
			var $target = $(this).is('a') ? $(this) : $(this).find('a');
			var targetIndex = $target.parent().index();
			var slider = $('#colorlib-hero .flexslider').data('flexslider');
			if (slider && targetIndex !== slider.currentSlide) {
				slider.flexAnimate(targetIndex, false);
				slider.play();
			}
		});

	};

	
	
		// Lazy load and play videos on scroll
	var initVideoObserver = function() {
		if ('IntersectionObserver' in window) {
			var videoObserver = new IntersectionObserver(function(entries, observer) {
				entries.forEach(function(entry) {
					if (entry.isIntersecting) {
						var video = entry.target;
						if (video.hasAttribute('data-src')) {
							video.src = video.getAttribute('data-src');
							video.removeAttribute('data-src');
						}
						video.play().catch(function(){});
					} else {
						entry.target.pause();
					}
				});
			}, { rootMargin: "0px 0px 200px 0px" });
			
			$('.lazy-video').each(function() {
				videoObserver.observe(this);
			});
		}
	};
		// Dynamic Motion Tilt Cards (Scoped strictly to Skills section)
	var initTilt = function() {
		if (typeof VanillaTilt !== 'undefined') {
			VanillaTilt.init(document.querySelectorAll(".modern-skill-card"), {
				max: 14,
				speed: 500,
				perspective: 1000,
				scale: 1.04,
				glare: true,
				"max-glare": 0.22,
				gyroscope: true
			});
		}
	};
	// Document on load.
	$(function(){
		fullHeight();
		counter();
		counterWayPoint();
		contentWayPoint();
		burgerMenu();

		clickMenu();
		// navActive();
		navigationSection();
		// windowScroll();


		mobileMenuOutsideClick();
		initVideoObserver();
		initTilt();
		sliderMain();
	});


}());








