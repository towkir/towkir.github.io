//we need a function to set the target attribute to blank on the body of the page,
//but not on footer or header;
var content = document.getElementById("wrapper");
var allLinks = content.getElementsByTagName("a");
function setBlankTarget() {
  for (i=0; i<allLinks.length; i++){
    allLinks[i].setAttribute("target","_blank");
  }
}

window.addEventListener("load", setBlankTarget);

//lets toggle the portfolio dashboard;
var portfolioSwitch = document.getElementById("portfolio_button");
var dashboard = document.getElementById("portfolio_board");
var dashboardVisibility = "hidden";
function toggleBoard() {
  if (dashboardVisibility == "hidden") {
    dashboard.style = "top: 8%;";
    dashboardVisibility = "shown";
  } else if (dashboardVisibility == "shown") {
    dashboard.style = "top: -200%;";
    dashboardVisibility = "hidden";
  } else {
    return false;
  }
}
portfolioSwitch.addEventListener("click", toggleBoard);
//the up arrow too should hide the portfolio dashboard;
document.getElementById("hide_button").addEventListener("click", toggleBoard);
var projectThumbs = document.getElementsByClassName("project_grid");
function toggleShowCasesOnThumbClick() {
  document.getElementById("portfolio_showcase").style = "top: 1200px;";
  document.getElementById("project_details").style = "top: 100px;";  
}
function toggleShowCaseOnMenuItemClick(){
  document.getElementById("portfolio_showcase").style = "top: 100px;";
  document.getElementById("project_details").style="top: 1200px;";
}

// realization at a later time, we need to create the project window and a details window
// dynamically while clicking these thumbs. so will loop and add both
// toggleShowCase and createIframes together, find createIframes to see how it works;

// Ok, thats enough, iframe and object has pissed me off for a long. Lets solve with JS;
// oh, wait, we are creating them by javascript right ? then we need some objects
// so that each thumbs shows their own values on iframes;

var tictactoe = document.getElementById("tictactoe");
tictactoe.id = "tictactoe";
tictactoe.source = "projects/tictactoe/tictactoe.html#board";
tictactoe.summary = "projectindex/projects.html#tictactoe";
tictactoe.category = "games";
tictactoe.controls = "projects/tictactoe/tictactoe.html#controls";

var puzzle = document.getElementById("puzzle");
puzzle.id = "puzzle";
puzzle.source = "projects/puzzle/puzzle.html#board";
puzzle.summary = "projectindex/projects.html#puzzle";
puzzle.category = "games";
puzzle.controls = "projects/puzzle/puzzle.html#controls";

var rsp = document.getElementById("rsp");
rsp.id = "rsp";
rsp.source = "projectindex/projects.html#demoImage";
rsp.summary = "projectindex/projects.html#rsp";
rsp.category = "games";
rsp.controls = "";

var u_demo_1 = document.getElementById("u_demo_1");
u_demo_1.id = "u_demo_1";
u_demo_1.source = "projectindex/projects.html#demoImage";
u_demo_1.summary = "projectindex/projects.html#demo";
u_demo_1.category = "utility";

var u_demo_2 = document.getElementById("u_demo_2");
u_demo_2.id = "u_demo_2";
u_demo_2.source = "projectindex/projects.html#demoImage";
u_demo_2.summary = "projectindex/projects.html#demo";
u_demo_2.category = "utility";

var u_demo_3 = document.getElementById("u_demo_3");
u_demo_3.id = "u_demo_3";
u_demo_3.source = "projectindex/projects.html#demoImage";
u_demo_3.summary = "projectindex/projects.html#demo";
u_demo_3.category = "utility";

var o_demo_1 = document.getElementById("o_demo_1");
o_demo_1.id = "o_demo_1";
o_demo_1.source = "projectindex/projects.html#demoImage";
o_demo_1.summary = "projectindex/projects.html#demo";
o_demo_1.category = "other";

