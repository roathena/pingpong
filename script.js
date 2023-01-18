var player1Score = 0;
var player2Score = 0;
var player1Speed = 0;
var player2Speed = 0;
var player1 = document.getElementById("player1");
var player2 = document.getElementById("player2");
var ball = document.querySelector(".ball");
var ballX = 400;
var ballY = 300;
var ballSpeedX = 2;
var ballSpeedY = 2;
var gamePaused = false;
var maxScore = 5;
var winner = "";

document.onkeydown = function (e) {
    console.log(e);
    if (e.keyCode == 32) {
        console.log(gamePaused);
        if (gamePaused) {
            gamePaused = false;
        } else {
            gamePaused = true;
        }
    }
    if (e.keyCode == 87) {
        player1Speed = -5;
    }
    if (e.keyCode == 83) {
        player1Speed = 5;
    }
    if (e.keyCode == 38) {
        player2Speed = -5;
    }
    if (e.keyCode == 40) {
        player2Speed = 5;
    }
}


function updateScore() {
    document.getElementById("player1-score").innerHTML = player1Score;
  document.getElementById("player2-score").innerHTML = player2Score;
  if(player1Score === maxScore){
      winner = "Player 1 wins!";
      gamePaused = true;
  }
  if(player2Score === maxScore){
      winner = "Player 2 wins!";
      gamePaused = true;
  }
  if(gamePaused){
    document.getElementById("winner").innerHTML = winner;
  }
}

function movePaddles() {
    var paddleTop = player1.offsetTop + player1Speed;
    if (paddleTop >= 0 && paddleTop + 100 <= 600) {
        player1.style.top = paddleTop + "px";
    }
    paddleTop = player2.offsetTop + player2Speed;
    if (paddleTop >= 0 && paddleTop + 100 <= 600) {
        player2.style.top = paddleTop + "px";
    }
}

function moveBall() {
    ballX += ballSpeedX;
    ballY += ballSpeedY;
    ball.style.left = ballX + "px";
    ball.style.top = ballY + "px";
}

function checkCollision() {
    // check collision with player1 paddle
    if (ballX <= 30 && ballY >= player1.offsetTop && ballY <= player1.offsetTop + 100) {
        ballSpeedX = -ballSpeedX;
    }
    // check collision with player2 paddle
    if (ballX >= 770 && ballY >= player2.offsetTop && ballY <= player2.offsetTop + 100) {
        ballSpeedX = -ballSpeedX;
    }
    // check collision with top and bottom of game area
    if (ballY <= 0 || ballY >= 540) {
        ballSpeedY = -ballSpeedY;
    }
    // check collision with left and right of game area
    if (ballX <= 0) {
        player2Score++;
        updateScore();
        resetBall();
    }
    if (ballX >= 790) {
        player1Score++;
        updateScore();
        resetBall();
    }
}

function resetBall() {
    ballX = 400;
    ballY = 300;
    ballSpeedX = -ballSpeedX;
    ballSpeedY = 5;
}



function gameLoop() {
    if (!gamePaused) {
        movePaddles();
        moveBall();
        checkCollision();
        setTimeout(gameLoop, 10);
    }
}

window.onload = function () {
    gameLoop();
}
