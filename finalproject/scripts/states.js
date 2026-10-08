import { initHeader } from './header.js';
import { initFooter } from './footer.js';

initHeader();
initFooter();

let allStates = [];                     
const favKey = 'favouriteStates';   

const container = document.getElementById('states-container');
const searchInput = document.getElementById('search-input');
const zoneFilter = document.getElementById('zone-filter');
const favCount = document.getElementById('favourites-count');
const clearBtn = document.getElementById('clear-favourites');
const modal = document.getElementById('state-modal');
const modalBody = document.getElementById('dialog-body');
const modalClose = document.getElementById('dialog-close-btn');

async function loadStates() {
    try {
        const response = await fetch('data/states.json');

        if (!response.ok) {
            throw new Error('Could not load the states data');
        }

        allStates = await response.json();
        displayStates(allStates);
        updateFavCount();

    } catch (error) {
        console.error(error);
        container.innerHTML = '<p class="is-loading">Sorry, we could not load the states right now.</p>';
    }
}

function displayStates(statesArray) {
    if (statesArray.length === 0) {
        container.innerHTML = '<p class="is-loading">No states found. Try a different search.</p>';
        return;
    }

    const html = statesArray.map((state, index) => {
        const isFav = isFavourite(state.id);
        const isFirstImage = index === 0;
        const loadingAttr = isFirstImage ? 'eager' : 'lazy';
        const fetchPriority = isFirstImage ? 'high' : 'auto';

        return `
      <article class="directory-card">
        <img src="${state.image}" 
             alt="${state.name} State" 
             class="directory-image"
             width="600" 
             height="400"
             loading="${loadingAttr}"
             fetchpriority="${fetchPriority}">
             
        <h2>${state.name} State</h2>
        <p><strong>Capital:</strong> ${state.capital}</p>
        <p><strong>Zone:</strong> ${state.zone}</p>
        <p><strong>Population:</strong> ${state.population}</p>

        <div class="card-actions">
          <button class="details-button" data-id="${state.id}">View Details</button>
          <button class="favourites-button ${isFav ? 'favourited' : ''}" data-id="${state.id}">
            ${isFav ? '★ Favourited' : '☆ Add Favourite'}
          </button>
        </div>
      </article>
    `;
    }).join('');
    container.innerHTML = html;

    addCardEvents();
}

function filterStates() {
    const searchText = searchInput.value.toLowerCase();
    const selectedZone = zoneFilter.value;

    const filtered = allStates.filter(state => {
        const matchesSearch = state.name.toLowerCase().includes(searchText);
        const matchesZone = selectedZone === 'all' || state.zone === selectedZone;

        return matchesSearch && matchesZone;
    });

    displayStates(filtered);
}

searchInput.addEventListener('input', filterStates);
zoneFilter.addEventListener('change', filterStates);

function getFavourites() {
    const stored = localStorage.getItem(favKey);
    return stored ? JSON.parse(stored) : [];
}

function isFavourite(id) {
    const favs = getFavourites();
    return favs.includes(id);
}

function toggleFavourite(id) {
    let favs = getFavourites();

    if (favs.includes(id)) {
        favs = favs.filter(favId => favId !== id);
    }
    else {
        favs.push(id);
    }

    localStorage.setItem(favKey, JSON.stringify(favs));

    updateFavCount();
    filterStates();
}

function updateFavCount() {
    const favs = getFavourites();
    favCount.textContent = favs.length;
}

clearBtn.addEventListener('click', () => {
    localStorage.removeItem(favKey);
    updateFavCount();
    filterStates();
});

function openModal(state) {
    modalBody.innerHTML = `
    <h2>${state.name} State</h2>
    <img src="${state.image}" 
         alt="${state.name} State" 
         class="dialog-image"
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


function addCardEvents() {
    const detailButtons = document.querySelectorAll('.details-button');
    detailButtons.forEach(button => {
        button.addEventListener('click', () => {
            const id = Number(button.dataset.id);
            const state = allStates.find(s => s.id === id);
            if (state) {
                openModal(state);
            }
        });
    });

    const favButtons = document.querySelectorAll('.favourites-button');
    favButtons.forEach(button => {
        button.addEventListener('click', () => {
            const id = Number(button.dataset.id);
            toggleFavourite(id);
        });
    });
}

loadStates();