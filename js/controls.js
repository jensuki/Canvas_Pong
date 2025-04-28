// ====== keyboard controls ========
/**
 * update paddle movement for every frame based on the state of 'keys' pressed,
 * instead of relying on event timing delays from keydown
 *
 * */

const keys = {};

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
