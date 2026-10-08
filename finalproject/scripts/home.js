import { initHeader } from './header.js';
import { initFooter } from './footer.js';

initHeader();
initFooter();

let allStates = [];

const modal = document.getElementById('state-modal');
const modalBody = document.getElementById('modal-body');
const modalClose = document.getElementById('modal-close');

function openModal(state) {
  modalBody.innerHTML = `
    <h2>${state.name} State</h2>
    <img src="${state.image}" 
         alt="${state.name} State" 
         class="modal-image"
         width="100%"
         height="200"
         loading="lazy">
    <p><strong>Capital:</strong> ${state.capital}</p>
    <p><strong>Geopolitical Zone:</strong> ${state.zone}</p>
    <p><strong>Population:</strong> ${state.population}</p>
    <p><strong>Slogan:</strong> ${state.slogan}</p>
    <p><strong>Interesting Fact:</strong> ${state.fact}</p>
  `;

  modal.hidden = false;
}

function closeModal() {
  modal.hidden = true;
}

modalClose.addEventListener('click', closeModal);

modal.addEventListener('click', (event) => {
  if (event.target === modal) {
    closeModal();
  }
});

async function loadFeaturedStates() {
  const container = document.getElementById('featured-states');

  try {
    const response = await fetch('data/states.json');

    if (!response.ok) {
      throw new Error('Failed to load states data');
    }

    allStates = await response.json();

    const featured = allStates.slice(0, 3);

    container.innerHTML = '';

    const cardsHTML = featured.map((state, index) => {
      const isFirstImage = index === 0;
      const loadingAttr = isFirstImage ? 'eager' : 'lazy';
      const fetchPriority = isFirstImage ? 'high' : 'auto';

      return `
        <article class="state-card">
          <img src="${state.image}" 
               alt="${state.name} State" 
               class="state-image"
               width="600" 
               height="400"
               loading="${loadingAttr}"
               fetchpriority="${fetchPriority}">
          <h3>${state.name} State</h3>
          <p>Capital: ${state.capital}</p>
          <span class="zone-badge">${state.zone}</span>
          <button class="details-btn" data-id="${state.id}">View Details</button>
        </article>`;
    }).join('');

    container.innerHTML = cardsHTML;

    addCardEvents();

  } catch (error) {
    console.error('Error loading featured states:', error);
    container.innerHTML = `
      <p class="loading">Sorry, we could not load the featured states at this time.</p>
    `;
  }
}

function addCardEvents() {
  const detailButtons = document.querySelectorAll('.details-btn');
  detailButtons.forEach(button => {
    button.addEventListener('click', () => {
      const id = Number(button.dataset.id);
      const state = allStates.find(s => s.id === id);
      if (state) {
        openModal(state);
      }
    });
  });
}

loadFeaturedStates();