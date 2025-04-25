// ====== canvas setup, game objects, game mechanics ======

// ==== canvas setup ====
const canvas = document.querySelector('#pongCanvas');
const ctx = canvas.getContext('2d');

// ==== game constants ====
const paddleWidth = 10, paddleHeight = 75;
const ballRadius = 8;

// ==== game objects ====
let leftPaddle = {
    x: 5, y: 250, dy: 0
}

let rightPaddle = {
    x: canvas.width - 15, y: 50, dy: 0
}

let ball = {
    x: 297, y: 150, dx: 4, dy: 25
}

let isCanvasPaused = false;
let loopId;

// ==== GAME MECHANICS ====

function movePaddles() {

    // left paddle (user)
    leftPaddle.y += leftPaddle.dy;

    // right paddle
    const aiSpeed = 5;
    const errorMargin = Math.floor(Math.random() * 21) + 30;
    const paddleCenter = rightPaddle.y + paddleHeight / 2;

    if (ball.y < paddleCenter - errorMargin) {
        rightPaddle.y -= aiSpeed; // move paddle up
    } else if (ball.y > paddleCenter + errorMargin) {
        rightPaddle.y += aiSpeed; // move paddle down
    }

    // clamp paddles to canvas boundaries
    leftPaddle.y = clamp(leftPaddle.y, 0, canvas.height - paddleHeight);
    rightPaddle.y = clamp(rightPaddle.y, 0, canvas.height - paddleHeight);
}

// vertical boundary clamp
function clamp(val, min, max) { // force 'val' to stay between min and max
    return Math.max(min, Math.min(max, val));
}

function moveBall() {
    ball.x += ball.dx;
    ball.y += ball.dy;

    // bounce off top and bottom walls
    if (ball.y < ballRadius || ball.y > canvas.height - ballRadius) {
        ball.dy *= -1; // flip directions
    }
}

function resetBall(direction = 1) {

    if (direction === 1) {
        // player 1 scored -> start ball from left
        ball.x = leftPaddle.x + paddleWidth + ballRadius + 5;
    } else {
        // start ball from right
        ball.x = rightPaddle.x - ballRadius - 5;
    }
}

// ====== collision check ======

function checkCollisions() {
    // left paddle
    if (
        ball.x - ballRadius < leftPaddle.x + paddleWidth && // ball reached front of paddle
        ball.y > leftPaddle.y && // ball within top of paddle
        ball.y < leftPaddle.y + paddleHeight // and within bottom of paddle
    ) {
        ball.dx *= -1; // flip direction
        ball.x = leftPaddle.x + paddleWidth + ballRadius; // bounce off immediately
    }

    // right paddle
    if (
        ball.x + ballRadius > rightPaddle.x &&
        ball.y > rightPaddle.y &&
        ball.y < rightPaddle.y + paddleHeight
    ) {
        ball.dx *= -1;
        ball.x = rightPaddle.x - ballRadius;
    }
}

// ===== score check =====

function checkScore() {
    if (ball.x < 0) {
        // opponent scored
        isCanvasPaused = true;
        resumeAfterPointAdd(-1);
    } else if (ball.x > canvas.width) {
        // player 1 scored
        isCanvasPaused = true;
        resumeAfterPointAdd(1);
    }
}

function resumeAfterPointAdd(direction) {

    const resume = (e) => {
        if (e.target.id === 'p1Btn' || e.target.id === 'p2Btn') {
            resetBall(direction);
            isCanvasPaused = false;
            setScoreButtonsEnabled(false); // disable buttons after point add
            stopLoop();
            gameLoop();
            document.removeEventListener('click', resume);
        }
    }
    document.addEventListener('click', resume);
}

// ==== GAME LOOP ====
function update() {
    if (isGameOver) return;

    movePaddles();
    moveBall();
    checkCollisions();
    checkScore();
}

function gameLoop() {

    if (!isCanvasPaused) {
        update();
        draw();
        // loopId = requestAnimationFrame(gameLoop);
    }
}

function stopLoop() {
    if (loopId) {
        cancelAnimationFrame(loopId);
        loopId = null;
    }
}

// ====== INIT GAME =======
resetBall();
setScoreButtonsEnabled(false);
gameLoop();