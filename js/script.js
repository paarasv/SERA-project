// ========== WAITLIST MODAL FUNCTIONS ==========

function openWaitlistModal() {
  document.getElementById('waitlistModal').classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeWaitlistModal() {
  document.getElementById('waitlistModal').classList.remove('active');
  document.body.style.overflow = 'auto';
  resetForm();
}

function resetForm() {
  document.getElementById('waitlistForm').reset();
  document.getElementById('successMessage').classList.remove('show');
  document.querySelector('.form-wrapper').style.display = 'block';
}

function handleWaitlistSubmit(e) {
  e.preventDefault();
  const form = document.getElementById('waitlistForm');
  const successMessage = document.getElementById('successMessage');
  const formData = new FormData(form);

  fetch('https://formspree.io/f/mbdaeaol', {
    method: 'POST',
    body: formData,
    headers: {
      'Accept': 'application/json'
    }
  })
    .then(response => {
      if (response.ok) {
        form.style.display = 'none';
        successMessage.classList.add('show');
        setTimeout(() => {
          closeWaitlistModal();
        }, 3000);
      } else {
        return response.json().then(data => {
          alert(data.error || 'There was a problem. Please try again.');
        });
      }
    })
    .catch(() => {
      alert('There was a problem. Please try again.');
    });
}

// Close modal when clicking outside
document.getElementById('waitlistModal').addEventListener('click', function(e) {
  if (e.target === this) {
    closeWaitlistModal();
  }
});

// ========== CUSTOM CURSOR ==========

const cursor = document.getElementById('cursor');
const ring = document.getElementById('cursorRing');
let mx = 0, my = 0, rx = 0, ry = 0;

document.addEventListener('mousemove', e => {
  mx = e.clientX;
  my = e.clientY;
  cursor.style.left = mx - 4 + 'px';
  cursor.style.top = my - 4 + 'px';
});

function animateRing() {
  rx += (mx - rx) * 0.12;
  ry += (my - ry) * 0.12;
  ring.style.left = rx - 18 + 'px';
  ring.style.top = ry - 18 + 'px';
  requestAnimationFrame(animateRing);
}
animateRing();

// Cursor hover effects
document.querySelectorAll('a, button, .form-input').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.style.transform = 'scale(2.5)';
    ring.style.transform = 'scale(1.5)';
    ring.style.borderColor = 'rgba(201,169,110,0.7)';
  });
  el.addEventListener('mouseleave', () => {
    cursor.style.transform = 'scale(1)';
    ring.style.transform = 'scale(1)';
    ring.style.borderColor = 'rgba(201,169,110,0.4)';
  });
});

// ========== SCROLL REVEAL ==========

const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1 });

reveals.forEach(el => observer.observe(el));

// ========== SMOOTH SCROLL & MODAL TRIGGER ==========

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const href = this.getAttribute('href');
    
    if (href === '#waitlist') {
      openWaitlistModal();
    } else {
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
  });
});

// ========== PARALLAX EFFECT ==========

const seraCharacter = document.querySelector('.sera-character');
if (seraCharacter) {
  document.addEventListener('mousemove', (e) => {
    const moveX = (e.clientX - window.innerWidth / 2) * 0.02;
    const moveY = (e.clientY - window.innerHeight / 2) * 0.02;
    seraCharacter.style.transform = `translate(${moveX}px, ${moveY}px)`;
  });
}

// ========== ELEMENT ANIMATIONS ==========

const animatedElements = document.querySelectorAll('.card, .phase-item, .promise-block');
const elementObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
    }
  });
}, { threshold: 0.2 });

animatedElements.forEach(el => elementObserver.observe(el));

document.getElementById('waitlistForm').addEventListener('submit', handleWaitlistSubmit);