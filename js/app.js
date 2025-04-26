// ===== PLAYER SETUP =====

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

//////////////////////////////

function handleFirstVisit() {
    stopLoop();

    const overlay = document.querySelector('#instructionsOverlay');
    const firstTime = !localStorage.getItem('hasVisited');

    if (firstTime) {
        isCanvasPaused = true;
        setTimeout(() => {
            overlay.classList.add('hidden');
            localStorage.setItem('hasVisited', 'true');
            isCanvasPaused = false;
            gameLoop();
        }, 3500)
    } else {
        overlay?.classList.add('hidden');
        isCanvasPaused = false;
        gameLoop();
    }
}

// score updater
function updateScore(player, opponent) {
    if (isGameOver) return;

    player.score += 1;
    if (player.score === winningScore) {
        handleWin(player, opponent);
    }
    player.display.innerText = player.score;
}

// disable point buttons while game in loop
function setScoreButtonsEnabled(enabled) {
    p1.button.disabled = !enabled;
    p2.button.disabled = !enabled;
}

// on player win
function handleWin(player, opponent) {
    isGameOver = true;
    isCanvasPaused = true;
    showWinner(player, opponent);
    showConfetti();
    draw();
}

function showWinner(player, opponent) {
    statusMsg.innerText = player === p1 ? 'Player 1 wins!' : 'Player 2 wins!';
    player.display.classList.add('has-text-success');
    opponent.display.classList.add('has-text-danger');

    player.button.disabled = true;
    opponent.button.disabled = true;
}

function showConfetti() {
    confetti({
        particleCount: 150,
        spread: 120,
        origin: { y: .6 }
    });
}

// ===== reset functions  ======

function resetGameState() {
    isGameOver = false;
    isCanvasPaused = false;
    stopLoop();
}

function reset() {
    resetGameState();

    [p1, p2].forEach(resetPlayer);

    statusMsg.innerText = '';
    setScoreButtonsEnabled(false);
    resetBall();
    gameLoop();
}

function resetPlayer(player) {
    player.score = 0;
    player.display.innerText = 0;
    player.display.classList.remove('has-text-success', 'has-text-danger');
    player.button.disabled = false;
}

// ===== event listeners ======
document.addEventListener('DOMContentLoaded', handleFirstVisit);
p1.button.addEventListener('click', () => updateScore(p1, p2));
p2.button.addEventListener('click', () => updateScore(p2, p1));
resetBtn.addEventListener('click', reset)
scoreSelect.addEventListener('change', function () {
    winningScore = parseInt(this.value);
    reset();
})