

//creating an array of the slides
var slide = document.getElementsByClassName("box");
var blank = slide[Math.sqrt(slide.length) - 1];  // to identify the blank slide 
var root = Math.sqrt(slide.length);
for (var i=0; i<slide.length; i++){
  slide[i].frameNumber = i+1;
  slide[i].coOrdinate = i+1;  // this changes with the slide position . it is never constant !!!
}

var slideTraced = function(number){
  for (var a=0; a<slide.length; a++){
    if (slide[a].coOrdinate == number){
      return slide[a];
    }
  }
};

//this function scatters the slides randomly when window loads.....
var randomization = function(){
   var movementOrder = [1, root, -1, -root];
 for (var i=0; i<=100; i++){
   var guestPosition = blank.coOrdinate + (movementOrder[Math.floor(Math.random() * movementOrder.length)]);
     if (guestPosition > 0 && guestPosition <= slide.length){
       var guest = slideTraced(guestPosition);
   var left = blank.coOrdinate;
   var right = guest.coOrdinate;
      if (left % root === 0 && right % root === 1){
      i--;
      } else if (left % root === 1 && right % root === 0){
      i--;
      } else {
      var swPos = guest.getAttribute("style");
      var swPosBl = blank.getAttribute("style");
      guest.coOrdinate = left;
      blank.coOrdinate = right;
      guest.setAttribute("style",swPosBl);
      blank.setAttribute("style",swPos);
          }
     } else {
     i--;
     }
   }
};
//calls randomization function on loading window and scatters the slides...
//window.addEventListener("load", randomization);


//this is a function for changing slide positions on user click....
var changePosition = function(){
  var left = this.coOrdinate;
  var right = blank.coOrdinate;
  var possibility = left - right;
  if (possibility == 1 || possibility == -1 || possibility == root || possibility == -root){ 
    if (left % root === 1 && right % root === 0){
      return false;
    } else if (left % root === 0 && right % root === 1) {
      return false;
    } else {
      var swapped = this.coOrdinate;
      var swPos = this.getAttribute("style");
      var swPosBl = blank.getAttribute("style");
      this.coOrdinate = blank.coOrdinate;
      blank.coOrdinate = swapped;
      this.setAttribute("style",swPosBl);
      blank.setAttribute("style",swPos);
    }
  }
};

//applies changePosition function on all of the slides...
for (var i=0; i<slide.length; i++){
  slide[i].addEventListener("click", changePosition);
}


var currently;
function shuffleAndReset() {
  if (currently === undefined) {
    randomization();
    currently = "shuffled";
  } else {
    location.reload(true);
  }
}

document.body.addEventListener("dblclick", shuffleAndReset);
