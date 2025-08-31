document.addEventListener('DOMContentLoaded', () => {
  const videoSection = document.querySelector('.video-section');
  const nextSection = document.querySelector('.services-container');

  if (!videoSection || !nextSection) return;

  // Create scroll-down button
  const scrollBtn = document.createElement('button');
  scrollBtn.id = 'scrollDownBtn';
  scrollBtn.className = 'scroll-down-btn';
  scrollBtn.innerHTML = '<span class="double-v"></span>';
  videoSection.appendChild(scrollBtn);

  const arrow = scrollBtn.querySelector('.double-v');

  // Adjust button and arrow size dynamically
  function adjustButtonAndArrow() {
    const width = window.innerWidth;

    // Hide button on smaller screens
    if (width <= 900) {
      scrollBtn.style.display = 'none';
      return;
    } else {
      scrollBtn.style.display = 'flex';
    }

    let btnSize = 60;
    let arrowBorder = 12;
    const arrowColor = 'rgba(45, 45, 98, 0.9)';

    if (width < 1800) { btnSize = 50; arrowBorder = 10; }
    if (width < 1200) { btnSize = 45; arrowBorder = 9; }
    if (width < 900)  { btnSize = 40; arrowBorder = 8; }
    if (width < 600)  { btnSize = 35; arrowBorder = 7; }

    scrollBtn.style.width = scrollBtn.style.height = btnSize + 'px';
    scrollBtn.style.borderRadius = '50%';

    arrow.style.position = 'relative';
    arrow.style.width = arrow.style.height = (arrowBorder * 2) + 'px';
    arrow.style.margin = '0 auto';

    // Remove old dynamic style
    const oldStyle = document.getElementById('dynamicArrowStyle');
    if (oldStyle) oldStyle.remove();

    // Add dynamic arrow CSS
    const style = document.createElement('style');
    style.id = 'dynamicArrowStyle';
    style.innerHTML = `
      .scroll-down-btn .double-v::before,
      .scroll-down-btn .double-v::after {
        border-left: ${arrowBorder}px solid transparent;
        border-right: ${arrowBorder}px solid transparent;
        border-top: ${arrowBorder}px solid ${arrowColor};
      }
      .scroll-down-btn .double-v::after {
        top: ${arrowBorder}px;
      }
    `;
    document.head.appendChild(style);
  }

  // Position scroll button relative to video section
  function positionScrollBtn() {
    const width = window.innerWidth;

    // Hide button on smaller screens
    if (width <= 900) {
      scrollBtn.style.display = 'none';
      return;
    } else {
      scrollBtn.style.display = 'flex';
    }

    const videoHeight = videoSection.offsetHeight;
    const btnHeight = scrollBtn.offsetHeight;
    let topPos = videoHeight * 0.8 - btnHeight / 2;

    // Extra spacing for mid-to-large screens (768px–1800px)
    if (width >= 768 && width <= 1810) {
      topPos -= 50;
    }

    scrollBtn.style.position = 'absolute';
    scrollBtn.style.top = topPos + 'px';
    scrollBtn.style.left = '50%';
    scrollBtn.style.transform = 'translateX(-50%)';
    scrollBtn.style.zIndex = '10';
    scrollBtn.style.display = 'flex';
    scrollBtn.style.alignItems = 'center';
    scrollBtn.style.justifyContent = 'center';
  }

  // Scroll to next section on click
  scrollBtn.addEventListener('click', () => {
    nextSection.scrollIntoView({ behavior: 'smooth' });
  });

  // Ensure proper positioning after video loads
  const video = videoSection.querySelector('.bg-video');
  if (video) {
    video.addEventListener('loadedmetadata', () => {
      adjustButtonAndArrow();
      positionScrollBtn();
    });
  } else {
    window.addEventListener('load', () => {
      adjustButtonAndArrow();
      positionScrollBtn();
    });
  }

  // Update button size & position on resize and scroll
  window.addEventListener('resize', () => {
    adjustButtonAndArrow();
    positionScrollBtn();
  });

  window.addEventListener('scroll', positionScrollBtn);

  // Initial setup
  adjustButtonAndArrow();
  positionScrollBtn();
});
