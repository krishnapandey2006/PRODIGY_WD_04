document.addEventListener('DOMContentLoaded', () => {
  // year in footer
  document.getElementById('year').textContent = new Date().getFullYear();

  // Smooth scrolling for navigation links
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    link.addEventListener('click', e => {
      const targetId = link.getAttribute('href');
      if(targetId.startsWith('#')){
        e.preventDefault();
        const section = document.querySelector(targetId);
        if(section){
          section.scrollIntoView({behavior:'smooth', block:'start'});
        }
      }
    });
  });

  // Back to top button
  const backToTop = document.querySelector('.back-to-top');
  if (backToTop) {
    backToTop.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({top: 0, behavior: 'smooth'});
    });
  }



  // Create animated particles background
  createParticles();

  // Animate stat counters
  animateCounters();

  // Animate skill bars when they come into view
  animateSkillBars();

  // Add 3D tilt effect to project cards
  initTiltEffect();

  // Intersection Observer for animations
  initIntersectionObserver();
});

// Create animated particles background
function createParticles() {
  const particlesContainer = document.getElementById('particles');
  if (!particlesContainer) return;
  
  const particleCount = 30;
  
  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.classList.add('particle');
    
    // Random properties
    const size = Math.random() * 10 + 2;
    const posX = Math.random() * 100;
    const posY = Math.random() * 100;
    const delay = Math.random() * 15;
    const duration = Math.random() * 10 + 15;
    
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.left = `${posX}%`;
    particle.style.top = `${posY}%`;
    particle.style.animationDelay = `${delay}s`;
    particle.style.animationDuration = `${duration}s`;
    
    particlesContainer.appendChild(particle);
  }
}

// Animate stat counters
function animateCounters() {
  const counters = document.querySelectorAll('.stat-number');
  counters.forEach(counter => {
    const target = +counter.getAttribute('data-target');
    const increment = target / 100;
    let current = 0;
    
    const updateCounter = () => {
      current += increment;
      if (current < target) {
        counter.innerText = Math.ceil(current);
        setTimeout(updateCounter, 20);
      } else {
        counter.innerText = target;
      }
    };
    
    // Start animation when element is in viewport
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          updateCounter();
          observer.unobserve(counter);
        }
      });
    }, { threshold: 0.5 });
    
    observer.observe(counter);
  });
}

// Animate skill bars
function animateSkillBars() {
  const skillBars = document.querySelectorAll('.skill-progress-fill');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const bar = entry.target;
        const width = bar.getAttribute('data-width');
        bar.style.width = width;
      }
    });
  }, { threshold: 0.5 });
  
  skillBars.forEach(bar => {
    observer.observe(bar);
  });
}

// Initialize 3D tilt effect for project cards
function initTiltEffect() {
  const cards = document.querySelectorAll('[data-tilt]');
  
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateY = (x - centerX) / 20;
      const rotateX = (centerY - y) / 20;
      
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
    });
  });
}

// Intersection Observer for animations
function initIntersectionObserver() {
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animated');
      }
    });
  }, observerOptions);
  
  // Observe elements that should animate when scrolled into view
  const animateElements = document.querySelectorAll(
    '.hero-content, .hero-card, .about-text, .about-stats, .skill-category, .project-card, .timeline-item, .contact-card'
  );
  
  animateElements.forEach(el => {
    observer.observe(el);
  });
}

// Add scroll event listener for header effect
window.addEventListener('scroll', () => {
  const header = document.querySelector('.site-header');
  if (window.scrollY > 50) {
    header.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.3)';
    header.style.background = 'rgba(3,7,18,0.95)';
  } else {
    header.style.boxShadow = 'none';
    header.style.background = 'rgba(3,7,18,0.85)';
  }
});
