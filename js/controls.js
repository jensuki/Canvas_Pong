// ====== keyboard controls ========

const keys = {};
let currentKey = null;

document.addEventListener('keydown', (e) => {
    keys[e.key] = true;
});

document.addEventListener('keyup', (e) => {
    keys[e.key] = false;
});

function updateControls() {
    if (keys['w']) {
        leftPaddle.dy = -5;
    } else if (keys['s']) {
        leftPaddle.dy = 5;
    } else {
        leftPaddle.dy = 0;
    }
}
