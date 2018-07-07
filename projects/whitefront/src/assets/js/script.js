"use strict";
$(document).ready(function ($) {

    // scroll checker function for the header styling
    scrollChecker();

    // scroll checker function when window is scrolled
    $(window).scroll(scrollChecker);

    // enabling bootstrap navbar menu click auto hiding
    $(document).on('click','.navbar-collapse.in',function(e) {
        if($(e.target).is('a')) {
            $(this).collapse('hide');
        }
    });

    // testimonial carousel initialization
    $('.testimonial-carousel').owlCarousel({
        items: 1,
        dots: true,
        loop: true
    });

});

// the scroll checker function itself ;p
function scrollChecker() {
    if (window.innerWidth > 768) {
        if ($(window).scrollTop() > 0) {
            $('.navbar').addClass('white');
        } else {
            $('.navbar').removeClass('white');
        }
    } else {
        $('.navbar').addClass('white');
    }
}