// Typing effect variables and function
let text = "Hello World, I'm Gustav👋"; // default
let showSubtitleAndButton = true;       // default: show subtitle and button

const path = window.location.pathname;
if (path.includes("about.html") || path.includes("/about")) {
  text = "About Me";
  showSubtitleAndButton = false;
}

const typedEl = document.getElementById("typed");
const subtitle = document.getElementById("subtitle");
const button = document.getElementById("button");
const description = document.querySelector(".about-description"); // fade target
const coverPhoto = document.querySelector(".cover-photo");        // new fade target
let i = 0;

function type() {
  const cursor = typedEl.querySelector('.cursor');
  if (i < text.length) {
    const charSpan = document.createTextNode(text.charAt(i));
    typedEl.insertBefore(charSpan, cursor);
    i++;
    setTimeout(type, 100);
  } else {
    if (showSubtitleAndButton && subtitle && button) {
      setTimeout(() => {
        subtitle.classList.add("fade-in-visible");
        setTimeout(() => {
          button.classList.add("fade-in-visible");
        }, 600);
      }, 300);
    } else {
      if (subtitle) subtitle.style.display = "none";
      if (button) button.style.display = "none";

      // Fade in description and cover photo
      if (description) {
        setTimeout(() => {
          description.classList.add("fade-in-visible");
        }, 400);
      }
      if (coverPhoto) {
        setTimeout(() => {
          coverPhoto.classList.add("fade-in-visible");
        }, 400);
      }
    }
  }
}

// Rain of dots background (no mouse interaction)
const canvas = document.getElementById('dots-canvas');
if (canvas) {
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

  window.addEventListener("DOMContentLoaded", () => {
    // Prepare subtitle and button
    if (subtitle && button) {
      subtitle.classList.add("fade-in-hidden");
      button.classList.add("fade-in-hidden");
      subtitle.offsetHeight;
      button.offsetHeight;
    }

    // Prepare description and image
    if (description) {
      description.classList.add("fade-in-hidden");
      description.offsetHeight;
    }
    if (coverPhoto) {
      coverPhoto.classList.add("fade-in-hidden");
      coverPhoto.offsetHeight;
    }

    // Clear previous typed text except cursor
    if (typedEl) {
      const cursor = typedEl.querySelector('.cursor');
      [...typedEl.childNodes].forEach(node => {
        if (node !== cursor) typedEl.removeChild(node);
      });
    }

    // Start typing + background
    setTimeout(type, 50);
    animate();
  });
}

// Projects Slide in Animation
document.addEventListener('DOMContentLoaded', () => {
  const leftBoxes = document.querySelectorAll('.slide-in-left');
  const rightBoxes = document.querySelectorAll('.slide-in-right');

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        if (entry.target.classList.contains('slide-in-left')) {
          entry.target.classList.add('animate-left');
        } else if (entry.target.classList.contains('slide-in-right')) {
          entry.target.classList.add('animate-right');
        }
        observer.unobserve(entry.target); // optional: animate only once
      }
    });
  }, { threshold: 0.2 });

  leftBoxes.forEach(box => observer.observe(box));
  rightBoxes.forEach(box => observer.observe(box));
});
