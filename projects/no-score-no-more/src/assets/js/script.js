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
        dots: false,
        loop: true,
        stagePadding: 30,
        responsive: {
            768: {
                items: 2,
                stagePadding: 10
            },
            991: {
                items: 3,
                stagePadding: 0
            }
        }
    });

});

// the scroll checker function itself ;p
function scrollChecker() {
    if (window.innerWidth < 768) {
        $('.navbar').find('.logo').find('img').attr('src', 'assets/img/logo-grey.png');
    } else {
        if ($(window).scrollTop() > 0) {
            $('.navbar').addClass('white');
            $('.navbar').find('.logo').find('img').attr('src', 'assets/img/logo-grey.png');
        } else {
            $('.navbar').removeClass('white');
            $('.navbar').find('.logo').find('img').attr('src', 'assets/img/logo.svg');
        }
    }
}