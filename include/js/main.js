/*SCROLL PAGE TO TOP*/
$(document).ready(function() {
	$(".toTop").css("display", "none");

	$(window).scroll(function(){
		if($(window).scrollTop() > 0){$(".toTop").fadeIn("slow");} else {$(".toTop").fadeOut("slow");}
	});

	$(".toTop").click(function(event) {
		event.preventDefault();
		$("html, body").animate({scrollTop:0},"slow");
	});
});

/* var navHeight = $('#main_navbar').offset().top;
FixMegaNavbar(navHeight);
$(window).bind('scroll', function() {FixMegaNavbar(navHeight);});

function FixMegaNavbar(navHeight) {
	if (!$('#main_navbar').hasClass('navbar-fixed-bottom')) {
		if ($(window).scrollTop() > navHeight) {
			$('#main_navbar').addClass('navbar-fixed-top')
			$('#main_navbar').addClass('fixed-bg')
			
			
			if ($('#main_navbar').parent('div').hasClass('container')) $('#main_navbar').children('div').addClass('container').removeClass('container-fluid');
			
			else if ($('#main_navbar').parent('div').hasClass('container-fluid'))
			$('#main_navbar').children('div').addClass('container-fluid').removeClass('container');
		}
		else {
			$('#main_navbar').removeClass('navbar-fixed-top');
			$('#main_navbar').removeClass('fixed-bg')
			
			$('body').css({'margin-top': ''});
		}
	}
}
 */
$(document).ready(function(){
	$(".team-carousel").owlCarousel({
		margin:0,
		loop:true,
		dots:false,
		center:true,
		autoplayHoverPause:true,
		autoplay:true,
		responsive:{0:{items:1,},600:{ items:2,},1000:{items:3,},1300:{items:3,}}
	});
});


letterCarousel('.First','.big-title');
function letterCarousel(parent_cls,child_cls) {
	var e = jQuery(parent_cls+' '+child_cls),
	t = jQuery(window).height();
	jQuery(window).on("scroll", function() {
		if (jQuery(parent_cls).length) {
			var t = jQuery(document).scrollTop() + jQuery(window).height(),
			n = jQuery(parent_cls).offset().top;
			
			if (n <= t) {
				var i = jQuery(document).scrollTop() - n + jQuery(window).height();
				var scroll = i - (t - n) / 10;
				var scroll_slow = scroll + ((scroll/70)/100);
				var img_scroll = scroll_slow * 100 /100;
				e.css({
					transform: "translateX(" + -img_scroll + "px)"
				})
			}
		}
	});
}  

letterCarouselRight('.Second', '.big-title');
function letterCarouselRight(parent_cls, child_cls) {
	var e = jQuery(parent_cls + ' ' + child_cls);
	var winHeight = jQuery(window).height();

	jQuery(window).on("scroll", function() {
		if (jQuery(parent_cls).length) {
			var scrollBottom = jQuery(document).scrollTop() + winHeight;
			var elementTop = jQuery(parent_cls).offset().top;

			if (elementTop <= scrollBottom) {
				var i = jQuery(document).scrollTop() - elementTop + winHeight;
				var scroll = i - (scrollBottom - elementTop) / 10;
				var scroll_slow = scroll + ((scroll / 70) / 100);
				var img_scroll = scroll_slow * 100 / 100;
				e.css({
					transform: "translateX(" + img_scroll + "px)"
				});
			}
		}
	});
}
