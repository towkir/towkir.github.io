"use strict";
$(document).ready(function ($) {
    // carousel loader
    $('.carousel-container').owlCarousel({
        items: 1,
        autoplay: true,
        loop: true,
        nav: true,
        navText: [ '', '' ]
    });
    // adding jquery smooth scrolling
    $('a').smoothScroll({
        offset: -130
    });
});
