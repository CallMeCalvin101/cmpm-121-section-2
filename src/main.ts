import "./style.css";

// Grabs HTML elements of index.html
const dino: HTMLElement | null = document.getElementById("dino");
const cactus: HTMLElement | null = document.getElementById("cactus");
const cactor: HTMLElement | null = document.getElementById("cactor");
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
document.addEventListener("mousedown", () => handleClickInput());

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
    addJump();
  }
}

function startGame() {
  gameOver = false;
  score = 0;
  cactus?.classList.add("cactusMove");
  cactor?.classList.add("cactorMove");
  bird?.classList.add("birdMove");
}

function addJump() {
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
  cactor?.classList.remove("cactorMove");
  bird?.classList.remove("birdMove");
}

function endGame() {
  setText(`Final Score: ${score.toFixed(0)}!   Click To Play Again!`);
  gameOver = true;
  removeJump();
  removeObstacles();
}

function calculatePosition(object: HTMLElement, area: string): number {
  return parseInt(window.getComputedStyle(object).getPropertyValue(area));
}

function checkGameOver() {
  if (
    !gameOver &&
    dino != null &&
    cactus != null &&
    bird != null &&
    cactor != null
  ) {
    //detect cactus collision
    if (
      calculatePosition(dino, "top") >= dinoGroundHeight &&
      Math.abs(calculatePosition(cactus, "left")) < cactusCollideDist
    ) {
      endGame();
    }

    if (
      calculatePosition(dino, "top") >= dinoGroundHeight &&
      Math.abs(calculatePosition(cactor, "left")) < cactusCollideDist
    ) {
      endGame();
    }

    //detect bird collision
    if (
      calculatePosition(dino, "top") <= dinoSkyHeight &&
      Math.abs(calculatePosition(bird, "left")) < birdCollideDist
    ) {
      endGame();
    }
  }
}

function setText(s: string) {
  scoreText!.textContent = s;
}
