
var tictactoe = {
    id : "tictactoe",
    source : "https://towkir.github.io/tictactoe/index.html#board",
    summary : "https://towkir.github.io/tictactoe/index.html#tictactoe",
    category : "games",
    controls : "https://towkir.github.io/tictactoe/index.html#controls"
};
var puzzle = {
    id : "puzzle",
    source : "https://towkir.github.io/puzzle/index.html#board",
    summary : "https://towkir.github.io/puzzle/index.html#puzzle",
    category : "games",
    controls : "https://towkir.github.io/puzzle/index.html#controls"
};


var rsp = {
    id : "rsp",
    source : "https://towkir.github.io/rockscissorpaper/index.html#board",
    summary : "https://towkir.github.io/rockscissorpaper/index.html#rsp",
    category : "games",
    controls : "https://towkir.github.io/rockscissorpaper/index.html#controls"
};

var projectsDictionary = [tictactoe, puzzle, rsp];

var stack = document.getElementById("stack");
var projectThumbs = stack.getElementsByClassName('project-thumb');
var chosenProject;

var projectFinder = function(){
    for (var i=0; i<projectsDictionary.length; i++){
        if (this.id == projectsDictionary[i].id) {
            chosenProject = projectsDictionary[i];
        }
    }
};

var showcase = document.getElementById("showcase");
var frames = showcase.getElementsByTagName("iframe");

var switchdata = function() {
    frames[0].src = chosenProject.source;
    frames[1].src = chosenProject.summary;
    frames[2].src = chosenProject.controls;
}

for (var i=0; i<projectThumbs.length; i++) {
    projectThumbs[i].addEventListener('click', projectFinder);
    projectThumbs[i].addEventListener('click', switchdata);
}