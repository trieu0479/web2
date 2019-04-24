(function($) {
	"use strict"

	// Fixed Nav
	var lastScrollTop = 0;
	$(window).on('scroll', function() {
		var wScroll = $(this).scrollTop();
		if ( wScroll > $('#nav').height() ) {
			if ( wScroll < lastScrollTop ) {
				$('#nav-fixed').removeClass('slide-up').addClass('slide-down');
			} else {
				$('#nav-fixed').removeClass('slide-down').addClass('slide-up');
			}
		}
		lastScrollTop = wScroll
	});

	// Search Nav
	$('.search-btn').on('click', function () {
		$('.search-form').addClass('active');
	});

	$('.search-close').on('click', function () {
		$('.search-form').removeClass('active');
	});

	// Aside Nav
	// $(document).click(function(event) {
	// 	if (!$(event.target).closest($('#nav-aside')).length) {
	// 		if ( $('#nav-aside').hasClass('active') ) {
	// 			$('#nav-aside').removeClass('active');
	// 			$('#nav').removeClass('shadow-active');
	// 		} else {
	// 			if ($(event.target).closest('.aside-btn').length) {
	// 				$('#nav-aside').addClass('active');
	// 				$('#nav').addClass('shadow-active');
	// 			}
	// 		}
	// 	}
	// });

	// $('.nav-aside-close').on('click', function () {
	// 	$('#nav-aside').removeClass('active');
	// 	$('#nav').removeClass('shadow-active');
	// });

	// Sticky Shares
	var $shares = $('.sticky-container .sticky-shares'),
	$sharesHeight = $shares.height(),
	$sharesTop,
	$sharesCon = $('.sticky-container'),
	$sharesConTop,
	$sharesConleft,
	$sharesConHeight,
	$sharesConBottom,
	$offsetTop = 80;

	function setStickyPos () {
		if ($shares.length > 0) {
			$sharesTop = $shares.offset().top
			$sharesConTop = $sharesCon.offset().top;
			$sharesConleft = $sharesCon.offset().left;
			$sharesConHeight = $sharesCon.height();
			$sharesConBottom = $sharesConHeight + $sharesConTop;
		}
	}

	function stickyShares (wScroll) {
		if ($shares.length > 0) {
			if ( $sharesConBottom - $sharesHeight - $offsetTop < wScroll ) {
				$shares.css({ position: 'absolute', top: $sharesConHeight - $sharesHeight , left:0});
			} else if ( $sharesTop < wScroll + $offsetTop ) {
				$shares.css({ position: 'fixed', top: $offsetTop, left: $sharesConleft });
			} else {
				$shares.css({position: 'absolute', top: 0, left: 0});
			}
		}
	}

	$(window).on('scroll', function() {
		stickyShares($(this).scrollTop());
	});

	$(window).resize(function() {
		setStickyPos();
		stickyShares($(this).scrollTop());
	});

	setStickyPos();

})(jQuery);

//---------------------Menu
jQuery(document).ready(function () {
    jQuery('.menu-box .main-menu>li.menu-item-has-children>a').append('<i class="fa fa-angle-down"></i>');
    jQuery('.menu-box .main-menu .sub-menu>li.menu-item-has-children>a').append('<i class="fa fa-angle-right"></i>');

    jQuery('.menu-site .btn-show-menu').click(function () {
        jQuery(this).parents('.menu-site').find('.menu-box').css('width','100%');
    });
    jQuery('.menu-box .btn-hide-menu, .menu-box .bg-menu').click(function () {
        jQuery(this).parents('.menu-box ').css('width','0');
    });

    if($(window).width()<992){
        jQuery('.main-menu li.menu-item-has-children>a>i').click(function (e) {
            e.preventDefault();
            jQuery(this).parent().parent().children('.sub-menu').slideToggle('fast');
        });
    }

	$(window).on('scroll', function() {
		
		var menutop= jQuery('body,html').scrollTop();
		console.log(menutop);
		if (menutop >= 250){
			jQuery('.menu-site').addClass('buido');
		}else{
			jQuery('.menu-site').removeClass('buido');
			
		}
	});
    
    jQuery('.treeview-item>a').on("click",function(e){
            e.preventDefault();
            jQuery(this).parent().children('.sub-treeview').slideToggle('fast');
        });
});