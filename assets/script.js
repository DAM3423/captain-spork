// Variables
var asteroidInterval; // Used to store the interval for creating asteroids
var asteroidSpeed = 5; // Initial speed
var gameContainer = document.getElementById("game-container");
var asteroidCounter = 0;
var rocket = document.getElementById("rocket");
var rocketSpeed = 10; // Adjust the rocket speed as needed
var rocketPosition = (gameContainer.offsetWidth - rocket.offsetWidth) / 2; // Initialize at the middle
var modal = document.getElementById("modal");
var isPaused = false;
var scoreElement = document.getElementById("score");

// Create an asteroid element
function createAsteroid() {
  var asteroid = document.createElement("div");
  asteroid.classList.add("asteroid");

  // Generate a random left position
  var containerWidth = gameContainer.offsetWidth;
  var asteroidWidth = asteroid.offsetWidth;
  var maxLeft = containerWidth - asteroidWidth;
  var randomLeft = Math.floor(Math.random() * maxLeft);
  asteroid.style.left = randomLeft + "px";

  gameContainer.appendChild(asteroid);
  moveAsteroid(asteroid);
}

// Move an asteroid downwards
function moveAsteroid(asteroid) {
  var topPosition = 0;
  var asteroidInterval = setInterval(function () {
    topPosition += asteroidSpeed;
    asteroid.style.top = topPosition + "px";

    // Check if the asteroid has reached the bottom of the screen
    if (topPosition >= gameContainer.offsetHeight) {
      clearInterval(asteroidInterval);
      gameContainer.removeChild(asteroid);
      asteroidCounter++; // Increment the counter
      console.log("Asteroids avoided: " + asteroidCounter);

      // Check if the counter is a multiple of 10
      if (asteroidCounter % 10 === 0) {
        asteroidSpeed *= 1.2; // Increase the speed by 20%
        console.log("Asteroid speed increased: " + asteroidSpeed);
      }

      updateScore();
    }

    // Check for collision with the rocket
    if (checkCollision(asteroid, rocket)) {
      handleCollision(); // Trigger collision function
    }
  }, 10); // Adjust the interval as needed
}

// Check for collision between two elements
function checkCollision(element1, element2) {
  var rect1 = element1.getBoundingClientRect();
  var rect2 = element2.getBoundingClientRect();

  return !(
    rect1.top > rect2.bottom ||
    rect1.bottom < rect2.top ||
    rect1.right < rect2.left ||
    rect1.left > rect2.right
  );
}

// Function to handle collision
function handleCollision() {
  if (!isPaused) {
    isPaused = true;
    clearInterval(asteroidInterval);
    document.removeEventListener("keydown", handleKeydown);
    document.removeEventListener("keyup", handleKeyup);
    gameContainer.removeEventListener("touchstart", handleTouchstart);
    gameContainer.removeEventListener("click", handleMouseClick);
    modal.style.display = "block";
  }
}

// Function to restart the game
function restartGame() {
  isPaused = false;
  resetGame();
  modal.style.display = "none";
  startGame();

  rocket.classList.remove("shake_rocket");
  ex.classList.remove("exhaust");
}

// Reset the game state
function resetGame() {
  clearInterval(asteroidInterval);
  asteroidCounter = 0;
  updateScore();
  rocket.style.left = rocketPosition + "px";
  rocket.style.bottom = "0";
  // ... (any additional state reset logic you may have)
}

// Update and display the score
function updateScore() {
  scoreElement.textContent = "Score: " + asteroidCounter;
}

// Move the rocket
function moveRocket(direction) {
  if (direction === "left") {
    rocketPosition -= rocketSpeed;
  } else if (direction === "right") {
    rocketPosition += rocketSpeed;
  }

  // Limit the rocket's position within the game container
  var containerWidth = gameContainer.offsetWidth;
  var rocketWidth = rocket.offsetWidth;
  var maxLeft = containerWidth - rocketWidth;
  rocketPosition = Math.max(0, Math.min(rocketPosition, maxLeft));

  // Update the rocket's position
  rocket.style.left = rocketPosition + "px";
}

// Handle keydown event
function handleKeydown(event) {
  var key = event.key;
  if (key === "ArrowLeft") {
    moveRocket("left");
  } else if (key === "ArrowRight") {
    moveRocket("right");
  }
}

// Handle keyup event
function handleKeyup(event) {
  var key = event.key;
  if (key === "ArrowLeft" || key === "ArrowRight") {
    // Stop the rocket
    // You can add additional logic here if needed
  }
}

// Handle touchstart event
function handleTouchstart(event) {
  var touchX = event.touches[0].clientX;
  var screenWidth = window.innerWidth;

  if (touchX < screenWidth / 2) {
    moveRocket("left");
  } else {
    moveRocket("right");
  }
}

// Handle mouse click event
function handleMouseClick(event) {
  var clickX = event.clientX;
  var screenWidth = window.innerWidth;

  if (clickX < screenWidth / 2) {
    moveRocket("left");
  } else {
    moveRocket("right");
  }
}

function createStars() {
  const container = document.getElementById("game-container");
  const starCount = 100;

  for (let i = 0; i < starCount; i++) {
    const star = document.createElement("div");
    star.classList.add("star");
    star.style.top = `${Math.random() * 100}%`;
    star.style.left = `${Math.random() * 100}%`;
    star.style.animationDelay = `${Math.random() * 5}s`;
    container.appendChild(star);
  }
}

createStars();

// Add event listeners for keydown, keyup, touchstart, and click events
document.addEventListener("keydown", handleKeydown);
document.addEventListener("keyup", handleKeyup);
document.addEventListener("touchstart", handleTouchstart);
gameContainer.addEventListener("click", handleMouseClick);

// Start creating asteroids periodically
function startGame() {
  asteroidInterval = setInterval(createAsteroid, 2000); // Adjust the interval as needed

  // rocket.classList.add("shake_rocket");
}

// Start the game when the page loads
window.onload = startGame;
