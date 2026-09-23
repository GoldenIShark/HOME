document.addEventListener('DOMContentLoaded', () => {
  const whatsappNumber = '6289630984238';
  const menuToggle = document.querySelector('.menu-toggle');
  const mainNav = document.querySelector('.main-nav');
  const navLinks = document.querySelectorAll('.main-nav a');
  const scrollTopBtn = document.querySelector('.scroll-top');
  const revealItems = document.querySelectorAll('.reveal');
  const siteHeader = document.querySelector('.site-header');
  const packageList = document.querySelector('#package-list');

  const pesanPaket = (namaPaket, harga) => {
    const message = namaPaket === 'Custom'
      ? 'Halo Shark Studio, saya ingin berkonsultasi mengenai Paket Custom. Saya memiliki kebutuhan website yang ingin saya diskusikan.'
      : `Halo Shark Studio, saya tertarik dengan Paket ${namaPaket} dengan harga ${harga}. Saya ingin mengetahui informasi lebih lanjut mengenai paket tersebut.`;
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  const bindPackageButtons = () => {
    packageList.querySelectorAll('.package-order').forEach((button) => {
      button.addEventListener('click', (event) => {
        event.preventDefault();
        pesanPaket(button.dataset.packageName, button.dataset.packagePrice);
      });
    });
  };

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

  // Render daftar paket dari file JSON
  if (packageList) {
    fetch('data/packages.json')
      .then((response) => {
        if (!response.ok) throw new Error('Gagal memuat data paket');
        return response.json();
      })
      .then((packages) => {
        packageList.innerHTML = packages.map((pkg) => {
          const tierClass = `package-card--${pkg.name.toLowerCase()}`;
          return `
            <article class="package-card ${tierClass}${pkg.featured ? ' featured' : ''} reveal">
              <div class="package-badge">${pkg.badge}</div>
              <div>
                <h3>${pkg.name}</h3>
                <p class="package-price">${pkg.price}</p>
                <p class="package-estimate">Estimasi: ${pkg.estimate}</p>
              </div>
              <ul class="package-features">
                ${pkg.features.map((feature) => `<li>${feature}</li>`).join('')}
              </ul>
              ${pkg.customNote ? `<p class="package-custom-note">${pkg.customNote}</p>` : ''}
              <a href="${pkg.href}" data-package-name="${pkg.name}" data-package-price="${pkg.price}" class="btn package-order ${pkg.name === 'Custom' ? 'btn-secondary' : 'btn-primary'}">${pkg.button}</a>
            </article>
          `;
        }).join('');

        const newRevealItems = packageList.querySelectorAll('.reveal');
        newRevealItems.forEach((item) => observer.observe(item));
        bindPackageButtons();
      })
      .catch(() => {
        packageList.innerHTML = `
          <article class="package-card package-card--basic reveal">
            <div class="package-badge">Starter</div>
            <div>
              <h3>Basic</h3>
              <p class="package-price">Rp100.000</p>
            </div>
            <ul class="package-features">
              <li>1 halaman website</li>
              <li>Responsive untuk HP</li>
              <li>Desain sederhana</li>
              <li>Informasi/profil</li>
              <li>Tombol kontak</li>
            </ul>
            <a href="#contact" data-package-name="Basic" data-package-price="Rp100.000" class="btn btn-primary package-order">Pesan Paket</a>
          </article>
        `;
        const fallbackItem = packageList.querySelector('.reveal');
        if (fallbackItem) observer.observe(fallbackItem);
        bindPackageButtons();
      });
  }

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
