const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

ctx.imageSmoothingEnabled = false;

let score = 0;
let gameOver = false;
let highScore = localStorage.getItem("rainyRunnerHighScore") || 0;

let animationFrameId = null;
let lastTime = 0;

// 모바일 체감에 맞춰 전체적인 밸런스 상향 (속도감UP)
let baseSpeed = 160;   // 초당 이동 픽셀 (기존 대비 한층 빨라짐)
let maxSpeed = 380;
let spawnTimer = 0;
let currentSpawnInterval = 1.3; // 장애물 등장 간격 (초 단위)
let currentLevel = 1;

const groundY = 136;

// --- 귀여운 토끼 플레이어 ---
const player = {
  x: 30,
  y: 116,
  width: 14,
  height: 20,
  velocityY: 0,
  gravity: 1200,      // 모바일에서도 답답하지 않게 묵직하게 착지
  jumpPower: -380,    // 시원시원한 높이로 점프
  isGrounded: false,
  animTimer: 0,

  update(dt) {
    if (gameOver) return;

    this.animTimer += dt;

    // 중력 및 이동 연산 (시간 기준)
    this.velocityY += this.gravity * dt;
    this.y += this.velocityY * dt;

    if (this.y + this.height >= groundY) {
      this.y = groundY - this.height;
      this.velocityY = 0;
      this.isGrounded = true;
    }
  },

  draw() {
    if (gameOver) return;
    
    const px = Math.floor(this.x);
    const py = Math.floor(this.y);
    const isRunning = this.isGrounded && Math.floor(this.animTimer * 10) % 2 === 0;

    // 1. 토끼 귀
    ctx.fillStyle = "#ffcbf2";
    const earYOffset = isRunning ? -1 : 0;
    ctx.fillRect(px + 3, py - 6 + earYOffset, 3, 7);
    ctx.fillRect(px + 8, py - 6 + earYOffset, 3, 7);
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(px + 2, py - 7 + earYOffset, 2, 7);
    ctx.fillRect(px + 7, py - 7 + earYOffset, 2, 7);

    // 2. 토끼 얼굴 & 몸통
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(px + 2, py, 11, 14);

    // 3. 눈 & 볼터치
    ctx.fillStyle = "#2b2d42";
    ctx.fillRect(px + 9, py + 3, 2, 2);
    ctx.fillStyle = "#ff99c8";
    ctx.fillRect(px + 7, py + 6, 3, 2);

    // 4. 노란 꼬마 우산
    ctx.fillStyle = "#ffd166";
    ctx.fillRect(px + 1, py - 10, 13, 3);
    ctx.fillRect(px + 3, py - 12, 9, 2);
    ctx.fillStyle = "#8d99ae";
    ctx.fillRect(px + 7, py - 7, 1, 7);

    // 5. 달리는 다리
    ctx.fillStyle = "#e0e1dd";
    if (isRunning) {
      ctx.fillRect(px + 2, py + 14, 3, 3);
      ctx.fillRect(px + 9, py + 13, 3, 2);
    } else {
      ctx.fillRect(px + 3, py + 14, 3, 3);
      ctx.fillRect(px + 8, py + 14, 3, 3);
    }
  }
};

// --- 다채로운 장애물 ---
let obstacles = [];

class Obstacle {
  constructor(type) {
    this.type = type;
    this.x = canvas.width;
    
    if (type === 'puddle') {
      this.width = 16;
      this.height = 6;
      this.y = groundY - this.height;
      this.speedMult = 1.0;
    } else if (type === 'cloud') {
      // 머리 위로 완전히 지나갈 수 있는 높이
      this.width = 20;
      this.height = 10;
      this.y = groundY - 42; 
      this.speedMult = 1.0;
    } else if (type === 'lightning') {
      // 빠른 번개
      this.width = 10;
      this.height = 12;
      this.y = groundY - this.height;
      this.speedMult = 1.25;
    }
  }

  update(dt, currentBaseSpeed) {
    this.x -= currentBaseSpeed * this.speedMult * dt;
  }

  draw() {
    const ox = Math.floor(this.x);
    const oy = Math.floor(this.y);

    if (this.type === 'puddle') {
      ctx.fillStyle = "#4ea8de";
      ctx.fillRect(ox, oy, this.width, this.height);
      ctx.fillStyle = "#90e0ef";
      ctx.fillRect(ox + 3, oy + 1, 6, 2);
    } else if (this.type === 'cloud') {
      ctx.fillStyle = "#6c757d";
      ctx.fillRect(ox + 2, oy + 2, 16, 8);
      ctx.fillRect(ox + 5, oy, 10, 3);
      if (Math.floor(player.animTimer * 5) % 2 === 0) {
        ctx.fillStyle = "#ffb703";
        ctx.fillRect(ox + 9, oy + 8, 2, 4);
      }
    } else if (this.type === 'lightning') {
      ctx.fillStyle = "#ffb703";
      ctx.fillRect(ox + 4, oy, 4, 4);
      ctx.fillRect(ox + 2, oy + 4, 6, 3);
      ctx.fillRect(ox + 4, oy + 7, 3, 5);
    }
  }
}

