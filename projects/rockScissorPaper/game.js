// lets get started with fetching some DOMs here;
// bot and player need to be rotated randomly
var bot = document.getElementById("bot"), player = document.getElementById("player");
var left = document.getElementById("left"), right = document.getElementById("right");
var playerRotation = 0, botRotation = 180, botSpin = 0;
var playerChoosed = "", botChoosed = ""; // values will be initialized by upcoming functions;

function rotatePlayerLeft() { // left rotatoin is a positive rotation angel;
  playerRotation += 120;
  player.style = "transform: rotate(" + playerRotation + "deg);";
}

function rotatePlayerRight(){ // right roation is negative angel;
  playerRotation -= 120;
  player.style = "transform: rotate(" + playerRotation + "deg);";
}

left.addEventListener("click", rotatePlayerLeft);
right.addEventListener("click", rotatePlayerRight);
// lets set variables for the doms rock, scissor and paper;
// won't use any separate variables, can access them by index number; exmpl [0] = rock; [1] = scissor; [2] = paper;
playerChoice = document.getElementsByClassName("playerChoice"); // an array of players choice;
botChoice = document.getElementsByClassName("botChoice"); // and bot choice;

// rotating the bot will use random angel values and randomly positive or negative;
rotationDirection = [1, -1];
function rotateBot() {
  botSpin = Math.floor(Math.random()*9) * rotationDirection[Math.floor(Math.random()*rotationDirection.length)];
  botRotation += botSpin * 120;
  // calculation is like [some random number within 9 * 120 * +1 or -1] ;
  bot.style = "transform: rotate(" + botRotation + "deg);";
  playerChoosed = this.id;
}

// a function for waiting a 0.8 sec and then reload the page;
function waitAndReload() {
  setTimeout(function(){location.reload();}, 800);
}

// before we apply bot rotation on playerChoices, we need the wincheck function too;
function winCheck() {
  // to get the botChoosed option, spin number doesn't help here; we will check if elements are in viewport;
  // and decide what has the bot choosen;
  for (i=0;i<botChoice.length;i++){
    if (botChoice[i].getBoundingClientRect().left > 0 && botChoice[i].getBoundingClientRect().top > 0) {
      botChoosed = botChoice[i].id;
    } else {
      // left empty;
    }
  }
  // now that we know what has the bot and the player choosen, we can check for the winner:
  if (playerChoosed == botChoosed) {
    if (playerChoosed == "rock" && botChoosed == "rock") {
      playerChoice[0].style = "background-image: url('images/rock_lost.svg');";
      botChoice[0].style = "background-image: url('images/rock_lost.svg');";
    } else if (playerChoosed == "scissor" && botChoosed == "scissor") {
      playerChoice[1].style = "background-image: url('images/scissor_lost.svg');";
      botChoice[1].style = "background-image: url('images/scissor_lost.svg');";
    } else if (playerChoosed == "paper" && botChoosed == "paper") {
      playerChoice[2].style = "background-image: url('images/paper_lost.svg');";
      botChoice[2].style = "background-image: url('images/paper_lost.svg');";
    } else {
      // left empty;
    }
    setTimeout(function(){alert("Its a tie !!");}, 500); // waiting for the transition (image changing);
    waitAndReload();
  } else if (playerChoosed == "rock" && botChoosed == "scissor") {
      playerChoice[0].style = "background-image: url('images/rock_won.svg');";
      botChoice[1].style = "background-image: url('images/scissor_lost.svg');";
      setTimeout(function(){alert("You Win !!");}, 500); // same as said earlier;
      waitAndReload();
  } else if (playerChoosed == "scissor" && botChoosed == "paper") {
      playerChoice[1].style = "background-image: url('images/scissor_won.svg');";
      botChoice[2].style = "background-image: url('images/paper_lost.svg');";
      setTimeout(function(){alert("You Win !!");}, 500);
      waitAndReload();
  } else if (playerChoosed == "paper" && botChoosed == "rock") {
      playerChoice[2].style = "background-image: url('images/paper_won.svg');";
      botChoice[0].style = "background-image: url('images/rock_lost.svg');";
      setTimeout(function(){alert("You Win !!");}, 500);
      waitAndReload();
  } else {
    if (playerChoosed == "rock") {
      playerChoice[0].style = "background-image: url('images/rock_lost.svg');";
      botChoice[2].style = "background-image: url('images/paper_won.svg');";
      setTimeout(function(){alert("You Lose !!");}, 500);
      waitAndReload();
    } else if (playerChoosed == "scissor") {
      playerChoice[1].style = "background-image: url('images/scissor_lost.svg');";
      botChoice[0].style = "background-image: url('images/rock_won.svg');";
      setTimeout(function(){alert("You Lose !!");}, 500);
      waitAndReload();
    } else {
      playerChoice[2].style = "background-image: url('images/paper_lost.svg');";
      botChoice[1].style = "background-image: url('images/scissor_won.svg');";
      setTimeout(function(){alert("You Lose !!");}, 500);
      waitAndReload();
    }
  }
}

function waitBeforeWinCheck() {setTimeout(winCheck, 1600);} // because the transition of the bot and player
  // takes 1.5 second, we should wait till then, after the transition, we calculate their positions to get the correct value;
  // infact, we start at 1.6 second which is 1600ms ;

//applying botRotation on playerChoice:
for (i=0; i<playerChoice.length; i++) {
  playerChoice[i].addEventListener("click", rotateBot);
  playerChoice[i].addEventListener("click", waitBeforeWinCheck);
}
