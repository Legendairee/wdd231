const navigationButton = document.querySelector("#ham-btn");
const navigationBar = document.querySelector("#nav-bar");

navigationButton.addEventListener("click", () => {
    navigationButton.classList.toggle("show");
    navigationBar.classList.toggle("show");
});

const membersContainer = document.getElementById('members-container');
const gridBtn = document.getElementById('grid-view');
const listBtn = document.getElementById('list-view');

async function getMembers() {
    try {
        const response = await fetch('data/members.json');
        if (response.ok) {
            const data = await response.json();
            displayMembers(data);
        } else {
            console.error('Error fetching member data:', response.statusText);
        }
    } catch (error) {
        console.error('Fetch error:', error);
    }
}

function displayMembers(members) {
    membersContainer.innerHTML = '';

    members.forEach((member) => {
        const listItem = document.createElement('li');
        listItem.classList.add('member-card');

        const cleanUrl = member.website.replace(/^https?:\/\//, '');

        listItem.innerHTML = `
            <div class="card-header">
                <h2 class="member-name">${member.name}</h2>
                <p class="member-tagline hide-in-list">${member.tagline}</p>
            </div>
            <hr class="card-divider hide-in-list">
            <div class="card-body">
                <img class="hide-in-list" src="${member.image}" alt="Logo for ${member.name}" width="100" height="100" loading="lazy">
                <div class="card-info">
                    <p class="info-email hide-in-list"><strong>EMAIL:</strong> ${member.email}</p>
                    <p class="info-phone"><strong class="hide-in-list">PHONE:</strong> ${member.phone}</p>
                    <p class="info-url"><strong class="hide-in-list">URL:</strong> <a href="${member.website}" target="_blank" rel="noopener">${cleanUrl}</a></p>
                    <p class="info-level hide-in-list"><strong>LEVEL:</strong> ${member.membershipLevel}</p>
                </div>
            </div>
            <p class="member-address">${member.address}</p>
        `;
        membersContainer.appendChild(listItem);
    });
}

gridBtn.addEventListener('click', () => {
    membersContainer.classList.add('grid-layout');
    membersContainer.classList.remove('list-layout');
    gridBtn.classList.add('active-btn');
    listBtn.classList.remove('active-btn');
});

listBtn.addEventListener('click', () => {
    membersContainer.classList.add('list-layout');
    membersContainer.classList.remove('grid-layout');
    listBtn.classList.add('active-btn');
    gridBtn.classList.remove('active-btn');
});

getMembers();

const currentYear = document.querySelector("#year");
const lastModified = document.querySelector("#lastModified");

const today = new Date();

currentYear.textContent = today.getFullYear();

lastModified.innerHTML = `Last Modified: ${document.lastModified}`;