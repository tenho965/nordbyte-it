'use strict';

// Lägg in den verkliga företagsadressen före publicering, exempelvis kontakt@nordbyte.se.
const CONTACT_EMAIL = 'tenho965@gmail.com';

const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.main-nav');
const header = document.querySelector('[data-header]');

function closeMenu() {
  menuButton?.setAttribute('aria-expanded', 'false');
  menuButton?.setAttribute('aria-label', 'Öppna meny');
  navigation?.classList.remove('is-open');
  document.body.classList.remove('menu-open');
}

menuButton?.addEventListener('click', () => {
  const willOpen = menuButton.getAttribute('aria-expanded') !== 'true';
  menuButton.setAttribute('aria-expanded', String(willOpen));
  menuButton.setAttribute('aria-label', willOpen ? 'Stäng meny' : 'Öppna meny');
  navigation?.classList.toggle('is-open', willOpen);
  document.body.classList.toggle('menu-open', willOpen);
});

navigation?.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
window.addEventListener('keydown', (event) => { if (event.key === 'Escape') closeMenu(); });
window.addEventListener('scroll', () => header?.classList.toggle('is-scrolled', window.scrollY > 12), { passive: true });

const reveals = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  reveals.forEach((element) => observer.observe(element));
} else {
  reveals.forEach((element) => element.classList.add('is-visible'));
}

const form = document.querySelector('#contact-form');
const formStatus = document.querySelector('#form-status');

form?.addEventListener('submit', (event) => {
  event.preventDefault();
  const controls = [...form.elements].filter((control) => control.matches('input, select, textarea'));
  controls.forEach((control) => control.setAttribute('aria-invalid', String(!control.validity.valid)));
  if (!form.checkValidity()) {
    formStatus.textContent = 'Kontrollera de markerade fälten och försök igen.';
    form.querySelector(':invalid')?.focus();
    return;
  }
  if (!CONTACT_EMAIL) {
    formStatus.textContent = 'Formuläret är i demoläge. Lägg in företagets e-postadress i script.js före publicering.';
    return;
  }
  const data = new FormData(form);
  const subject = `Supportförfrågan: ${data.get('service')}`;
  const body = [`Namn: ${data.get('name')}`, `Telefon: ${data.get('phone')}`, `E-post: ${data.get('email')}`, `Tjänst: ${data.get('service')}`, '', 'Beskrivning:', data.get('message')].join('\n');
  window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  formStatus.textContent = 'Ditt e-postprogram öppnas. Kontrollera innehållet och skicka meddelandet därifrån.';
});

form?.addEventListener('input', (event) => {
  if (event.target.matches('input, select, textarea')) event.target.removeAttribute('aria-invalid');
});

document.querySelector('#year').textContent = new Date().getFullYear();
