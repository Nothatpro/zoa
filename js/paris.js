/* ============================================
   Paris Page — Animations & Interactions
   Uses: GSAP, ScrollTrigger, Draggable, Lenis
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ============================================
  // 1. LENIS SMOOTH SCROLL
  // ============================================
  const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: 'vertical',
    smoothWheel: true,
  });

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);

  // Connect Lenis to GSAP ScrollTrigger
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });
  gsap.ticker.lagSmoothing(0);

  // ============================================
  // 2. NAVBAR SCROLL EFFECT
  // ============================================
  const navbar = document.getElementById('navbar');
  const hero = document.getElementById('hero');

  if (navbar && hero) {
    ScrollTrigger.create({
      trigger: hero,
      start: 'bottom top+=80',
      onEnter: () => navbar.classList.add('scrolled'),
      onLeaveBack: () => navbar.classList.remove('scrolled'),
    });
  }

  // ============================================
  // 3. HERO HEADLINE TEXT REVEAL
  // ============================================
  const headline = document.getElementById('hero-headline');
  if (headline) {
    const text = headline.textContent.trim();
    const words = text.split(/\s+/);
    headline.innerHTML = words.map(word =>
      `<span class="word"><span>${word}</span></span> `
    ).join('');

    // Trigger reveal
    setTimeout(() => {
      headline.classList.add('revealed');
      const wordSpans = headline.querySelectorAll('.word span');
      wordSpans.forEach((span, i) => {
        span.style.transitionDelay = `${0.1 + i * 0.06}s`;
      });
    }, 400);
  }

  // ============================================
  // 4. SCROLL REVEAL ANIMATIONS
  // ============================================
  const revealElements = document.querySelectorAll('.reveal');
  revealElements.forEach((el) => {
    ScrollTrigger.create({
      trigger: el,
      start: 'top 85%',
      once: true,
      onEnter: () => el.classList.add('revealed'),
    });
  });

  // ============================================
  // 5. PARALLAX COLLAGE CARDS + STARS (Editorial)
  // ============================================
  const collageCards = document.querySelectorAll('.collage-card');
  const collageStars = document.querySelectorAll('.collage-star');
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!prefersReducedMotion) {
    // Parallax for image cards
    collageCards.forEach((card) => {
      const speed = parseFloat(card.dataset.parallaxSpeed) || 0.15;
      const dir = card.dataset.parallaxDir === 'down' ? 1 : -1;
      const distance = 120 * speed * dir;

      gsap.to(card, {
        y: distance,
        ease: 'none',
        scrollTrigger: {
          trigger: card,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.2,
        },
      });
    });

    // Parallax for decorative stars
    collageStars.forEach((star) => {
      const speed = parseFloat(star.dataset.parallaxSpeed) || 0.1;
      const dir = star.dataset.parallaxDir === 'down' ? 1 : -1;
      const distance = 80 * speed * dir;

      gsap.to(star, {
        y: distance,
        ease: 'none',
        scrollTrigger: {
          trigger: '.collage-section',
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      });
    });
  }

  // Stars idle rotation
  collageStars.forEach((star, i) => {
    gsap.to(star, {
      rotation: 360,
      duration: 20 + i * 8,
      repeat: -1,
      ease: 'none',
    });
  });

  // ============================================
  // 6. EXPERIENCE CARDS — SCALE IN EFFECT
  // ============================================
  const expCards = document.querySelectorAll('.experience-card');
  expCards.forEach((card, i) => {
    gsap.from(card, {
      scale: 0.92,
      opacity: 0,
      y: 60,
      duration: 0.8,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: card,
        start: 'top 85%',
        once: true,
      },
    });
  });

  // ============================================
  // 7. TILTED BANDS — SCROLL-DRIVEN SPEED
  // ============================================
  const bands = document.querySelectorAll('.band');
  bands.forEach((band, i) => {
    const direction = i % 2 === 0 ? -1 : 1;
    gsap.to(band.querySelector('.band-track'), {
      x: () => direction * 100,
      ease: 'none',
      scrollTrigger: {
        trigger: band,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1.5,
      },
    });
  });

  // ============================================
  // 8. EXPERIENCE LIST — STAGGERED ENTRY
  // ============================================
  const expListRows = document.querySelectorAll('.experience-list-row');
  expListRows.forEach((row, i) => {
    gsap.from(row, {
      opacity: 0,
      y: 30,
      duration: 0.6,
      delay: i * 0.08,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: row,
        start: 'top 90%',
        once: true,
      },
    });
  });

  // ============================================
  // 9. WALL OF LOVE — DRAGGABLE CARDS
  // ============================================
  const wallCards = document.querySelectorAll('.wall-card');
  if (wallCards.length > 0 && typeof Draggable !== 'undefined') {
    wallCards.forEach((card) => {
      Draggable.create(card, {
        type: 'x,y',
        edgeResistance: 0.65,
        bounds: '#wall-of-love',
        inertia: true,
        onPress: function() {
          gsap.to(this.target, { scale: 1.05, duration: 0.2, zIndex: 100 });
        },
        onRelease: function() {
          gsap.to(this.target, { scale: 1, duration: 0.3, zIndex: 3 });
        },
      });
    });
  }

  // ============================================
  // 10. MENU OVERLAY
  // ============================================
  const menuOpen = document.getElementById('menu-open');
  const menuClose = document.getElementById('menu-close');
  const menuOverlay = document.getElementById('menu-overlay');

  if (menuOpen && menuOverlay) {
    menuOpen.addEventListener('click', () => {
      menuOverlay.classList.add('active');
      document.body.style.overflow = 'hidden';
      // Prevent lenis scrolling
      lenis.stop();
    });
  }

  if (menuClose && menuOverlay) {
    menuClose.addEventListener('click', () => {
      menuOverlay.classList.remove('active');
      document.body.style.overflow = '';
      lenis.start();
    });
  }

  // Close menu on link click
  const menuLinks = document.querySelectorAll('.menu-overlay-link');
  menuLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (menuOverlay) {
        menuOverlay.classList.remove('active');
        document.body.style.overflow = '';
        lenis.start();
      }
    });
  });

  // ============================================
  // 11. COOKIE BANNER
  // ============================================
  const cookieBanner = document.getElementById('cookie-banner');
  const cookieAccept = document.getElementById('cookie-accept');
  const cookieDecline = document.getElementById('cookie-decline');

  if (cookieBanner) {
    setTimeout(() => {
      cookieBanner.classList.add('visible');
    }, 2500);
  }

  const dismissCookie = () => {
    if (cookieBanner) cookieBanner.classList.remove('visible');
  };

  if (cookieAccept) cookieAccept.addEventListener('click', dismissCookie);
  if (cookieDecline) cookieDecline.addEventListener('click', dismissCookie);

  // ============================================
  // 12. HERO PARALLAX SCROLL
  // ============================================
  const heroBg = document.querySelector('.hero-bg');
  if (heroBg) {
    gsap.to(heroBg, {
      y: 150,
      scale: 1.15,
      ease: 'none',
      scrollTrigger: {
        trigger: '.hero',
        start: 'top top',
        end: 'bottom top',
        scrub: 1,
      },
    });
  }

  // ============================================
  // 13. WALL OF LOVE TEXT PARALLAX
  // ============================================
  const wallBgText = document.querySelector('.wall-bg-text');
  if (wallBgText) {
    gsap.from(wallBgText, {
      scale: 0.85,
      opacity: 0.3,
      scrollTrigger: {
        trigger: '.wall-section',
        start: 'top 80%',
        end: 'center center',
        scrub: 1,
      },
    });
  }

  // ============================================
  // 14. FOOTER BRAND TEXT SCALE
  // ============================================
  const footerBrand = document.querySelector('.footer-brand-text');
  if (footerBrand) {
    gsap.from(footerBrand, {
      scale: 0.7,
      opacity: 0,
      scrollTrigger: {
        trigger: '.footer-brand',
        start: 'top 85%',
        end: 'center center',
        scrub: 1,
      },
    });
  }

  // ============================================
  // 15. SMOOTH SCROLL FOR ANCHOR LINKS
  // ============================================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (targetId === '#') return;
      e.preventDefault();
      const target = document.querySelector(targetId);
      if (target) {
        lenis.scrollTo(target, { offset: -80 });
      }
    });
  });

  // ============================================
  // 16. EXPERIENCE LIST — HOVER IMAGE PREVIEW
  // ============================================
  const expRows = document.querySelectorAll('.experience-list-row');
  expRows.forEach(row => {
    const thumb = row.querySelector('.exp-list-thumb');
    if (thumb) {
      row.addEventListener('mouseenter', () => {
        gsap.to(thumb, {
          width: 60,
          height: 60,
          opacity: 1,
          duration: 0.35,
          ease: 'power2.out',
        });
      });
      row.addEventListener('mouseleave', () => {
        gsap.to(thumb, {
          width: 0,
          height: 0,
          opacity: 0,
          duration: 0.25,
          ease: 'power2.in',
        });
      });
    }
  });

  // ============================================
  // 17. UNLOCK SECTION PARALLAX
  // ============================================
  const unlockSection = document.getElementById('unlock');
  if (unlockSection) {
    const unlockHeading = unlockSection.querySelector('.unlock-heading');
    if (unlockHeading) {
      gsap.to(unlockHeading, {
        y: -30,
        ease: 'none',
        scrollTrigger: {
          trigger: unlockSection,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.5,
        },
      });
    }
  }

  // ============================================
  // 19. CURSOR IMAGE TRAIL — UNLOCK SECTION
  // ============================================
  ;(function initCursorTrail() {
    const trailContainer = document.getElementById('cursor-trail-layer');
    const section = document.getElementById('unlock');
    if (!trailContainer || !section) return;

    // Respect prefers-reduced-motion
    const prefersReduce = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (prefersReduce.matches) return;

    // Desktop only (>1024px)
    const isDesktop = window.matchMedia('(min-width: 1025px)');
    if (!isDesktop.matches) return;

    // ─── IMAGE URLS ───────────────────────────────
    // ✦ REPLACE THESE with your own image URLs ✦
    const trailImages = [
      'https://images.unsplash.com/photo-1431274172761-fca41d930114?w=300&q=75',
      'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=300&q=75',
      'https://images.unsplash.com/photo-1549488344-1f9b8d2bd1f3?w=300&q=75',
      'https://images.unsplash.com/photo-1555507036-ab1f4038024a?w=300&q=75',
      'https://images.unsplash.com/photo-1569864358642-9d1684040f43?w=300&q=75',
      'https://images.unsplash.com/photo-1543349689-9a4d426bee8e?w=300&q=75',
      'https://images.unsplash.com/photo-1471943311424-646960669fbc?w=300&q=75',
      'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=300&q=75',
    ];
    // ──────────────────────────────────────────────

    // Preload images
    trailImages.forEach(src => {
      const img = new Image();
      img.src = src;
    });

    let imgIndex = 0;
    let lastX = 0;
    let lastY = 0;
    let lastTimestamp = 0;
    const THROTTLE_MS = 100;       // Min ms between spawns
    const DISTANCE_THRESHOLD = 60; // Min px mouse must travel
    const MAX_TRAIL = 12;          // Max images on screen
    const LIFE_DURATION = 1800;    // ms before fade-out starts
    const FADE_DURATION = 800;     // ms for fade-out animation
    let activeCount = 0;

    function spawnTrailImage(x, y) {
      if (activeCount >= MAX_TRAIL) return;

      const rect = section.getBoundingClientRect();
      const relX = x - rect.left;
      const relY = y - rect.top;

      const img = document.createElement('img');
      img.src = trailImages[imgIndex % trailImages.length];
      img.className = 'cursor-trail-img';
      img.alt = '';
      img.draggable = false;

      // Random rotation between -12 and +12 degrees
      const rotation = (Math.random() - 0.5) * 24;
      // Offset so the image is centered-ish around cursor
      const offsetX = relX - 60;
      const offsetY = relY - 80;

      img.style.left = offsetX + 'px';
      img.style.top = offsetY + 'px';
      img.style.setProperty('--rotation', rotation + 'deg');
      img.style.transform = `scale(0.6) rotate(${rotation}deg)`;

      // Override animation to include rotation
      img.style.animation = 'none';
      // Force reflow
      void img.offsetWidth;
      img.style.animation = '';

      // Custom keyframe with rotation baked in
      img.animate([
        { opacity: 0, transform: `scale(0.5) rotate(${rotation}deg) translateY(10px)` },
        { opacity: 0.85, transform: `scale(1) rotate(${rotation}deg) translateY(0)` }
      ], {
        duration: 500,
        easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
        fill: 'forwards'
      });

      trailContainer.appendChild(img);
      activeCount++;
      imgIndex++;

      // Schedule fade-out
      setTimeout(() => {
        const fadeAnim = img.animate([
          { opacity: 0.85, transform: `scale(1) rotate(${rotation}deg)` },
          { opacity: 0, transform: `scale(0.75) rotate(${rotation + 3}deg) translateY(8px)` }
        ], {
          duration: FADE_DURATION,
          easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
          fill: 'forwards'
        });

        fadeAnim.onfinish = () => {
          img.remove();
          activeCount--;
        };
      }, LIFE_DURATION);
    }

    function handleMouseMove(e) {
      const now = performance.now();
      const dx = e.clientX - lastX;
      const dy = e.clientY - lastY;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (now - lastTimestamp < THROTTLE_MS) return;
      if (distance < DISTANCE_THRESHOLD && lastTimestamp !== 0) return;

      lastX = e.clientX;
      lastY = e.clientY;
      lastTimestamp = now;

      requestAnimationFrame(() => {
        spawnTrailImage(e.clientX, e.clientY);
      });
    }

    section.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Clean up on resize to non-desktop
    isDesktop.addEventListener('change', (e) => {
      if (!e.matches) {
        section.removeEventListener('mousemove', handleMouseMove);
        trailContainer.innerHTML = '';
        activeCount = 0;
      } else {
        section.addEventListener('mousemove', handleMouseMove, { passive: true });
      }
    });
  })();

  // ============================================
  // 18. MARQUEE — SCROLL VELOCITY EFFECT
  // ============================================
  const marqueeTrack = document.getElementById('marquee-track');
  if (marqueeTrack) {
    // Speed up marquee on scroll
    ScrollTrigger.create({
      trigger: '.marquee-section',
      start: 'top bottom',
      end: 'bottom top',
      onUpdate: (self) => {
        const velocity = Math.abs(self.getVelocity());
        const speedFactor = Math.min(velocity / 2000, 2);
        const baseSpeed = 25;
        const newSpeed = Math.max(baseSpeed - speedFactor * 15, 5);
        marqueeTrack.style.animationDuration = `${newSpeed}s`;
      },
    });
  }

});
