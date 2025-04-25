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

//////////////////////////////

// display keyboad control instructions for first visit
document.addEventListener('DOMContentLoaded', () => {
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
})

////////////////////////

// score updater
function updateScore(player, opponent) {
    if (isGameOver) return;

    player.score += 1;
    if (player.score === winningScore) {
        handleWin(player, opponent);
    }
    player.display.innerText = player.score;
}

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
// disable point buttons while game in loop
function setScoreButtonsEnabled(enabled) {
    p1.button.disabled = !enabled;
    p2.button.disabled = !enabled;
}