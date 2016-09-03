
var showContentButton = document.getElementById("showContentButton");

function showContent() {
  document.body.setAttribute("style", "background: #000000");
}
showContentButton.addEventListener("click", showContent);