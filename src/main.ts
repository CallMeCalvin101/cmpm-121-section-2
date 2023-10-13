import "./style.css";

// Grabs HTML elements of index.html
const dino: HTMLElement | null = document.getElementById("dino");
const cactus: HTMLElement | null = document.getElementById("cactus");
const bird: HTMLElement | null = document.getElementById("bird");
const scoreText: HTMLElement | null = document.getElementById("scoreText");

// Score Handeling
let score: number = 0;
const scoreRate: number = 0.5;

// Game Logic
let isJumping: boolean = false;
let gameOver: boolean = true;

// Collision Detecting Numbers
const dinoGroundHeight: number = 150;
const dinoSkyHeight: number = 55;
const cactusCollideDist: number = 7;
const birdCollideDist: number = 11;

// Initializes Game
setText("click to start!");
document.addEventListener("click", () => handleClickInput());

function mainLoop() {
  if (gameOver == false) {
    score += scoreRate;
    setText(`Score: ${score.toFixed(0)}`);
    checkGameOver();
  }
  window.requestAnimationFrame(mainLoop);
}

function handleClickInput() {
  if (gameOver) {
    window.requestAnimationFrame(mainLoop);
    startGame();
  } else {
    jump();
  }
}

function startGame() {
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
  setText(`Final Score: ${score.toFixed(0)}!   Click To Play Again!`);
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

function setText(s: string) {
  scoreText!.textContent = s;
}
