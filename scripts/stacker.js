/*
    this script manages the functionalities of the the items in the portfolio stack .......
*/
var container = document.getElementById("stack");
var boxes = container.getElementsByClassName("project-thumb");

var stacker = function() {
    var maxIndex = boxes.length;
    var moveLeft = 10;
    for (var i=0; i<boxes.length; i++) {
        boxes[i].style.zIndex = maxIndex;
        boxes[i].style.left = moveLeft + "px";
        boxes[i].initialLeft = parseInt(boxes[i].style.left);
        maxIndex--;
        moveLeft += boxes[0].offsetWidth/ (window.innerWidth > 500 ? 2 : 4);
    }
};

var slideEffect = function(){
    this.style.left = this.initialLeft + this.offsetWidth/ (this.initialLeft == 10 ? 5 : 2.5) + "px";
};

var slideEffectRevert = function(){
    this.style.left = this.initialLeft + "px";
};

var applySlide = function(){
    //we need to re-align the stack items before applying the slide-effect each time;
    stacker();
    for (var i=0; i<boxes.length; i++) {
        boxes[i].addEventListener('mouseover', slideEffect);
        boxes[i].addEventListener('mouseout', slideEffectRevert);
    }
};

window.addEventListener('load', applySlide);
window.addEventListener('resize', applySlide);