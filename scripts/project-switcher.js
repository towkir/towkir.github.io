
var tictactoe = {
    id : "tictactoe",
    source : "projects/tictactoe/index.html#board",
    summary : "projects/tictactoe/index.html#tictactoe",
    category : "games",
    controls : "projects/tictactoe/index.html#controls"
};
var puzzle = {
    id : "puzzle",
    source : "projects/puzzle/index.html#board",
    summary : "projects/puzzle/index.html#puzzle",
    category : "games",
    controls : "projects/puzzle/index.html#controls"
};


var rsp = {
    id : "rsp",
    source : "projects/rockscissorpaper/index.html#board",
    summary : "projects/rockscissorpaper/index.html#rsp",
    category : "games",
    controls : "projects/rockscissorpaper/index.html#controls"
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

function switchdata(){
    frames[0].src = chosenProject.source;
    frames[1].src = chosenProject.summary;
    frames[2].src = chosenProject.controls;
}

for (var i=0; i<projectThumbs.length; i++) {
    projectThumbs[i].addEventListener('click', projectFinder);
    projectThumbs[i].addEventListener('click', switchdata);
}