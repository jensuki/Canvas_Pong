// ====== handle scorekeeping, win conditions, setup players, UI ======

const p1 = {
    score: 0,
    button: document.querySelector('#p1Btn'),
    display: document.querySelector('#p1Display')
};

const p2 = {
    score: 0,
    button: document.querySelector('#p2Btn'),
    display: document.querySelector('#p2Display')
};

// grab all dom elements
const statusMsg = document.querySelector('#statusMsg');
const resetBtn = document.querySelector('#resetBtn');
const scoreSelect = document.querySelector('#playTo');

let winningScore = 3;
let isGameOver = false;




// disable point buttons while game in loop
function setScoreButtonsEnabled(enabled) {
    p1.button.disabled = !enabled;
    p2.button.disabled = !enabled;
}