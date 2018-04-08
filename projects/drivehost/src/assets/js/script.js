"use strict";
$(document).ready(function ($) {

    // adding jquery smooth scrolling
    $('a').smoothScroll({
        offset: -60
    });
    // enabling bootstrap navbar menu click auto hiding
    $(document).on('click','.navbar-collapse.in',function(e) {
        if($(e.target).is('a')) {
            $(this).collapse('hide');
        }
    });

    $('.carousel-testimonials').owlCarousel({
        loop: true,
        nav: true,
        items: 1,
        navText: [ '', '' ]
    });
});
