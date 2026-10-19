document.addEventListener('DOMContentLoaded', () => {
  const yearTarget = document.querySelector('[data-year]');
  if (yearTarget) {
    yearTarget.textContent = new Date().getFullYear();
  }

  const themeButtons = document.querySelectorAll('.theme-toggle');
  const applyTheme = (theme) => {
    document.body.setAttribute('data-theme', theme);
    themeButtons.forEach((button) => {
      button.textContent = theme === 'dark' ? 'Tema claro' : 'Tema oscuro';
    });
    localStorage.setItem('bi-theme', theme);
  };

  const savedTheme = localStorage.getItem('bi-theme') || 'light';
  applyTheme(savedTheme);

  themeButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const nextTheme = document.body.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      applyTheme(nextTheme);
    });
  });

  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      navLinks.forEach((item) => item.classList.remove('active'));
      link.classList.add('active');
    });
  });

  const dashboardButton = document.querySelector('.btn-dashboard');
  if (dashboardButton) {
    dashboardButton.setAttribute('href', 'dashboard.html');
  }

  document.querySelectorAll('[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (event) => {
      const href = anchor.getAttribute('href');
      if (!href || href === '#') {
        return;
      }

      const target = document.querySelector(href);
      if (!target) {
        return;
      }

      event.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
});
