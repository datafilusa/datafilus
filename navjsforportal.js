// ==============================
  // Navbar Burger Menu
  // ==============================
  const burger = document.getElementById('burgerMenu');
  const navButtons = document.getElementById('navButtons');

  burger.addEventListener('click', e => {
    e.stopPropagation();
    navButtons.classList.toggle('show');
  });

  document.addEventListener('click', e => {
    if (!navButtons.contains(e.target) && !burger.contains(e.target)) {
      navButtons.classList.remove('show');
    }
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 800) navButtons.classList.remove('show');
  });

  // ==============================
  // Search Overlay
  // ==============================
  const searchIcon = document.getElementById('searchIcon');
  const searchOverlay = document.getElementById('searchOverlay');
  const overlaySearchInput = document.getElementById('overlaySearchInput');
  const overlaySearchButton = document.getElementById('overlaySearchButton');

  searchOverlay.style.display = 'none';
  overlaySearchInput.value = '';

  searchIcon.addEventListener('click', () => {
    searchOverlay.style.display = 'flex';
    overlaySearchInput.focus();
  });

  searchOverlay.addEventListener('click', e => {
    if (!document.querySelector('.search-box').contains(e.target)) {
      searchOverlay.style.display = 'none';
      overlaySearchInput.value = '';
    }
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      searchOverlay.style.display = 'none';
      overlaySearchInput.value = '';
    }
  });

  function performSearch() {
    const keyword = overlaySearchInput.value.trim().toLowerCase();
    if (!keyword) return;

    if (keyword.includes('home')) window.location.href = 'index.html';
    else if (keyword.includes('faq')) window.location.href = 'faq.html';
    else if (keyword.includes('contact')) window.location.href = 'contactus.html';
    else if (keyword.includes('services')) window.location.href = 'ourservices.html';
    else if (keyword.includes('about')) window.location.href = 'aboutus.html';
    else if (keyword.includes('portal')) window.location.href = 'portal.html';
    else alert('No results found for "' + keyword + '"');

    searchOverlay.style.display = 'none';
    overlaySearchInput.value = '';
  }

  overlaySearchButton.addEventListener('click', performSearch);
  overlaySearchInput.addEventListener('keypress', e => {
    if (e.key === 'Enter') performSearch();
  });
