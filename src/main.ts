//purposely bad code so students can fix it - can make it worse

import "./style.css";

const dino: HTMLElement | null = document.getElementById("dino");
const cactus: HTMLElement | null = document.getElementById("cactus");
const bird: HTMLElement | null = document.getElementById("bird");

const scoreText: HTMLElement | null = document.getElementById("scoreText");
let score: number = 0;
SetText("click to start!");

var isJumping: boolean = false;
let gameOver: boolean = true;

const dinoGroundHeight: number = 150;
const dinoSkyHeight: number = 55;
const cactusCollideDist: number = 7;
const birdCollideDist: number = 11;

document.addEventListener("click", () => handleClickInput());

setInterval(function () {
  main();
}, 10);

function main() {
  if (gameOver == false) {
    score = score + 1;
    SetText(`Score: ${score}`);

    checkGameOver();
  }
}
function handleClickInput() {
  if (gameOver) {
    startGame();
  } else {
    jump();
  }
}

function startGame() {
  console.log("Game started!");
  gameOver = false;
  score = 0;
  cactus?.classList.add("cactusMove");
  bird?.classList.add("birdMove");
}

function jump() {
  if (!isJumping) {
    isJumping = true;
    dino?.classList.add("jump");
    setTimeout(removeJump, 500);
  }
}

function removeJump() {
  dino?.classList.remove("jump");
  isJumping = false;
}

function removeObstacles() {
  cactus?.classList.remove("cactusMove");
  bird?.classList.remove("birdMove");
}

function endGame() {
  console.log("Player Died!");
  SetText(`Final Score: ${score}!   Click To Play Again!`);
  gameOver = true;
  removeJump();
  removeObstacles();
}

function checkGameOver() {
  if (!gameOver && dino != null && cactus != null && bird != null) {
    //get is dinosaur jumping
    let dinoTop = parseInt(
      window.getComputedStyle(dino).getPropertyValue("top")
    );

    //get cactus position
    let cactusleft = parseInt(
      window.getComputedStyle(cactus).getPropertyValue("left")
    );

    //get bird position
    let birdleft = parseInt(
      window.getComputedStyle(bird).getPropertyValue("left")
    );

    //detect cactus collision
    if (
      dinoTop >= dinoGroundHeight &&
      Math.abs(cactusleft) < cactusCollideDist
    ) {
      endGame();
    }

    //detect bird collision
    if (dinoTop <= dinoSkyHeight && Math.abs(birdleft) < birdCollideDist) {
      endGame();
    }
  }
}

function SetText(s: string) {
  if (scoreText) {
    scoreText.textContent = s;
  }
}
