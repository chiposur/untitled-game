// eslint-disable-next-line no-unused-vars
const untitledGame = (canvasId) => {
  const state = {
    screen: 'logo',
    logoTimeLeftMs: 3000,
    stars: [],
    starGenCooldownMs: 0,
    starVel: { x: 0, y: 1 },
  };
  const updateIntervalMs = 20;
  const logoFg = '#AB1C50';
  const logoTxtStyle = '48px arial';
  const logoTxt = 'chiposur';
  const titleFg = '#4fbcf7';
  const titleTxtStyle = '100px arial';
  const titleTxt = 'Untitled';
  const startBtnTxtStyle = '24px arial';
  const startBtnTxt = 'Start';
  const startBtnTxtColor = 'white';
  const startBtnBg = 'gray';
  const starColor = 'white';
  const starRadius = 1;

  let canvas = null;
  let ctx = null;

  function validStarCoord(x, y) {
    return x > 0 - starRadius
          && x < 640 + starRadius
          && y > 0 - starRadius
          && y < 480;
  }

  function updateStarCoords() {
    const stars = [];
    for (let i = 0; i < state.stars.length; i += 1) {
      const star = state.stars[i];
      star.y += state.starVel.y;
      if (validStarCoord(star.x, star.y)) {
        stars.push(star);
      }
    }
    state.stars = stars;
  }

  function genStarRow() {
    // Generate row of stars
    // - Same x diff y
    // - Use randomization to space them out
    let x = -32;
    while (x <= 640) {
      x += Math.floor(Math.random() * 12 + starRadius * 32);
      state.stars.push({ x, y: 0 });
    }
  }

  function drawBlackBg() {
    ctx.save();
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.restore();
  }

  function drawLogoFg() {
    // Text
    ctx.save();
    ctx.fillStyle = logoFg;
    ctx.font = logoTxtStyle;
    ctx.textAlign = 'center';
    let x = canvas.width / 2;
    let y = canvas.height / 2;
    ctx.fillText(logoTxt, x, y);
    const textMetrics = ctx.measureText(logoTxt);
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
      32,
    );
    ctx.arcTo(
      x - 32,
      y + 64,
      canvas.width / 2 - textMetrics.width / 2,
      canvas.height / 2 + 16,
      32,
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
      32,
    );
    ctx.arcTo(
      x + textMetrics.width + 32,
      y + 64,
      canvas.width / 2 - textMetrics.width / 2 + textMetrics.width,
      canvas.height / 2 + 16,
      32,
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
    let x = canvas.width / 2;
    let y = canvas.height / 2 - 40;
    ctx.fillText(titleTxt, x, y);
    ctx.restore();

    // Start btn
    ctx.save();
    ctx.fillStyle = startBtnBg;
    ctx.font = startBtnTxtStyle;
    const textMetrics = ctx.measureText(startBtnTxt);
    const padding = 8;
    x = canvas.width / 2 - textMetrics.width / 2 - padding;
    y = canvas.height / 2 + 40 - 24;
    ctx.fillRect(x, y, textMetrics.width + padding * 2, 24 + padding);
    ctx.restore();
    ctx.save();
    ctx.fillStyle = startBtnTxtColor;
    ctx.font = startBtnTxtStyle;
    ctx.textAlign = 'center';
    x = canvas.width / 2;
    y = canvas.height / 2 + 40;
    ctx.fillText(startBtnTxt, x, y);
    ctx.restore();
  }

  function drawStar(x, y) {
    ctx.save();
    ctx.fillStyle = starColor;
    ctx.beginPath();
    ctx.arc(x, y, starRadius, 0, 2 * Math.PI);
    ctx.fill();
    ctx.restore();
  }

  function drawStars() {
    for (let i = 0; i < state.stars.length; i += 1) {
      const star = state.stars[i];
      drawStar(star.x, star.y);
    }
  }

  function drawSprites() {
    // Draw assets including spaceship, meteors, etc.
  }

  function drawSpaceBg() {
    drawBlackBg();
    drawStars();
  }

  function handleStarGen() {
    updateStarCoords();
    if (state.starGenCooldownMs === 0) {
      genStarRow();
      state.starGenCooldownMs = 400;
    }
    state.starGenCooldownMs -= updateIntervalMs;
  }

  function update() {
    handleStarGen();
    ctx.save();
    ctx.clearRect(0, 0, 640, 480);
    if (state.screen === 'logo') {
      if (state.logoTimeLeftMs > 0) {
        drawBlackBg();
        drawLogoFg();
        state.logoTimeLeftMs -= updateIntervalMs;
      } else {
        state.screen = 'title';
      }
    } else if (state.screen === 'title') {
      drawSpaceBg();
      drawTitleFg();
    } else if (state.screen === 'game') {
      drawSpaceBg();
      drawSprites();
    }
    ctx.restore();
  }

  function start(id) {
    canvas = document.getElementById(id);
    ctx = canvas.getContext('2d');
    setInterval(update, updateIntervalMs);
  }

  start(canvasId);
};