var o_demo_2 = document.getElementById("o_demo_2");
o_demo_2.id = "o_demo_2";
o_demo_2.source = "projectindex/projects.html#demoImage";
o_demo_2.summary = "projectindex/projects.html#demo";
o_demo_2.category = "other";
// need an array of those objects for looping through;
var projectList = [tictactoe, puzzle, rsp, u_demo_1, u_demo_2, u_demo_3, o_demo_1, o_demo_2];
// end of object list; 
var iframeContainer = document.getElementById("project_details");
var projectWindow = document.createElement("iframe");
var projectSummary = document.createElement("iframe");
var projectControls = document.createElement("iframe");
function createIframes(){
  var choosenProject;
  for (i=0; i<projectList.length; i++){
    if (this.getAttribute("id") == projectList[i].id){
      choosenProject = projectList[i];
    }
  }
  if (iframeContainer.hasChildNodes() === true){
    while (iframeContainer.firstChild) {
      iframeContainer.removeChild(iframeContainer.firstChild);
    }
  }
  // the in page project loader iframe;
  projectWindow.setAttribute("id", "project_window");
  projectWindow.setAttribute("src", choosenProject.source); // change the URL
  projectWindow.setAttribute("frameBorder", "0");
  projectWindow.setAttribute("scrolling", "no");
  iframeContainer.appendChild(projectWindow);
  // another one that contains short details;
  projectSummary.setAttribute("id", "project_summary");
  projectSummary.setAttribute("src", choosenProject.summary); // change the URL
  projectSummary.setAttribute("frameBorder", "0");
  projectSummary.setAttribute("scrolling", "no");
  iframeContainer.appendChild(projectSummary);
  // and one more for controlling game projects;
  if (choosenProject.category == "games") {
    projectControls.setAttribute("id", "project_controls");
    projectControls.setAttribute("src", choosenProject.controls); // change the URL
    projectControls.setAttribute("frameBorder", "0");
    projectControls.setAttribute("scrolling", "no");
    iframeContainer.appendChild(projectControls); // this line leaves a div created and does not delete this
                                            // so, we delete this project control each time while starting
  } else {
    //iframeContainer.removeChild(projectControls);
  }
}

// Now these two iframes will be ready as soon as the project thumbnails are clicked;
// and we will run toggleShowCases too, as we said earlier;
for (i=0;i<projectThumbs.length;i++) {
  projectThumbs[i].addEventListener("click", toggleShowCasesOnThumbClick);
  projectThumbs[i].addEventListener("click", createIframes);
}

// the project category navigation items will bring the showcase up no matter what;
// and set the selected items background color to white and color to black; #FFFFFF & #000000 actually;
var ribbon = document.getElementsByClassName("ribbon")[0];
var ribbon_items = ribbon.getElementsByTagName("li"); // an array holding all the nav menus;
// most importantly it will filter projects by selected category;
function filterProjects() {
  toggleShowCaseOnMenuItemClick(); // whenever a project details board is open, it will toggle:
  var selectedCategoryId = "";     // as soon as a nav menu is clicked;
  for (i=0; i<ribbon_items.length; i++) { //this loop resets all items default color and -
    ribbon_items[i].style = "color: #FFFFFF; background: transparent;";
  }
  this.style = "color: #000000; background: rgba(255,255,255,0.5);"; //and this sets the active items highlighted;
  // lets filter categories now
  selectedCategoryId = this.id;
  if (selectedCategoryId == "all") {
    for (i=0; i<projectThumbs.length; i++) {
      projectThumbs[i].style = "display: inline";
    }
  } else {
    for (i=0; i<projectThumbs.length; i++) {
    projectThumbs[i].style = "display: inline";
    if (selectedCategoryId != projectThumbs[i].category) {
      projectThumbs[i].style = "display: none";
      }    
    }    
  }  
}
  
// calling filterProjects while clicking on the navigation menubar items;
for (i=0;i<ribbon_items.length;i++) {
  ribbon_items[i].addEventListener("click", filterProjects);
}
