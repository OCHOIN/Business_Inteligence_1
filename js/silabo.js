document.addEventListener('DOMContentLoaded', () => {
  const yearNode = document.querySelector('[data-year]');
  if (yearNode) {
    yearNode.textContent = new Date().getFullYear();
  }

  const countdownEls = document.querySelectorAll('.countdown');

  const formatTimeLeft = (diffMs) => {
    const totalSeconds = Math.max(0, Math.floor(diffMs / 1000));
    const days = Math.floor(totalSeconds / 86400);
    const hours = Math.floor((totalSeconds % 86400) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    if (days === 0 && hours === 0 && minutes === 0 && seconds === 0) {
      return 'Fecha vencida';
    }

    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
  };

  const updateCountdowns = () => {
    countdownEls.forEach((countdown) => {
      const target = countdown.dataset.target;
      if (!target) return;

      const targetDate = new Date(target).getTime();
      const diff = targetDate - Date.now();

      if (diff <= 0) {
        countdown.textContent = 'Evaluación cerrada';
        countdown.classList.add('is-done');
        return;
      }

      countdown.textContent = formatTimeLeft(diff);
      countdown.classList.remove('is-done');
    });
  };

  updateCountdowns();
  setInterval(updateCountdowns, 1000);
});
