const canvas = document.getElementById("galaxy");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];
const numParticles = 200;

// Create particles
function initParticles(color, speed, shape="circle") {
  particles = [];
  for (let i = 0; i < numParticles; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 3,
      color: color,
      speed: speed,
      shape: shape
    });
  }
}

// Draw particles
function drawParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => {
    ctx.beginPath();
    if (p.shape === "circle") {
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
    } else if (p.shape === "square") {
      ctx.rect(p.x, p.y, p.radius*2, p.radius*2);
    } else if (p.shape === "triangle") {
      ctx.moveTo(p.x, p.y);
      ctx.lineTo(p.x + p.radius, p.y + p.radius*2);
      ctx.lineTo(p.x - p.radius, p.y + p.radius*2);
      ctx.closePath();
    }
    ctx.fillStyle = p.color;
    ctx.fill();

    // Move particles
    p.y += p.speed;
    if (p.y > canvas.height) {
      p.y = 0;
      p.x = Math.random() * canvas.width;
    }
  });
  requestAnimationFrame(drawParticles);
}

// Mood change visuals
document.getElementById("mood").addEventListener("change", e => {
  let mood = e.target.value;
  if (mood === "calm") initParticles("lightblue", 0.5, "circle");
  if (mood === "happy") initParticles("yellow", 1, "circle");
  if (mood === "excited") initParticles("red", 2, "triangle");
  if (mood === "stressed") initParticles("purple", 1.5, "square");
  if (mood === "romantic") initParticles("pink", 0.8, "circle");
  if (mood === "mysterious") initParticles("darkviolet", 0.7, "triangle");
  if (mood === "energetic") initParticles("orange", 3, "square");
  if (mood === "sad") initParticles("blue", 0.4, "circle");
});

// Default mood
initParticles("lightblue", 0.5, "circle");
drawParticles();
