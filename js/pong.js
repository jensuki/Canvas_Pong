// ====== canvas setup, game objects, game mechanics ======

// ==== canvas setup ====
const canvas = document.querySelector('#pongCanvas');
const ctx = canvas.getContext('2d');

// ==== game constants ====
const paddleWidth = 10, paddleHeight = 75;
const ballRadius = 8;

// ==== game objects ====
let leftPaddle = {
    x: 5, y: 160, dy: 0
}

let rightPaddle = {
    x: canvas.width - 15, y: 160, dy: 0
}

let ball = {
    x: 300, y: 200, dx: 4, dy: 25
}