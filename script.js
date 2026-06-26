// ==========================================
// INTERACTIVE BACKGROUND & CURSOR GLOW
// ==========================================
const cursorGlow = document.getElementById('cursor-glow');

document.addEventListener('mousemove', (e) => {
  if (cursorGlow) {
    cursorGlow.style.left = e.clientX + 'px';
    cursorGlow.style.top = e.clientY + 'px';
  }
});

// ==========================================
// MOBILE MENU TOGGLE
// ==========================================
const menuToggle = document.getElementById('menu-toggle');
const navMenu = document.getElementById('nav-menu');

if (menuToggle && navMenu) {
  menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('open');
    navMenu.classList.toggle('open');
  });

  // Close menu when a link is clicked
  const navLinks = navMenu.querySelectorAll('a');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      menuToggle.classList.remove('open');
      navMenu.classList.remove('open');
    });
  });
}

// ==========================================
// NAVBAR SCROLL METRICS & ACTIVE STATE
// ==========================================
const navbar = document.getElementById('navbar');
const sections = document.querySelectorAll('section[id]');

function handleScrollEffects() {
  if (!navbar) return;

  // Add scrolled style
  if (window.scrollY > 40) {
    navbar.classList.add('navbar-scrolled');
  } else {
    navbar.classList.remove('navbar-scrolled');
  }

  // Active navigation link tracking
  const scrollY = window.pageYOffset + 120;

  sections.forEach(section => {
    const sectionHeight = section.offsetHeight;
    const sectionTop = section.offsetTop;
    const sectionId = section.getAttribute('id');
    const navLink = document.getElementById('nav-' + sectionId);

    if (navLink) {
      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        // Remove active class from all links
        document.querySelectorAll('.nav-menu a').forEach(el => el.classList.remove('active'));
        navLink.classList.add('active');
      }
    }
  });
}

window.addEventListener('scroll', handleScrollEffects);
// Initial trigger on load
handleScrollEffects();

// ==========================================
// TERMINAL TYPEWRITER SIMULATION
// ==========================================
const typewriterText = document.getElementById('typewriter-text');
const consolePhrases = [
  '"Active & open to full-time roles"',
  '"Building Speech AI & LLM solutions"',
  '"Transforming research into enterprise systems"',
  '"Based in Pune, India"'
];

let phraseIdx = 0;
let charIdx = 0;
let isRemoving = false;
let typeDelay = 100;

function typeConsole() {
  if (!typewriterText) return;

  const currentPhrase = consolePhrases[phraseIdx];

  if (isRemoving) {
    typewriterText.textContent = currentPhrase.substring(0, charIdx - 1);
    charIdx--;
    typeDelay = 40;
  } else {
    typewriterText.textContent = currentPhrase.substring(0, charIdx + 1);
    charIdx++;
    typeDelay = 80;
  }

  // State checking
  if (!isRemoving && charIdx === currentPhrase.length) {
    typeDelay = 2000; // Pause at end of phrase
    isRemoving = true;
  } else if (isRemoving && charIdx === 0) {
    isRemoving = false;
    phraseIdx = (phraseIdx + 1) % consolePhrases.length;
    typeDelay = 400; // Brief pause before typing next
  }

  setTimeout(typeConsole, typeDelay);
}

// Start Typewriter
setTimeout(typeConsole, 1000);

// ==========================================
// SCROLL REVEAL OBSERVER
// ==========================================
const revealElements = document.querySelectorAll(
  '.section-header, .bento-card, .timeline-item, .project-card, .skill-card, .contact-detail-card, .contact-form-wrap'
);

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, idx) => {
    if (entry.isIntersecting) {
      // Small staggered latency
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, idx * 40);
      revealObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
});

revealElements.forEach(el => {
  el.classList.add('reveal');
  revealObserver.observe(el);
});

// ==========================================
// INTERACTIVE PROJECT CARD GLOW
// ==========================================
const projectCards = document.querySelectorAll('.project-card');

projectCards.forEach(card => {
  const glow = card.querySelector('.project-glow');
  
  card.addEventListener('mousemove', (e) => {
    if (!glow) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Set custom variables for hover light targeting
    glow.style.left = (x - 150) + 'px';
    glow.style.top = (y - 150) + 'px';
  });
});

// ==========================================
// FORM HANDLING
// ==========================================
function handleFormSubmit(event) {
  event.preventDefault();
  
  const submitBtn = document.getElementById('contact-submit-btn');
  const nameVal = document.getElementById('contact-name').value;
  const emailVal = document.getElementById('contact-email-input').value;
  const subjectVal = document.getElementById('contact-subject').value;
  const messageVal = document.getElementById('contact-message').value;

  if (!submitBtn) return;

  const originalContent = submitBtn.innerHTML;
  submitBtn.disabled = true;
  submitBtn.innerHTML = 'Sending...';

  // Construct standard mailto link
  const emailSubject = encodeURIComponent(subjectVal || 'Portfolio Message');
  const emailBody = encodeURIComponent(`Name: ${nameVal}\nEmail: ${emailVal}\n\nMessage:\n${messageVal}`);
  const mailtoLink = `mailto:tusharlahekar05@gmail.com?subject=${emailSubject}&body=${emailBody}`;

  setTimeout(() => {
    // Open mail client
    window.location.href = mailtoLink;
    
    submitBtn.innerHTML = 'Success!';
    submitBtn.style.backgroundColor = 'var(--primary)';
    submitBtn.style.borderColor = 'var(--primary)';
    submitBtn.style.color = '#000';
    
    // Reset form
    event.target.reset();

    setTimeout(() => {
      submitBtn.innerHTML = originalContent;
      submitBtn.disabled = false;
      submitBtn.style.backgroundColor = '';
      submitBtn.style.borderColor = '';
      submitBtn.style.color = '';
    }, 3000);
  }, 600);
}

// Log professional footer note in console
console.log(
  '%c🚀 Tushar Lahekar - AI Engineer Portfolio initialized successfully.',
  'color: #10b981; font-weight: bold; font-size: 13px;'
);
