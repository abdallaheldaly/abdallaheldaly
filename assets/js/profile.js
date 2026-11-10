// profile.js — highlight the active section in the sidebar and the mobile pill bar
(function () {
  var links = document.querySelectorAll('.nav-link[href^="#"], .mobile-nav a[href^="#"]');
  var targets = document.querySelectorAll('section[id], header[id]');
  if (!('IntersectionObserver' in window) || !links.length) return;

  var spy = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (!e.isIntersecting) return;
      links.forEach(function (l) {
        var on = l.getAttribute('href') === '#' + e.target.id;
        l.classList.toggle('active', on);
        // keep the active pill visible in the horizontally scrolling mobile bar
        if (on && l.closest('.mobile-nav')) {
          var bar = l.closest('.mobile-nav');
          bar.scrollTo({ left: l.offsetLeft - bar.clientWidth / 2 + l.offsetWidth / 2, behavior: 'smooth' });
        }
      });
    });
  }, { rootMargin: '-30% 0px -60% 0px' });

  targets.forEach(function (t) { spy.observe(t); });
})();
