// script.js
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 800;
canvas.height = 400;

let score =0;
let isGameOver = false;

// Ball properties
let ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    radius: 15,
    dx: 4,
    dy: -3
   
};

// Paddle properties
let paddle = {
    x: canvas.width / 2 - 75,
    y: canvas.height - 20,
    width: 150,
    height: 10,
    speed: 10,
    dx: 0
};

// Controls
document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") {
        paddle.dx = -paddle.speed;
    } else if (e.key === "ArrowRight") {
        paddle.dx = paddle.speed;
    }
});

document.addEventListener("keyup", () => {
    paddle.dx = 0;
});

// Draw the ball
function drawBall() {
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    ctx.fillStyle = "#ff5722";
    ctx.fill();
    ctx.closePath();
}

// Draw the paddle
function drawPaddle() {
    ctx.fillStyle = "#03a9f4";
    ctx.fillRect(paddle.x, paddle.y, paddle.width, paddle.height);
}

// Draw the score
function drawScore() {
    document.getElementById("scoreDisplay").textContent = `Score: ${score}`;
}

// Move the ball
function moveBall() {
    ball.x += ball.dx;
    ball.y += ball.dy;

    // Bounce off walls
    if (ball.x + ball.radius > canvas.width || ball.x - ball.radius < 0) {
        ball.dx *= -1;
    }

    if (ball.y - ball.radius < 0) {
        ball.dy *= -1;
    }

    // Bounce off paddle
    if (
        ball.y + ball.radius > paddle.y &&
        ball.x > paddle.x &&
        ball.x < paddle.x + paddle.width
    ) {
        ball.dy *= -1.1;
        score += 2; // Increase score
    }

    // Game over if ball falls below the paddle
    if (ball.y - ball.radius > canvas.height) {
        isGameOver = true;
    }
}

// Move the paddle
function movePaddle() {
    paddle.x += paddle.dx;

    // Prevent paddle from going out of bounds
    if (paddle.x < 0) paddle.x = 0;
    if (paddle.x + paddle.width > canvas.width) paddle.x = canvas.width - paddle.width;
}

// Draw everything
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    drawPaddle();
    drawScore();
}

// Update the game
function update() {
    if (!isGameOver) {
        moveBall();
        movePaddle();
        draw();
        requestAnimationFrame(update);
    } else {
        showGameOver();
    }
}

// Show "Game Over" and restart button
function showGameOver() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#fff";
    ctx.font = "30px Arial";
    ctx.textAlign = "center";
    ctx.fillText("Game Over!", canvas.width / 2, canvas.height / 2);
    document.getElementById("restartButton").style.display = "block";
}

// Restart the game
document.getElementById("restartButton").addEventListener("click", () => {
    score = 0;
    isGameOver = false;
    ball.x = canvas.width / 2;
    ball.y = canvas.height / 2;
    ball.dx = 4;
    ball.dy = -3;
    paddle.x = canvas.width / 2 - 75;
    document.getElementById("restartButton").style.display = "none";
    update();
});

// Start the game
update();
