const state = {
    screen: 'logo',
    logoTimeLeftMs: 3000,
};
const updateIntervalMs = 20;
const logoBlue = "#0096FF";

let updateLoop = null;
let canvas = null;
let ctx = null;

function start(id) {
    canvas = document.getElementById(id);
    ctx = canvas.getContext('2d');
    updateLoop = setInterval(update, updateIntervalMs);
}

function update() {
    if (state.screen === 'logo') {
        if (state.logoTimeLeftMs > 0) {
            ctx.fillStyle = logoBlue;
            ctx.fillRect(1, 1, canvas.width, canvas.height);
            state.logoTimeLeftMs -= updateIntervalMs;
        } else {
            state.screen = 'title'
        }
    }

    if (state.screen === 'title') {
        // Draw title screen
    }
}