const state = {
    screen: 'logo',
    logoTimeLeftMs: 3000,
};
const updateIntervalMs = 20;
const logoBg = '#000000';
const logoFg = '#AB1C50';
const logoTxtStyle = '48px arial';
const logoTxt = 'chiposur';
const titleBg = '#000000';
const titleFg = '#4fbcf7';
const titleTxtStyle = '100px arial';
const titleTxt = 'Untitled'
const startTxtStyle = '24px arial';
const startTxt = 'Start';
const startTxtColor = '#FFFFFF';
const startBg = 'gray';

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
        ctx.save();
        ctx.fillStyle = titleBg;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.restore();
        drawTitleFg();
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

function drawTitleFg() {
        // Game title
        ctx.save();
        ctx.fillStyle = titleFg;
        ctx.font = titleTxtStyle;
        ctx.textAlign = 'center';
        x = canvas.width / 2;
        y = canvas.height / 2 - 40;
        ctx.fillText(titleTxt, x, y);
        ctx.restore();

        // Start btn
        ctx.save();
        ctx.fillStyle = startBg;
        ctx.font = startTxtStyle;
        textMetrics = ctx.measureText(startTxt);
        padding = 8;
        x = canvas.width / 2 - textMetrics.width / 2 - padding;
        y = canvas.height / 2 + 40 - 24;
        ctx.fillRect(x, y, textMetrics.width + padding * 2, 24 + padding);
        ctx.restore();
        ctx.save();
        ctx.fillStyle = startTxtColor;
        ctx.font = startTxtStyle;
        ctx.textAlign = 'center';
        x = canvas.width / 2;
        y = canvas.height / 2 + 40;
        ctx.fillText(startTxt, x, y);
        ctx.restore();
}