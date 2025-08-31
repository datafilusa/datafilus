document.addEventListener('DOMContentLoaded', () => {
  const scrollBtn = document.getElementById('scrollDownBtn');
  const inquireBtn = document.querySelector('.inquire-btn');
  const nextSection = document.querySelector('.edu-section');
  const arrow = scrollBtn.querySelector('.double-v');

  if (!scrollBtn || !inquireBtn || !nextSection) return;

  function adjustButtonSize() {
    const width = window.innerWidth;
    let btnSize = 60;
    let arrowBorder = 12;

    if (width < 1500) { btnSize = 50; arrowBorder = 10; }
    if (width < 1200) { btnSize = 45; arrowBorder = 9; }
    if (width < 900)  { btnSize = 40; arrowBorder = 8; }
    if (width < 600)  { btnSize = 35; arrowBorder = 7; }

    scrollBtn.style.width = scrollBtn.style.height = btnSize + 'px';
    arrow.style.width = arrow.style.height = (arrowBorder * 2) + 'px';
    arrow.style.margin = '0 auto';

    if (document.getElementById('dynamicArrowStyle')) {
      document.getElementById('dynamicArrowStyle').remove();
    }
    const style = document.createElement('style');
    style.id = 'dynamicArrowStyle';
    style.innerHTML = `
      .scroll-down-btn .double-v::before,
      .scroll-down-btn .double-v::after {
        border-left: ${arrowBorder}px solid transparent;
        border-right: ${arrowBorder}px solid transparent;
        border-top: ${arrowBorder}px solid #2d2d62;
      }
      .scroll-down-btn .double-v::after {
        top: ${arrowBorder}px;
      }
    `;
    document.head.appendChild(style);
  }

  function positionScrollBtn() {
    if (window.innerWidth < 768) {
      scrollBtn.style.display = 'none';
      return;
    } else {
      scrollBtn.style.display = 'flex';
    }

    const rect = inquireBtn.getBoundingClientRect();
    const scrollTop = window.scrollY || window.pageYOffset;
    let extraSpacing = 30;

    if (window.innerWidth >= 768 && window.innerWidth <= 1500) {
      extraSpacing = -50;
    }

    scrollBtn.style.position = 'absolute';
    scrollBtn.style.top = rect.bottom + scrollTop + extraSpacing + 'px';
    scrollBtn.style.left = rect.left + rect.width / 2 + 'px';
    scrollBtn.style.transform = 'translateX(-50%)';
    scrollBtn.style.zIndex = '10';
  }

  scrollBtn.addEventListener('click', () => {
    nextSection.scrollIntoView({ behavior: 'smooth' });
  });

  // Robust initial setup using requestAnimationFrame
  function initScrollBtn() {
    adjustButtonSize();
    positionScrollBtn();
  }

  requestAnimationFrame(() => {
    initScrollBtn();
  });

  window.addEventListener('resize', () => {
    adjustButtonSize();
    positionScrollBtn();
  });

  window.addEventListener('scroll', positionScrollBtn);
});
