document.addEventListener('DOMContentLoaded', () => {
  const menuToggle = document.querySelector('.menu-toggle');
  const mainNav = document.querySelector('.main-nav');
  const navLinks = document.querySelectorAll('.main-nav a');
  const scrollTopBtn = document.querySelector('.scroll-top');
  const revealItems = document.querySelectorAll('.reveal');
  const siteHeader = document.querySelector('.site-header');

  // Toggle hamburger menu pada layar mobile
  if (menuToggle && mainNav) {
    menuToggle.addEventListener('click', () => {
      const isOpen = mainNav.classList.toggle('open');
      menuToggle.setAttribute('aria-expanded', String(isOpen));
    });
  }

  // Tutup menu setelah link navigasi diklik
  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      if (mainNav) {
        mainNav.classList.remove('open');
      }
      if (menuToggle) {
        menuToggle.setAttribute('aria-expanded', 'false');
      }
    });
  });

  // Smooth scrolling untuk tautan internal
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (event) => {
      const targetId = anchor.getAttribute('href');
      const targetElement = targetId ? document.querySelector(targetId) : null;

      if (targetElement) {
        event.preventDefault();
        targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // Animasi saat section masuk tampilan
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  revealItems.forEach((item) => observer.observe(item));

  // Tombol kembali ke atas
  const toggleScrollTop = () => {
    if (!scrollTopBtn) return;

    if (window.scrollY > 300) {
      scrollTopBtn.classList.add('visible');
    } else {
      scrollTopBtn.classList.remove('visible');
    }
  };

  window.addEventListener('scroll', toggleScrollTop);

  if (siteHeader) {
    const toggleHeaderState = () => {
      siteHeader.classList.toggle('scrolled', window.scrollY > 24);
    };

    toggleHeaderState();
    window.addEventListener('scroll', toggleHeaderState);
  }

  if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
});
