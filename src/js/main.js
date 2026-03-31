/* ============================================
   Nasc Consulting — Main JS
   ============================================ */

(function () {
  'use strict';

  // Mobile navigation toggle
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('site-nav');

  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var isOpen = nav.classList.toggle('open');
      toggle.classList.toggle('active');
      toggle.setAttribute('aria-expanded', isOpen);
    });

    // Close nav when a link is clicked
    nav.querySelectorAll('.nav-link').forEach(function (link) {
      link.addEventListener('click', function () {
        nav.classList.remove('open');
        toggle.classList.remove('active');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Header shadow on scroll
  var header = document.getElementById('site-header');

  if (header) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 10) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
  }

  // Contact form submission via fetch
  var form = document.getElementById('contact-form');
  var successMsg = document.getElementById('form-success');
  var errorMsg = document.getElementById('form-error');

  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var data = new URLSearchParams(new FormData(form)).toString();

      fetch('/', {
        method: 'POST',
        body: data,
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      })
        .then(function (response) {
          if (response.ok) {
            form.hidden = true;
            if (successMsg) successMsg.hidden = false;
            if (errorMsg) errorMsg.hidden = true;
          } else {
            throw new Error('Form submission failed');
          }
        })
        .catch(function () {
          if (errorMsg) errorMsg.hidden = false;
        });
    });
  }
})();
