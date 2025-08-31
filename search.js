// ===============================
// search.js - Full Navbar + Overlay + Search Results
// ===============================
document.addEventListener('DOMContentLoaded', () => {

  // =========================
  // Burger Menu
  // =========================
  const burger = document.getElementById('burgerMenu');
  const navButtons = document.getElementById('navButtons');

  if (burger && navButtons) {
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
  }

  // =========================
  // Search Overlay
  // =========================
  const searchIcon = document.getElementById('searchIcon');
  const searchOverlay = document.getElementById('searchOverlay');
  const overlaySearchInput = document.getElementById('overlaySearchInput');
  const overlaySearchButton = document.getElementById('overlaySearchButton');

  if (searchOverlay && overlaySearchInput) {
    searchOverlay.style.display = 'none';
    overlaySearchInput.value = '';

    if (searchIcon) {
      searchIcon.addEventListener('click', () => {
        searchOverlay.style.display = 'flex';
        overlaySearchInput.focus();
      });
    }

    searchOverlay.addEventListener('click', e => {
      const searchBox = document.querySelector('.search-box');
      if (searchBox && !searchBox.contains(e.target)) closeSearchOverlay();
    });

    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') closeSearchOverlay();
    });

    function closeSearchOverlay() {
      searchOverlay.style.display = 'none';
      overlaySearchInput.value = '';
    }

    function performSearch() {
      const keyword = overlaySearchInput.value.trim();
      if (!keyword) {
        alert('Please enter a search term.');
        overlaySearchInput.focus();
        return;
      }
      closeSearchOverlay();
      window.location.href = `search.html?q=${encodeURIComponent(keyword)}`;
    }

    if (overlaySearchButton) overlaySearchButton.addEventListener('click', performSearch);
    overlaySearchInput.addEventListener('keypress', e => {
      if (e.key === 'Enter') performSearch();
    });
  }

  // =========================
  // Search Results Page
  // =========================
  const resultsContainer = document.getElementById('resultsContainer');
  if (!resultsContainer) return;

  const params = new URLSearchParams(window.location.search);
  const keyword = params.get('q');

  if (!keyword) {
    resultsContainer.innerHTML = '<p>Please enter a search term.</p>';
    return;
  }

  fetch('searchData.json')
    .then(res => res.json())
    .then(pages => {
      const words = keyword
        .toLowerCase()
        .split(' ')
        .filter(w => w.trim() !== '')
        .map(w => w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')); // escape regex

      const results = pages.filter(page =>
        words.some(w =>
          page.title.toLowerCase().includes(w) ||
          page.snippet.toLowerCase().includes(w) ||
          (page.keywords && page.keywords.some(k => k.toLowerCase().includes(w)))
        )
      );
      if (results.length === 0) {
          resultsContainer.innerHTML = `<p class="no-results">No results found for "<strong>${keyword}</strong>"</p>`;
      return;
      }

      resultsContainer.innerHTML = '';

      results.forEach((page, index) => {
        const item = document.createElement('div');
        item.classList.add('search-item');

        const highlightedTitle = highlightKeywords(page.title, words);
        const highlightedSnippet = highlightKeywords(page.snippet, words);

        item.innerHTML = `
          <img src="${page.image}" alt="${page.title}" class="search-icon">
          <div class="search-content">
            <strong>${highlightedTitle}</strong>
            <p>${highlightedSnippet}</p>
          </div>
        `;

        // Stagger slide-up animation
        item.style.animationDelay = `${index * 0.1}s`;

        item.addEventListener('click', () => {
          window.location.href = page.url;
        });

        resultsContainer.appendChild(item);
      });
    })
    .catch(err => {
      console.error("Error loading search data:", err);
      resultsContainer.innerHTML = '<p>Error loading search data.</p>';
    });

  // =========================
  // Highlight Keywords Function
  // =========================
  function highlightKeywords(text, words) {
    if (!words || words.length === 0) return text;
    const regex = new RegExp(`(${words.join('|')})`, 'gi');
    return text.replace(regex, '<span class="highlight">$1</span>');
  }

});
// Scroll results below fixed navbar dynamically
document.addEventListener('DOMContentLoaded', () => {
  const resultsWrapper = document.getElementById('resultsContainer');
  const navbar = document.querySelector('.navbar');

  if (resultsWrapper && navbar) {
    setTimeout(() => {
      const navbarHeight = navbar.offsetHeight;
      const topPos = resultsWrapper.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: topPos - navbarHeight - 10, // 10px extra spacing
        behavior: 'smooth'
      });
    }, 100); // small delay to ensure DOM is rendered
  }
});


const resultsContainer = document.getElementById('resultsContainer');
const resultsWrapper = document.querySelector('.search-results-wrapper');

function adjustFooterSpacing() {
  const resultsCount = resultsContainer.children.length;
  const resultsContent = document.querySelector('.results-content');

  if(resultsCount === 0) {
    resultsContent.style.justifyContent = 'center'; // center "No results" vertically
  } else {
    resultsContent.style.justifyContent = 'flex-start';
  }
}

// Call this after populating results
adjustFooterSpacing();
