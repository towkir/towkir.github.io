
var container = document.getElementById("stack");
var boxes = container.getElementsByClassName("project-thumb");

var maxIndex = boxes.length;
var moveLeft = 0;

thumbEffect = function() {
    var currentStyle = window.getComputedStyle(this);
    var currentLeftPos = parseInt(currentStyle.getPropertyValue('left'));
    if (currentLeftPos % parseInt(this.offsetWidth/3) == 0) {
        this.style.left = currentLeftPos + this.offsetWidth / 3 + "px";
        this.addEventListener('mouseout', function(){this.style.left = currentLeftPos + "px";});
    }
};

stacker = function() {
    if (window.innerWidth > 800) {
        for (var i=0; i<boxes.length; i++) {
            boxes[i].style.zIndex = maxIndex;
            boxes[i].style.left = moveLeft + "px";
            maxIndex--;
            moveLeft -= boxes[0].offsetWidth/3;
            boxes[i].addEventListener('mouseover', thumbEffect);
        }
    }
};


window.addEventListener('load',stacker);
//window.addEventListener('resize',stacker);


