// Header solid on scroll
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  header.classList.toggle('solid', window.scrollY > 60);
}, { passive: true });

// Hero zoom-in on load
const heroBg = document.querySelector('.hero-bg');
requestAnimationFrame(() => document.querySelector('.hero').classList.add('loaded'));

// Burger menu
const burger = document.getElementById('burger');
const nav = document.getElementById('nav');
burger.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  header.classList.toggle('solid');
  // Блокируем скролл страницы при открытом меню
  document.body.style.overflow = isOpen ? 'hidden' : '';
});
nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  nav.classList.remove('open');
  document.body.style.overflow = '';
}));

// Gallery filter
document.querySelectorAll('.gf').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.gf').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const f = btn.dataset.f;
    document.querySelectorAll('.gi').forEach(el => {
      el.classList.toggle('hidden', f !== 'all' && el.dataset.c !== f);
    });
  });
});

// Lightbox
const lb = document.getElementById('lb');
const lbImg = document.getElementById('lbImg');
const lbTxt = document.getElementById('lbTxt');
const lbX = document.getElementById('lbX');
const lbP = document.getElementById('lbP');
const lbN = document.getElementById('lbN');
let pool = [], cur = 0;

function getPool() {
  return [...document.querySelectorAll('.gi:not(.hidden)')].map(el => ({
    src: el.querySelector('img').src,
    cap: el.querySelector('span').textContent.trim()
  }));
}
function openLb(i) {
  pool = getPool(); cur = i;
  lbImg.src = pool[cur].src; lbTxt.textContent = pool[cur].cap;
  lb.classList.add('open'); document.body.style.overflow = 'hidden';
}
function closeLb() { lb.classList.remove('open'); document.body.style.overflow = ''; }
function step(d) {
  cur = (cur + d + pool.length) % pool.length;
  lbImg.src = pool[cur].src; lbTxt.textContent = pool[cur].cap;
}

document.querySelectorAll('.gi').forEach(el => {
  el.addEventListener('click', () => {
    const visible = [...document.querySelectorAll('.gi:not(.hidden)')];
    const i = visible.indexOf(el);
    if (i !== -1) openLb(i);
  });
});
lbX.addEventListener('click', closeLb);
lbP.addEventListener('click', () => step(-1));
lbN.addEventListener('click', () => step(1));
lb.addEventListener('click', e => { if (e.target === lb) closeLb(); });
document.addEventListener('keydown', e => {
  if (!lb.classList.contains('open')) return;
  if (e.key === 'Escape') closeLb();
  if (e.key === 'ArrowLeft') step(-1);
  if (e.key === 'ArrowRight') step(1);
});

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const t = document.querySelector(a.getAttribute('href'));
    if (t) { e.preventDefault(); t.scrollIntoView({ behavior: 'smooth' }); }
  });
});
