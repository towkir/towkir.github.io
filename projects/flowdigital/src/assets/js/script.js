"use strict";
$(document).ready(function ($) {
    // scroll checker function for the header styling
    scrollChecker();
    // carousel loader
    $('.strategy-carousel').owlCarousel({
        items: 1
    });
    // typedjs initialization
    var typed = new Typed('.words', {
        strings: ["Do Digital", "Love Strategy", "Innovate Solutions", "Are Flow"],
        typeSpeed: 60,
        backDelay: 1000,
        backSpeed: 80,
        loop: true,
        showCursor: false
    });
    // scroll checker function when window is scrolled
    $(window).scroll(scrollChecker);

    // adding jquery smooth scrolling
    $('a').smoothScroll();
    // enabling bootstrap navbar menu click auto hiding
    $(document).on('click','.navbar-collapse.in',function(e) {
        if( $(e.target).is('a') ) {
            $(this).collapse('hide');
        }
    });
});


// the scroll checker function itself ;p
function scrollChecker() {
    if ($(window).scrollTop() > 0) {
        $('.navbar').addClass('white');
        $('.navbar li').find('img').attr('src', 'assets/img/logo-blue.svg');
    } else {
        $('.navbar').removeClass('white');
        $('.navbar li').find('img').attr('src', 'assets/img/logo-white.svg');
    }
}