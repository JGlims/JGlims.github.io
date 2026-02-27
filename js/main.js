/**
 * main.js — João Gabriel Portfolio
 * 
 * Modules:
 *   1. Navigation (scroll detection, mobile menu)
 *   2. Typing Animation
 *   3. Scroll Reveal (IntersectionObserver)
 *   4. Particle Background
 *   5. Tilt Effect (cards)
 *   6. Smooth Scroll
 *   7. Active Section Tracking
 */

'use strict';

/**
 * Throttle function calls to at most once per `limit` ms.
 * Used for scroll and resize handlers to keep things performant.
 */
function throttle(fn, limit) {
  let waiting = false;
  return function (...args) {
    if (!waiting) {
      fn.apply(this, args);
      waiting = true;
      setTimeout(function () { waiting = false; }, limit);
    }
  };
}


/* ================================================================
   1. NAVIGATION
   ================================================================ */
function initNavigation() {
  var nav = document.getElementById('nav');
  var toggle = document.getElementById('navToggle');
  var mobileMenu = document.getElementById('mobileMenu');
  var mobileLinks = mobileMenu.querySelectorAll('.mobile-menu__link');

  var handleScroll = throttle(function () {
    if (window.scrollY > 50) {
      nav.classList.add('nav--scrolled');
    } else {
      nav.classList.remove('nav--scrolled');
    }
  }, 100);

  window.addEventListener('scroll', handleScroll, { passive: true });

  toggle.addEventListener('click', function () {
    var isActive = toggle.classList.toggle('nav__toggle--active');
    if (isActive) {
      mobileMenu.classList.add('mobile-menu--active');
      document.body.style.overflow = 'hidden';
    } else {
      mobileMenu.classList.remove('mobile-menu--active');
      document.body.style.overflow = '';
    }
  });

  for (var i = 0; i < mobileLinks.length; i++) {
    mobileLinks[i].addEventListener('click', function () {
      toggle.classList.remove('nav__toggle--active');
      mobileMenu.classList.remove('mobile-menu--active');
      document.body.style.overflow = '';
    });
  }
}


/* ================================================================
   2. TYPING ANIMATION
   ================================================================ */
function initTypingAnimation() {
  var el = document.getElementById('typedText');
  if (!el) return;

  var phrases = [
    ' · Cloud & Linux Enthusiast',
    ' · Computer Vision Builder',
    ' · Clean Architecture Advocate',
    ' · Python & C++ Developer',
    ' · Java & JavaScript Developer'
  ];

  var phraseIndex = 0;
  var charIndex = 0;
  var deleting = false;

  function tick() {
    var current = phrases[phraseIndex];

    if (!deleting) {
      charIndex++;
      el.textContent = current.substring(0, charIndex);

      if (charIndex === current.length) {
        deleting = true;
        setTimeout(tick, 2000);
        return;
      }
      setTimeout(tick, 60);
    } else {
      charIndex--;
      el.textContent = current.substring(0, charIndex);

      if (charIndex === 0) {
        deleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        setTimeout(tick, 400);
        return;
      }
      setTimeout(tick, 35);
    }
  }

  setTimeout(tick, 1200);
}


/* ================================================================
   3. SCROLL REVEAL (IntersectionObserver)
   ================================================================ */
function initScrollReveal() {
  var elements = document.querySelectorAll('.reveal');

  if (!('IntersectionObserver' in window)) {
    for (var i = 0; i < elements.length; i++) {
      elements[i].classList.add('reveal--visible');
    }
    return;
  }

  var observer = new IntersectionObserver(function (entries) {
    for (var i = 0; i < entries.length; i++) {
      if (entries[i].isIntersecting) {
        entries[i].target.classList.add('reveal--visible');
        observer.unobserve(entries[i].target);
      }
    }
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -60px 0px'
  });

  for (var i = 0; i < elements.length; i++) {
    observer.observe(elements[i]);
  }
}


/* ================================================================
   4. PARTICLE BACKGROUND (Canvas)
   ================================================================ */
