const loader = document.querySelector('#loader');
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const modal = document.querySelector('#image-modal');
const articleModal = document.querySelector('#article-modal');
const toast = document.querySelector('#toast');

window.addEventListener('load', () => {
  window.setTimeout(() => loader.classList.add('done'), 650);
});

menuToggle.addEventListener('click', () => {
  const isOpen = menuToggle.classList.toggle('open');
  navLinks.classList.toggle('open', isOpen);
  menuToggle.setAttribute('aria-expanded', String(isOpen));
});

document.querySelectorAll('.nav-links a').forEach((link) => {
  link.addEventListener('click', () => {
    menuToggle.classList.remove('open');
    navLinks.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
  });
});

const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element));

const closeModal = (element) => {
  element.hidden = true;
  document.body.classList.remove('modal-open');
};
const openModal = (element) => {
  element.hidden = false;
  document.body.classList.add('modal-open');
  element.querySelector('.modal-close').focus();
};

document.querySelectorAll('.gallery-item').forEach((item) => {
  item.addEventListener('click', () => {
    document.querySelector('#modal-image').src = item.dataset.image;
    document.querySelector('#modal-image').alt = item.dataset.title;
    document.querySelector('#modal-title').textContent = item.dataset.title;
    openModal(modal);
  });
});

const articles = [
  ['Satu langkah kecil, sebuah pencapaian besar', 'Tim siswa SMA Cakrawala Nusa berhasil meraih juara dalam kompetisi inovasi pelajar tingkat nasional. Di balik penghargaan ini ada proses riset, diskusi panjang, dan keberanian untuk menyempurnakan ide berkali-kali.'],
  ['Studio digital perdana resmi dibuka', 'Studio digital menjadi ruang baru bagi siswa untuk mengeksplorasi coding, desain, fotografi, dan media. Ruang ini akan dipakai lintas program untuk membuat karya yang bermanfaat.'],
  ['Belajar berarti berbagi dengan sesama', 'Melalui Gerakan Cakrawala Berbagi, siswa belajar bahwa kepedulian tidak harus menunggu dewasa. Mereka merancang kegiatan, turun langsung, dan mendengarkan kebutuhan masyarakat.']
];
document.querySelectorAll('[data-article]').forEach((item) => {
  item.addEventListener('click', () => {
    const article = articles[Number(item.dataset.article)];
    document.querySelector('#article-title').textContent = article[0];
    document.querySelector('#article-copy').textContent = article[1];
    openModal(articleModal);
  });
});

document.querySelectorAll('.modal').forEach((element) => {
  element.querySelector('.modal-backdrop').addEventListener('click', () => closeModal(element));
  element.querySelector('.modal-close').addEventListener('click', () => closeModal(element));
});
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    if (!modal.hidden) closeModal(modal);
    if (!articleModal.hidden) closeModal(articleModal);
  }
});

document.querySelectorAll('.faq-item button').forEach((button) => {
  button.addEventListener('click', () => {
    const item = button.parentElement;
    const isOpen = item.classList.toggle('open');
    button.setAttribute('aria-expanded', String(isOpen));
  });
});

document.querySelector('.demo-button').addEventListener('click', () => {
  toast.classList.add('show');
  window.setTimeout(() => toast.classList.remove('show'), 3200);
});