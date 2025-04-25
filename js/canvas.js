// ========= draw canvas elements ==========

function drawRect(x, y, w, h, color) {
    ctx.fillstyle = color;
    ctx.fillRect(x, y, w, h);
}

function drawBall(x, y, r, color) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
}

function drawAll() {
    ctx.clearRect(0, 0, canvas.clientWidth, canvas.height);

    // draw center net

}
drawBall(ball.x, ball.y, ballRadius, 'white');
for (let i = 0; i < canvas.height; i += 20.5) {
    drawRect(canvas.width / 2 - 1, i, 2, 10, 'white');
}