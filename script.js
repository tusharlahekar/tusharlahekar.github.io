// ===== PARTICLES =====
const canvas = document.getElementById('particles-canvas');
const ctx = canvas.getContext('2d');
let particles = [];
let animationId;

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

class Particle {
  constructor() { this.reset(); }
  reset() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 1.5 + 0.5;
    this.speedX = (Math.random() - 0.5) * 0.4;
    this.speedY = (Math.random() - 0.5) * 0.4;
    this.opacity = Math.random() * 0.5 + 0.1;
    this.color = Math.random() > 0.6 ? '139,92,246' : Math.random() > 0.5 ? '34,211,238' : '255,255,255';
  }
  update() {
    this.x += this.speedX; this.y += this.speedY;
    if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) this.reset();
  }
  draw() {
    ctx.beginPath(); ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${this.color},${this.opacity})`; ctx.fill();
  }
}

function initParticles() {
  particles = [];
  const count = Math.min(80, Math.floor((canvas.width * canvas.height) / 12000));
  for (let i = 0; i < count; i++) particles.push(new Particle());
}

function drawConnections() {
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x, dy = particles[i].y - particles[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 140) {
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.strokeStyle = `rgba(139,92,246,${0.06 * (1 - dist / 140)})`;
        ctx.lineWidth = 0.5; ctx.stroke();
      }
    }
  }
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => { p.update(); p.draw(); });
  drawConnections();
  animationId = requestAnimationFrame(animateParticles);
}
initParticles();
animateParticles();

// ===== NAVBAR =====
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) navbar.classList.add('scrolled');
  else navbar.classList.remove('scrolled');
  updateActiveNav();
});

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('open');
});

document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
  });
});

function updateActiveNav() {
  const sections = ['home', 'about', 'experience', 'projects', 'skills', 'contact'];
  const scrollY = window.scrollY + 100;
  sections.forEach(id => {
    const el = document.getElementById(id);
    const navEl = document.getElementById('nav-' + id);
    if (!el || !navEl) return;
    const top = el.offsetTop, bottom = top + el.offsetHeight;
    if (scrollY >= top && scrollY < bottom) {
      document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
      navEl.classList.add('active');
    }
  });
}

// ===== TYPED TEXT =====
const phrases = [
  'AI Engineer',
  'ML Specialist',
  'Speech AI Developer',
  'LLM & RAG Builder',
  'Backend Developer',
  'NLP Engineer'
];
let phraseIndex = 0, charIndex = 0, isDeleting = false;
const typedEl = document.getElementById('typed-text');

function typeText() {
  const current = phrases[phraseIndex];
  if (isDeleting) {
    typedEl.textContent = current.substring(0, charIndex - 1);
    charIndex--;
  } else {
    typedEl.textContent = current.substring(0, charIndex + 1);
    charIndex++;
  }
  let delay = isDeleting ? 60 : 100;
  if (!isDeleting && charIndex === current.length) { delay = 2200; isDeleting = true; }
  else if (isDeleting && charIndex === 0) { isDeleting = false; phraseIndex = (phraseIndex + 1) % phrases.length; delay = 400; }
  setTimeout(typeText, delay);
}
typeText();

// ===== SCROLL REVEAL =====
function revealOnScroll() {
  const revealEls = document.querySelectorAll('.section-header, .timeline-card, .project-card, .skill-category, .education-card, .cert-item, .contact-card, .stat-card, .about-text > *, .about-education > *');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('reveal', 'visible');
        }, i * 60);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

  revealEls.forEach(el => {
    el.classList.add('reveal');
    observer.observe(el);
  });
}
revealOnScroll();

// ===== CONTACT FORM =====
function handleFormSubmit(event) {
  event.preventDefault();
  const btn = document.getElementById('contact-submit-btn');
  const name = document.getElementById('contact-name').value;
  const email = document.getElementById('contact-email-input').value;
  const subject = document.getElementById('contact-subject').value;
  const message = document.getElementById('contact-message').value;

  btn.innerHTML = '<span>Sending...</span>';
  btn.disabled = true;

  // Create mailto link as fallback
  const mailtoLink = `mailto:tusharlahekar05@gmail.com?subject=${encodeURIComponent(subject || 'Portfolio Contact')}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`)}`;

  setTimeout(() => {
    window.location.href = mailtoLink;
    btn.innerHTML = '<span>Message Sent!</span><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>';
    btn.style.background = 'linear-gradient(135deg, #22c55e, #16a34a)';
    event.target.reset();
    setTimeout(() => {
      btn.innerHTML = '<span>Send Message</span><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>';
      btn.style.background = '';
      btn.disabled = false;
    }, 3000);
  }, 800);
}

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
  });
});

// ===== PROJECT CARD TILT =====
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left, y = e.clientY - rect.top;
    const cx = rect.width / 2, cy = rect.height / 2;
    const rotX = ((y - cy) / cy) * -6, rotY = ((x - cx) / cx) * 6;
    card.style.transform = `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateZ(10px)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

// ===== SKILL TAG HOVER EFFECT =====
document.querySelectorAll('.skill-tag').forEach(tag => {
  tag.addEventListener('mouseenter', function() {
    this.style.transform = 'scale(1.08) translateY(-2px)';
  });
  tag.addEventListener('mouseleave', function() {
    this.style.transform = '';
  });
});

// ===== LOGO CLICK =====
document.querySelector('.nav-logo').addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

console.log('%c👋 Hey there! Thanks for checking out Tushar\'s portfolio!', 'font-size: 16px; color: #8b5cf6; font-weight: bold;');
console.log('%cBuilt with pure HTML, CSS & JavaScript ✨', 'font-size: 13px; color: #22d3ee;');