function initParticles() {
  var container = document.querySelector('.hero__particles');
  if (!container) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  var canvas = document.createElement('canvas');
  canvas.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;';
  container.appendChild(canvas);

  var ctx = canvas.getContext('2d');
  var particles = [];
  var w, h;

  function resize() {
    w = canvas.width = container.offsetWidth;
    h = canvas.height = container.offsetHeight;
  }

  function seed() {
    var count = Math.min(Math.floor((w * h) / 15000), 80);
    particles = [];
    for (var i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        r: Math.random() * 1.5 + 0.5,
        o: Math.random() * 0.5 + 0.1
      });
    }
  }

  function frame() {
    ctx.clearRect(0, 0, w, h);

    for (var i = 0; i < particles.length; i++) {
      var p = particles[i];
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0) p.x = w;
      if (p.x > w) p.x = 0;
      if (p.y < 0) p.y = h;
      if (p.y > h) p.y = 0;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, 6.2832);
      ctx.fillStyle = 'rgba(99,102,241,' + p.o + ')';
      ctx.fill();

      for (var j = i + 1; j < particles.length; j++) {
        var q = particles[j];
        var dx = p.x - q.x;
        var dy = p.y - q.y;
        var dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 120) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(q.x, q.y);
          ctx.strokeStyle = 'rgba(99,102,241,' + (0.08 * (1 - dist / 120)) + ')';
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(frame);
  }

  resize();
  seed();
  frame();

  window.addEventListener('resize', throttle(function () {
    resize();
    seed();
  }, 250));
}


/* ================================================================
   5. TILT EFFECT
   ================================================================ */
function initTiltEffect() {
  if (window.matchMedia('(pointer: coarse)').matches) return;

  var cards = document.querySelectorAll('[data-tilt]');

  for (var i = 0; i < cards.length; i++) {
    (function (card) {
      card.addEventListener('mousemove', function (e) {
        var rect = card.getBoundingClientRect();
        var x = e.clientX - rect.left;
        var y = e.clientY - rect.top;
        var cx = rect.width / 2;
        var cy = rect.height / 2;

        var rotX = ((y - cy) / cy) * -4;
        var rotY = ((x - cx) / cx) * 4;

        card.style.transform =
          'perspective(800px) rotateX(' + rotX + 'deg) rotateY(' + rotY + 'deg) translateY(-4px)';
      });

      card.addEventListener('mouseleave', function () {
        card.style.transform = '';
        card.style.transition = 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
        setTimeout(function () { card.style.transition = ''; }, 500);
      });
    })(cards[i]);
  }
}


/* ================================================================
   6. SMOOTH SCROLL
   ================================================================ */
function initSmoothScroll() {
  var anchors = document.querySelectorAll('a[href^="#"]');

  for (var i = 0; i < anchors.length; i++) {
    anchors[i].addEventListener('click', function (e) {
      var href = this.getAttribute('href');
      if (href === '#') return;

      var target = document.querySelector(href);
      if (!target) return;

      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }
}


/* ================================================================
   7. ACTIVE SECTION TRACKING
   ================================================================ */
function initActiveSectionTracking() {
  var sections = document.querySelectorAll('section[id]');
  var navLinks = document.querySelectorAll('.nav__link');

  if (!sections.length || !navLinks.length) return;

  var observer = new IntersectionObserver(function (entries) {
    for (var i = 0; i < entries.length; i++) {
      if (entries[i].isIntersecting) {
        var id = entries[i].target.getAttribute('id');
        for (var j = 0; j < navLinks.length; j++) {
          if (navLinks[j].getAttribute('href') === '#' + id) {
            navLinks[j].classList.add('nav__link--active');
          } else {
            navLinks[j].classList.remove('nav__link--active');
          }
        }
      }
    }
  }, {
    threshold: 0.3,
    rootMargin: '-64px 0px -40% 0px'
  });

  for (var i = 0; i < sections.length; i++) {
    observer.observe(sections[i]);
  }
}


/* ================================================================
   BOOT
   ================================================================ */
document.addEventListener('DOMContentLoaded', function () {
  initNavigation();
  initTypingAnimation();
  initScrollReveal();
  initParticles();
  initTiltEffect();
  initSmoothScroll();
  initActiveSectionTracking();
});
