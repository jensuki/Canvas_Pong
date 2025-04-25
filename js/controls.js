// ====== keyboard controls ========

document.addEventListener('keydown', (e) => {
    switch (e.key) {
        case 'w':
            leftPaddle.dy = -5;
            break;
        case 's':
            leftPaddle.dy = 5;
            break;
    }
})

document.addEventListener('keyup', (e) => {
    switch (e.key) {
        case 'w':
        case 's':
            leftPaddle.dy = 0;
            break;
    }
})