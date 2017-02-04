// function for enabling the take to top button (up button);
function scrollToTopButton() {
    if (window.scrollY >= 250) {
        document.getElementById("scroll-to-top").style = "right: 3%; opacity: 1;";
    } else {
        document.getElementById("scroll-to-top").style = "right: -3%; opacity: 0;";
    }
}
// call the function while scroll happens;
window.addEventListener("scroll", scrollToTopButton);
// take the viewport to top if I click the button:
document.getElementById("scroll-to-top").addEventListener("click", function(){window.scroll(0,0);});