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

function movePaddles(deltaTime) {

    // left paddle (user)
    leftPaddle.y += leftPaddle.dy * deltaTime * 60;

    // right paddle
    const aiSpeed = 5;
    const errorMargin = Math.floor(Math.random() * 21) + 30;
    const paddleCenter = rightPaddle.y + paddleHeight / 2;

    if (ball.y < paddleCenter - errorMargin) {
        rightPaddle.y -= aiSpeed * deltaTime * 60;
    } else if (ball.y > paddleCenter + errorMargin) {
        rightPaddle.y += aiSpeed * deltaTime * 60;
    }

    // clamp paddles to canvas boundaries
    leftPaddle.y = clamp(leftPaddle.y, 0, canvas.height - paddleHeight);
    rightPaddle.y = clamp(rightPaddle.y, 0, canvas.height - paddleHeight);
}

// vertical boundary clamp
function clamp(val, min, max) { // force 'val' to stay between min and max
    return Math.max(min, Math.min(max, val));
}

function moveBall(deltaTime) {
    ball.x += ball.dx * deltaTime * 60;
    ball.y += ball.dy * deltaTime * 60;

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
    ball.y = canvas.height / 2;

    ball.dx = direction * 6;
    ball.dy = (Math.random() * 6) - 3;
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

        // apply momentum-like variation
        const paddleCenter = leftPaddle.y + paddleHeight / 2;
        const diff = ball.y - paddleCenter;
        const normalized = diff / (paddleHeight / 2);
        ball.dy = normalized * 5;
    }

    // right paddle
    if (
        ball.x + ballRadius > rightPaddle.x &&
        ball.y > rightPaddle.y &&
        ball.y < rightPaddle.y + paddleHeight
    ) {
        ball.dx *= -1;
        ball.x = rightPaddle.x - ballRadius;

        const paddleCenter = rightPaddle.y + paddleHeight / 2;
        const difference = ball.y - paddleCenter; // measure how far ball is from paddle center
        const normalized = difference / (paddleHeight / 2); // get value between -1 or 1
        ball.dy = normalized * 5; // mimic vertical velocity
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
    setScoreButtonsEnabled(true);
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
function update(deltaTime) {
    if (isGameOver) return;

    updateControls();

    if (!isCanvasPaused) {
        movePaddles(deltaTime);
        moveBall(deltaTime);
        checkCollisions();
        checkScore();
    }
}

////// game physics timing

let lastTime = performance.now();   // last time frame was processed
let accumulator = 0;                // accumulated leftover time between frames
const fixedTimestep = 1 / 60;       // always simulate 60 fps

function gameLoop(currentTime = performance.now()) {
    if (isGameOver) return;

    checkFPS(currentTime);

    // calculate time passed since last frame (in seconds) and add to bucket
    accumulator += (currentTime - lastTime) / 1000;
    // update last time to now (to measure next frame)
    lastTime = currentTime;

    // while enough time passed to simulate one physics step of 1/60 sec
    while (accumulator >= fixedTimestep) {
        update(fixedTimestep);          // update paddle and ball physics using fixed timestep
        accumulator -= fixedTimestep;   // after each physics update, subtract timestep from acc
    }

    draw(); // draw latest state after all physics updates
    loopId = requestAnimationFrame(gameLoop);
}

////// for FPS checking (ui notice)

let fpsLastTime = performance.now();    // last time we checked fps
let fpsFrames = 0;                      // # of frames since last fps check

function checkFPS(currentTime) {
    fpsFrames++;
    const delta = (currentTime - fpsLastTime) / 1000; // get seconds passed since last fps check

    if (delta >= 0) {
        const realFps = Math.round(fpsFrames / delta);
        const notice = document.querySelector('#performanceNotice');

        if (realFps < 45) {
            notice.style.opacity = '1';
            notice.style.visibility = 'visible';
        } else {
            notice.style.opacity = '0';
            notice.style.visibility = 'hidden';
        }

        fpsFrames = 0;
        fpsLastTime = currentTime;
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