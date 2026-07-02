/* ══════════════════════════════════════════
   SEBASTIAN ONOJA — IT Support Specialist
   Scripts: scripts.js
   ══════════════════════════════════════════ */

// Profile image is static — no upload logic needed.

// ── Gallery Modal (popup) ──
const galleryModal   = document.getElementById('gallery-modal');
const galleryNavLink = document.getElementById('gallery-nav-link');

function openGallery(e) {
  e.preventDefault();
  galleryModal.classList.add('open');
  document.body.style.overflow = 'hidden';
  galleryNavLink.style.color = 'var(--gold)';
}

function closeGallery() {
  galleryModal.classList.remove('open');
  document.body.style.overflow = '';
  galleryNavLink.style.color = '';
}

// Close modal when clicking the dark backdrop (outside the white body)
galleryModal.addEventListener('click', function (e) {
  if (e.target === galleryModal) closeGallery();
});

// ── Gallery filters ──
document.querySelectorAll('.gallery-filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.gallery-filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    document.querySelectorAll('.gallery-item').forEach((item, i) => {
      const match = filter === 'all' || item.dataset.category === filter;
      item.style.display = match ? '' : 'none';
      if (match) {
        item.style.animationDelay = (i * 0.07) + 's';
        item.style.animation = 'none';
        requestAnimationFrame(() => { item.style.animation = ''; });
      }
    });
  });
});

// ── Gallery Lightbox (detail view inside gallery modal) ──
function openLightbox(el) {
  const lb  = document.getElementById('galleryLightbox');
  const num = el.querySelector('.gallery-desc-num').textContent;
  const cat = el.dataset.fullcat;
  const catSmall = el.querySelector('.gallery-category-badge').textContent;

  document.getElementById('lightboxNum').textContent      = num.replace('Project ', '');
  document.getElementById('lightboxCatSmall').textContent = catSmall;
  document.getElementById('lightboxCat').textContent      = cat;
  document.getElementById('lightboxTitle').textContent    = el.dataset.title;
  document.getElementById('lightboxDesc').textContent     = el.dataset.fulldesc;
  lb.classList.add('open');
}

function closeLightbox() {
  document.getElementById('galleryLightbox').classList.remove('open');
}

function closeLightboxOutside(e) {
  if (e.target === document.getElementById('galleryLightbox')) closeLightbox();
}

// ── Escape key closes lightbox and/or gallery modal ──
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    const lb = document.getElementById('galleryLightbox');
    if (lb.classList.contains('open')) {
      closeLightbox();
    } else {
      closeGallery();
    }
  }
});

// ── Scroll reveal ──
const reveals  = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('visible');
        const fill = entry.target.querySelector('.skill-fill');
        if (fill) fill.style.width = fill.dataset.width + '%';
      }, 80 * (Array.from(reveals).indexOf(entry.target) % 4));
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
reveals.forEach(el => observer.observe(el));

// ── Smooth scroll for regular nav links ──
document.querySelectorAll('a[href^="#"]').forEach(a => {
  // gallery nav link is handled separately
  if (a.id === 'gallery-nav-link') return;
  a.addEventListener('click', e => {
    const id     = a.getAttribute('href').slice(1);
    const target = document.getElementById(id);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});
