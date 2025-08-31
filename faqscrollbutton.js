document.addEventListener('DOMContentLoaded', () => {
  const btn = document.getElementById('scrollDownBtn');
  const target = document.querySelector('.services-container'); // your FAQ content wrapper

  if (btn && target) {
    btn.addEventListener('click', () => {
      target.scrollIntoView({ behavior: 'smooth' });
    });
  }
});