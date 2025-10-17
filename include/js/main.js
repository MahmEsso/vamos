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





const hotspots = document.getElementById('hotspots');
const bigLabel = document.getElementById('bigLabel');

const isArabic = document.documentElement.getAttribute('dir') === 'rtl';

function markerLabel(m) {
	// prefer arabicName when page direction is RTL/Arabic and arabicName exists
	if (isArabic && m.arabicName) return m.arabicName;
	return m.name;
}

function createMarker(m) {
	const dot = document.createElement('button');
	dot.className = 'dot';
	dot.style.left = m.x + '%';
	dot.style.top  = m.y + '%';
	const label = markerLabel(m);
	dot.setAttribute('aria-label', label);
	dot.title = label; // hint
	dot.addEventListener('click', () => onMarkerClick(m));
	dot.addEventListener('keydown', (e) => {
		if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onMarkerClick(m); }
	});

	const tip = document.createElement('div');
	tip.className = 'tooltip';
	tip.textContent = label;

	hotspots.appendChild(dot);
	hotspots.appendChild(tip);
}

function onMarkerClick(m){
	// مثال: إظهار لابل كبيرة + تنفيذ أكشن
	showLabel(m);
	// افتح لينك/مودال… إلغاء التعليق حسب حاجتك
	// window.location.href = m.url;
	// أو dispatch event:
	// document.dispatchEvent(new CustomEvent('map:marker', { detail: m }));
}

function showLabel(m){
	bigLabel.style.left = m.x + '%';
	bigLabel.style.top  = (m.y - 5) + '%'; // ارفعها شوي فوق النقطة
	const label = markerLabel(m);
	// if the label is Arabic, don't force uppercase (to avoid breaking Arabic script)
	bigLabel.querySelector('span').textContent = isArabic ? label : label.toUpperCase();
	bigLabel.style.display = 'flex';
}

// رسم كل النقاط
MARKERS.forEach(createMarker);

/* // مثال: إظهر “ALGERIA” في البداية (اختياري)
showLabel(MARKERS.find(d => d.id === 'algeria')); */

// إغلاق اللابل
bigLabel.querySelector('.label-close').addEventListener('click', () => {
	bigLabel.style.display = 'none';
});

// تحكّم في حجم النقاط (اختياري)
const root = document.documentElement.style;
document.getElementById('bigger').onclick  = () => root.setProperty('--dot-size',  (parseInt(getComputedStyle(document.documentElement).getPropertyValue('--dot-size')) + 4) + 'px');
document.getElementById('smaller').onclick = () => root.setProperty('--dot-size',  Math.max(8, parseInt(getComputedStyle(document.documentElement).getPropertyValue('--dot-size')) - 4) + 'px');

// دعم لمس: إخفاء/إظهار التولتيب بالضغط خارجها
document.addEventListener('click', (e)=>{
	if(!e.target.classList.contains('dot') && !bigLabel.contains(e.target)){
		bigLabel.style.display = 'none';
	}
}, {capture:true});