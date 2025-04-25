// ========= draw canvas elements ==========

function drawRect(x, y, w, h, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, w, h);
}

function drawCircle(x, y, r, color) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // draw center net
    for (let i = 0; i < canvas.height; i += 20.5) {
        drawRect(canvas.width / 2 - 1, i, 2, 10, 'white');
    }

    // draw line + paddles + ball onto canvas
    drawRect(
        0,
        canvas.height / 2,
        canvas.width,
        1,
        'white');
    drawRect(
        leftPaddle.x,
        leftPaddle.y,
        paddleWidth,
        paddleHeight,
        'white');
    drawRect(
        rightPaddle.x,
        rightPaddle.y,
        paddleWidth,
        paddleHeight,
        'white');
    drawCircle(
        ball.x,
        ball.y,
        ballRadius,
        'white');

}