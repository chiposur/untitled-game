// eslint-disable-next-line no-unused-vars
const untitledGame = (canvasId) => {
  const titleOps = [
    'Start',
    'Settings',
  ];
  const titleStarVel = { x: 0, y: 1 };
  const gameStarVel = { x: -1, y: 0 };
  const state = {
    screen: 'logo',
    logoTimeLeftMs: 3000,
    currTitleOpIndex: 0,
    stars: [],
    starGenCooldownMs: 600,
    starGenOddRow: false,
    starVel: titleStarVel,
  };
  const updateIntervalMs = 20;
  const logoFg = '#AB1C50';
  const logoTxtHeight = 48;
  const logoTxtStyle = `${logoTxtHeight}px arial`;
  const logoTxt = 'chiposur';
  const titleFg = '#4fbcf7';
  const titleTxtStyle = '100px arial';
  const titleTxt = 'Untitled';
  const titleOpTxtHeight = 24;
  const titleOpTxtStyle = `${titleOpTxtHeight}px arial`;
  const titleOpColor = 'yellow';
  const starColor = 'white';
  const starRadius = 1;

  let canvas = null;
  let ctx = null;

  function validStarCoord(x, y) {
    return x >= -1 * starRadius * 16
          && x <= 645
          && y >= 0
          && y < 480 + starRadius;
  }

  function updateStarCoords() {
    const stars = [];
    for (let i = 0; i < state.stars.length; i += 1) {
      const star = state.stars[i];
      star.x += state.starVel.x;
      star.y += state.starVel.y;
      if (validStarCoord(star.x, star.y)) {
        stars.push(star);
      }
    }
    state.stars = stars;
  }

  function genIncomingStars(yStart) {
    let x;
    let y;
    let condition;
    let increment;
    if (state.screen === 'title' || state.screen === 'logo') {
      // Generate top row of stars
      x = state.starGenOddRow ? 0 : -1 * starRadius * 16;
      y = yStart;
      condition = () => x <= 640;
      increment = () => {
        x += Math.floor(Math.random() * 12 + starRadius * 32);
        y = yStart + Math.floor(Math.random() * 12);
      };
    } else if (state.screen === 'game') {
      // Generate column of stars on the rightmost side
      y = yStart + (state.starGenOddRow ? 0 : -1 * starRadius * 16);
      condition = () => y <= 480;
      increment = () => {
        x = 645 - Math.floor(Math.random() * 12);
        y += Math.floor(Math.random() * 12 + starRadius * 32);
      };
    }

    while (condition()) {
      increment();
      state.stars.push({ x, y });
    }
  }

  function initStarGen() {
    for (let y = 0; y < 480; y += 27) {
      genIncomingStars(y);
      state.starGenOddRow = !state.starGenOddRow;
    }
  }

  function handleStarGen() {
    updateStarCoords();
    if (state.starGenCooldownMs <= 0) {
      genIncomingStars(0);
      state.starGenOddRow = !state.starGenOddRow;
      state.starGenCooldownMs = 600;
    }
    state.starGenCooldownMs -= updateIntervalMs;
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

    // Title options
    const paddingTop = 8;
    x = canvas.width / 2;
    y = canvas.height / 2 + 40;
    ctx.save();
    ctx.fillStyle = titleOpColor;
    ctx.font = titleOpTxtStyle;
    ctx.textAlign = 'center';
    for (let i = 0; i < titleOps.length; i += 1) {
      ctx.fillText(titleOps[i], x, y);
      y += titleOpTxtHeight + paddingTop;
    }
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
      state.starVel = titleStarVel;
      drawSpaceBg();
      drawTitleFg();
    } else if (state.screen === 'game') {
      state.starVel = gameStarVel;
      drawSpaceBg();
      drawSprites();
    }
    ctx.restore();
  }

  function handleTitleKeyDownEvent(key) {
    const isEnter = key === 13;
    const currentOp = titleOps[state.currTitleOpIndex];
    if (isEnter && currentOp === 'Start') {
      state.screen = 'game';
    }
  }

  function captureKeyDownEvents(event) {
    const key = event.keyCode;
    switch (state.screen) {
      case 'title':
        handleTitleKeyDownEvent(key);
        break;
      default: break;
    }
  }

  function start(id) {
    canvas = document.getElementById(id);
    ctx = canvas.getContext('2d');
    initStarGen();
    window.addEventListener('keydown', captureKeyDownEvents, false);
    setInterval(update, updateIntervalMs);
  }

  start(canvasId);
};
