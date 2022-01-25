const state = {
    screen: 'logo',
    logoTimeLeftMs: 3000,
};
const updateIntervalMs = 20;
const logoBg = '#000000';
const logoFg = '#AB1C50';
const logoTxtStyle = '48px arial';
const logoTxt = 'chiposur';

let updateLoop = null;
let canvas = null;
let ctx = null;

function start(id) {
    canvas = document.getElementById(id);
    ctx = canvas.getContext('2d');
    updateLoop = setInterval(update, updateIntervalMs);
}

function update() {
    ctx.save();
    ctx.clearRect(0, 0, 640, 480);
    if (state.screen === 'logo') {
        if (state.logoTimeLeftMs > 0) {
            ctx.save();
            ctx.fillStyle = logoBg;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.restore();
            drawLogoFg();
            state.logoTimeLeftMs -= updateIntervalMs;
        } else {
            state.screen = 'title'
        }
    } else if (state.screen === 'title') {
        // Draw title screen
    }
    ctx.restore();
}

function drawLogoFg() {
    // Text
    ctx.save();
    ctx.fillStyle = logoFg;
    ctx.font = logoTxtStyle;
    ctx.textAlign = 'center';
    x = canvas.width / 2;
    y = canvas.height / 2;
    ctx.fillText(logoTxt, x, y);
    textMetrics = ctx.measureText(logoTxt);
    ctx.restore();

    // Border with rounded corners
    ctx.save();
    ctx.beginPath();
    ctx.strokeStyle = logoFg;
    ctx.lineWidth = 4;
    x = canvas.width / 2 - textMetrics.width / 2;
    y = canvas.height / 2 - 44;
    ctx.moveTo(x, y);
    // Left
    ctx.arcTo(
        x - 32,
        y,
        x - 32,
        y + 32,
        32
    );
    ctx.arcTo(
        x - 32,
        y + 64,
        canvas.width / 2 - textMetrics.width / 2,
        canvas.height / 2 + 16,
        32
    );
    // Top
    ctx.moveTo(x, y);
    ctx.lineTo(x + textMetrics.width, y);
    // Right
    ctx.arcTo(
        x + textMetrics.width + 32,
        y,
        x + textMetrics.width + 32,
        y + 32,
        32
    );
    ctx.arcTo(
        x + textMetrics.width + 32,
        y + 64,
        canvas.width / 2 - textMetrics.width / 2 + textMetrics.width,
        canvas.height / 2 + 16,
        32
    );
    // Bottom
    x = canvas.width / 2 - textMetrics.width / 2;
    y = canvas.height / 2 + 16;
    ctx.moveTo(x, y);
    ctx.lineTo(x + textMetrics.width, y);
    ctx.stroke();
    ctx.restore();
}