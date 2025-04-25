// ========= draw canvas elements ==========

function drawBall(x, y, r, color) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
}

drawBall(ball.x, ball.y, ballRadius, 'white');