// --- 파티클 시스템 ---
let particles = [];
class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.vx = (Math.random() - 0.5) * 200;
    this.vy = (Math.random() - 0.5) * 250 - 50;
    const colors = ["#ffffff", "#ffcbf2", "#ffd166", "#4ea8de"];
    this.color = colors[Math.floor(Math.random() * colors.length)];
    this.size = Math.random() * 2 + 1;
    this.life = 1.0;
    this.decay = Math.random() * 1.5 + 0.8;
  }
  update(dt) {
    this.x += this.vx * dt;
    this.vy += 600 * dt;
    this.y += this.vy * dt;
    this.life -= this.decay * dt;
  }
  draw() {
    if (this.life <= 0) return;
    ctx.globalAlpha = Math.max(0, this.life);
    ctx.fillStyle = this.color;
    ctx.fillRect(Math.floor(this.x), Math.floor(this.y), this.size, this.size);
    ctx.globalAlpha = 1.0;
  }
}

function handleAction() {
  if (player.isGrounded && !gameOver) {
    player.velocityY = player.jumpPower;
    player.isGrounded = false;
  } else if (gameOver) {
    resetGame();
  }
}

document.addEventListener("keydown", (e) => {
  if (e.code === "Space" || e.code === "ArrowUp") {
    e.preventDefault();
    handleAction();
  }
});
canvas.addEventListener("touchstart", (e) => {
  e.preventDefault();
  handleAction();
}, { passive: false });
canvas.addEventListener("mousedown", handleAction);

function resetGame() {
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId);
  }

  score = 0;
  gameOver = false;
  obstacles = [];
  particles = [];
  baseSpeed = 160;
  currentSpawnInterval = 1.3;
  spawnTimer = 0;
  currentLevel = 1;

  player.y = 116;
  player.velocityY = 0;
  player.animTimer = 0;
  
  lastTime = performance.now();
  loop(lastTime);
}

function spawnRandomObstacle() {
  let types = ['puddle'];
  if (score > 20) types.push('lightning');
  if (score > 50) types.push('cloud');

  const selectedType = types[Math.floor(Math.random() * types.length)];
  obstacles.push(new Obstacle(selectedType));
}

function update(dt) {
  if (gameOver) {
    particles.forEach((p, i) => {
      p.update(dt);
      if (p.life <= 0) particles.splice(i, 1);
    });
    return;
  }

  score += dt * 10;

  currentLevel = Math.floor(score / 100) + 1;
  baseSpeed = Math.min(160 + (score * 1.2), maxSpeed);
  currentSpawnInterval = Math.max(1.3 - (score * 0.003), 0.6);

  // 플레이어 이동
  player.update(dt);

  // 장애물 소환 타이머
  spawnTimer += dt;
  if (spawnTimer >= currentSpawnInterval) {
    spawnRandomObstacle();
    spawnTimer = 0;
  }

  // 장애물 이동 및 충돌
  for (let i = obstacles.length - 1; i >= 0; i--) {
    let obs = obstacles[i];
    obs.update(dt, baseSpeed);

    if (
      player.x + 2 < obs.x + obs.width &&
      player.x + player.width - 2 > obs.x &&
      player.y + 2 < obs.y + obs.height &&
      player.y + player.height > obs.y
    ) {
      gameOver = true;
      
      for (let j = 0; j < 18; j++) {
        particles.push(new Particle(player.x + 7, player.y + 10));
      }

      if (Math.floor(score) > highScore) {
        highScore = Math.floor(score);
        localStorage.setItem("rainyRunnerHighScore", highScore);
      }
    }

    if (obs.x + obs.width < 0) {
      obstacles.splice(i, 1);
    }
  }
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // 비 배경
  ctx.fillStyle = "rgba(140, 170, 230, 0.4)";
  for (let i = 0; i < 15; i++) {
    let rx = (player.animTimer * 300 + i * 30) % canvas.width;
    let ry = (player.animTimer * 500 + i * 20) % canvas.height;
    ctx.fillRect(rx, ry, 1, 4);
  }

  // 바닥
  ctx.fillStyle = "#4a4e69";
  ctx.fillRect(0, groundY, canvas.width, canvas.height - groundY);

  player.draw();
  obstacles.forEach(obs => obs.draw());
  particles.forEach(p => p.draw());

  // UI
  ctx.fillStyle = "#ffffff";
  ctx.font = "9px monospace";
  ctx.fillText(`SCORE: ${Math.floor(score)}`, 8, 16);
  ctx.fillStyle = "#ffd166";
  ctx.fillText(`HI: ${highScore}`, 88, 16);
  ctx.fillStyle = currentLevel > 3 ? "#ffb703" : "#8d99ae";
  ctx.fillText(`LV. ${currentLevel}`, canvas.width - 40, 16);

  if (gameOver) {
    ctx.fillStyle = "rgba(0, 0, 0, 0.6)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#ef233c";
    ctx.font = "16px monospace";
    ctx.fillText("GAME OVER", 110, 75);

    if (Math.floor(score) >= highScore && highScore > 0) {
      ctx.fillStyle = "#ffd166";
      ctx.font = "9px monospace";
      ctx.fillText("★ NEW HIGH SCORE! ★", 100, 95);
    }

    ctx.fillStyle = "#ffffff";
    ctx.font = "8px monospace";
    ctx.fillText("Tap to Restart", 120, 115);
  }
}

function loop(timestamp) {
  if (!lastTime) lastTime = timestamp;
  
  // 지나간 시간(초) 계산 (Delta Time)
  let dt = (timestamp - lastTime) / 1000;
  
  // 프레임 급감 시 튀는 현상 방지
  if (dt > 0.1) dt = 0.1;

  lastTime = timestamp;

  update(dt);
  draw();

  animationFrameId = requestAnimationFrame(loop);
}

// 게임 시작
lastTime = performance.now();
animationFrameId = requestAnimationFrame(loop);