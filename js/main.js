/* ============================================
   Landing Page — Main JS
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  // ---- Card entrance animation ----
  const parisCard = document.getElementById('paris-card');
  const romeCard = document.getElementById('rome-card');
  const bgText = document.getElementById('landing-bg-text');

  // Animate background text
  if (bgText) {
    bgText.style.opacity = '0';
    bgText.style.transform = 'translate(-50%, -50%) scale(0.9)';
    bgText.style.transition = 'opacity 1.2s ease, transform 1.2s ease';
    setTimeout(() => {
      bgText.style.opacity = '1';
      bgText.style.transform = 'translate(-50%, -50%) scale(1)';
    }, 200);
  }

  // Animate cards in
  if (parisCard) {
    parisCard.style.transition = 'opacity 0.8s cubic-bezier(0.25,0.1,0.25,1), transform 0.8s cubic-bezier(0.34,1.56,0.64,1)';
    setTimeout(() => {
      parisCard.style.opacity = '1';
      parisCard.style.transform = 'rotate(-4deg) translateY(0)';
    }, 500);
  }

  if (romeCard) {
    romeCard.style.transition = 'opacity 0.8s cubic-bezier(0.25,0.1,0.25,1), transform 0.8s cubic-bezier(0.34,1.56,0.64,1)';
    setTimeout(() => {
      romeCard.style.opacity = '1';
      romeCard.style.transform = 'rotate(4deg) translateY(0)';
    }, 700);
  }

  // ---- Subtle mouse parallax on cards ----
  const landingPage = document.getElementById('landing-page');
  if (landingPage) {
    landingPage.addEventListener('mousemove', (e) => {
      const xCenter = window.innerWidth / 2;
      const yCenter = window.innerHeight / 2;
      const xOffset = (e.clientX - xCenter) / xCenter;
      const yOffset = (e.clientY - yCenter) / yCenter;

      if (parisCard) {
        parisCard.style.transform = `rotate(${-4 + xOffset * 1.5}deg) translateX(${xOffset * -8}px) translateY(${yOffset * -5}px)`;
      }
      if (romeCard) {
        romeCard.style.transform = `rotate(${4 + xOffset * 1.5}deg) translateX(${xOffset * 8}px) translateY(${yOffset * -5}px)`;
      }
    });
  }

  // ---- Cookie banner ----
  const cookieBanner = document.getElementById('cookie-banner');
  const cookieAccept = document.getElementById('cookie-accept');
  const cookieDecline = document.getElementById('cookie-decline');

  if (cookieBanner) {
    setTimeout(() => {
      cookieBanner.classList.add('visible');
    }, 2000);
  }

  const dismissCookie = () => {
    if (cookieBanner) {
      cookieBanner.classList.remove('visible');
    }
  };

  if (cookieAccept) cookieAccept.addEventListener('click', dismissCookie);
  if (cookieDecline) cookieDecline.addEventListener('click', dismissCookie);
});
