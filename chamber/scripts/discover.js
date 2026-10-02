import { discoverItems } from "../data/discover.mjs";

export function initDiscoverPage() {
    const container = document.querySelector("#discover-cards");
    const visitMessageEl = document.querySelector("#visit-message");

    if (visitMessageEl) {
        handleVisitorMessage(visitMessageEl);
    }

    if (container) {
        renderDiscoverCards(discoverItems, container);
        setupModalEvents(discoverItems);
    }
}

function handleVisitorMessage(element) {
    const LAST_VISIT_KEY = "ekoChamber_lastVisit";
    const lastVisit = localStorage.getItem(LAST_VISIT_KEY);
    const now = Date.now();
    const msInDay = 86400000;

    if (!lastVisit) {
        element.textContent = "Welcome! Let us know if you have any questions.";
    } else {
        const timeDiff = now - parseInt(lastVisit, 10);
        const daysDiff = Math.floor(timeDiff / msInDay);

        if (daysDiff < 1) {
            element.textContent = "Back so soon! Feels like yesterday.";
        } else if (daysDiff === 1) {
            element.textContent = "You last visited 1 day ago.";
        } else {
            element.textContent = `You last visited ${daysDiff} days ago.`;
        }
    }

    localStorage.setItem(LAST_VISIT_KEY, now.toString());
}

function renderDiscoverCards(items, container) {
    container.innerHTML = items.map((item, index) => `
    <section class="discover-card">
      <h2 class="card-title">${item.title}</h2>
      <figure class="card-img">
        <img src="${item.image}" alt="${item.alt}" loading="lazy" width="300" height="200">
      </figure>
      <address class="card-address">
        ${item.address}<br>
        <small>${item.category}</small>
      </address>
      <p class="card-desc">${item.description}</p>
      <button class="card-btn card-btn-styled learn-more-btn" data-index="${index}" aria-label="Learn more about ${item.title}">Learn More</button>
    </section>
  `).join("");
}

function setupModalEvents(items) {
    const modal = document.querySelector("#discover-modal");
    const closeBtn = document.querySelector("#close-modal");
    
    const modalTitle = document.querySelector("#modal-title");
    const modalHours = document.querySelector("#modal-hours");
    const modalFee = document.querySelector("#modal-fee");
    const modalStats = document.querySelector("#modal-stats");
    const modalDetailedInfo = document.querySelector("#modal-detailed-info");

    if (!modal) return;

    document.querySelectorAll(".learn-more-btn").forEach((button) => {
        button.addEventListener("click", () => {
            const index = button.getAttribute("data-index");
            const item = items[index];

            modalTitle.textContent = item.title;
            modalHours.textContent = item.hours;
            modalFee.textContent = item.entryFee;
            modalStats.textContent = item.keyStats;
            modalDetailedInfo.textContent = item.detailedInfo;

            modal.showModal();
        });
    });

    closeBtn.addEventListener("click", () => {
        modal.close();
    });

    modal.addEventListener("click", (event) => {
        if (event.target === modal) {
            modal.close();
        }
    });
}