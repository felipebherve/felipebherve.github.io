(function () {
  'use strict';

  /* idioma (EN/PT), salvo no navegador de quem visita */
  var html = document.documentElement;
  var stored = localStorage.getItem('herve-lang');
  var lang = stored === 'en' ? 'en' : 'pt';

  function applyLang(l) {
    html.setAttribute('data-lang', l);
    html.lang = l === 'pt' ? 'pt-BR' : 'en';
    var btn = document.getElementById('langToggle');
    if (btn) btn.textContent = l === 'pt' ? 'EN' : 'PT';
  }

  applyLang(lang);

  window.toggleLang = function () {
    lang = lang === 'pt' ? 'en' : 'pt';
    localStorage.setItem('herve-lang', lang);
    applyLang(lang);
  };

  /* menu mobile */
  window.toggleNav = function () {
    var nav = document.getElementById('navLinks');
    if (nav) nav.classList.toggle('open');
  };

  document.addEventListener('click', function (evt) {
    var nav = document.getElementById('navLinks');
    var toggle = document.getElementById('navToggle');
    if (!nav || !nav.classList.contains('open')) return;
    if (nav.contains(evt.target) || (toggle && toggle.contains(evt.target))) return;
    nav.classList.remove('open');
  });

  document.querySelectorAll('#navLinks a').forEach(function (link) {
    link.addEventListener('click', function () {
      var nav = document.getElementById('navLinks');
      if (nav) nav.classList.remove('open');
    });
  });

  /* destaca o item do menu correspondente à seção visível */
  var sections = document.querySelectorAll('main section[id]');
  var navItems = document.querySelectorAll('#navLinks a[href^="#"]');

  if (sections.length && navItems.length && 'IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        navItems.forEach(function (item) {
          item.classList.toggle('active', item.getAttribute('href') === '#' + entry.target.id);
        });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });

    sections.forEach(function (section) {
      observer.observe(section);
    });
  }
})();
