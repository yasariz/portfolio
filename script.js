// Typing effect variables and function
const text = "Hello World, I'm Gustav";
const typedEl = document.getElementById("typed");
const subtitle = document.getElementById("subtitle");
const button = document.getElementById("button");
let i = 0;

function type() {
  if (i < text.length) {
    typedEl.textContent += text.charAt(i);
    i++;
    setTimeout(type, 100);
  } else {
    setTimeout(() => {
      subtitle.classList.add("fade-in-visible");
      setTimeout(() => {
        button.classList.add("fade-in-visible");
      }, 600);
    }, 300);
  }
}

// Rain of dots background (no mouse interaction)
const canvas = document.getElementById('dots-canvas');
const ctx = canvas.getContext('2d');

let width, height;
function resize() {
  width = window.innerWidth;
  height = window.innerHeight;
  canvas.width = width;
  canvas.height = height;
}
resize();
window.addEventListener('resize', resize);

class Dot {
  constructor() {
    this.reset();
  }

  reset() {
    this.x = Math.random() * width;
    this.y = Math.random() * height;
    this.radius = 2 + Math.random() * 3;
    this.speedY = 0.5 + Math.random() * 1.5;
    this.color = 'rgba(255, 255, 255, 0.7)';
  }

  update() {
    this.y += this.speedY;
    if (this.y > height) this.reset();
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
  }
}

const dots = [];
const DOT_COUNT = 150;
for (let i = 0; i < DOT_COUNT; i++) {
  dots.push(new Dot());
}

function animate() {
  ctx.clearRect(0, 0, width, height);
  dots.forEach(dot => {
    dot.update();
    dot.draw();
  });
  requestAnimationFrame(animate);
}

// On DOM loaded, initialize fade states and start typing + animation
window.addEventListener("DOMContentLoaded", () => {
  subtitle.classList.add("fade-in-hidden");
  button.classList.add("fade-in-hidden");

  // Force reflow so opacity 0 applies
  subtitle.offsetHeight;
  button.offsetHeight;

  // Start typing effect after short delay
  setTimeout(type, 50);

  // Start canvas animation
  animate();
});
