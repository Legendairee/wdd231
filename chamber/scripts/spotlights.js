// This is the page spotlight section

export async function fetchSpotlights() {
    const container = document.querySelector("#spotlight-cards");
    if (!container) return;

    try {
        const response = await fetch("data/members.json");
        if (!response.ok) throw new Error("Could not fetch members JSON");

        const members = await response.json();

        const qualified = members.filter(
            m => m.membershipLevel === "Gold" || m.membershipLevel === "Silver"
        );

        const selected = getRandomMembers(qualified, 3);
        displaySpotlights(selected, container);
    } catch (error) {
        console.error("Spotlight Error:", error);
        container.innerHTML = "<p>Unable to load member spotlights.</p>";
    }
}

function getRandomMembers(array, count) {
    const membersCopy = [...array];
    const selectedMembers = [];

    for (let i = 0; i < count; i++) {
        if (membersCopy.length === 0) break;
        const randomIndex = Math.floor(Math.random() * membersCopy.length);
        const chosenMember = membersCopy.splice(randomIndex, 1)[0];
        selectedMembers.push(chosenMember);
    }

    return selectedMembers;
}

function displaySpotlights(members, container) {
    container.innerHTML = members.map(m => {
        const cleanUrl = m.website.replace(/^https?:\/\//, "");

        return `
            <div class="spotlight-card">
                <div class="spotlight-header">
                    <h3>${m.name}</h3>
                    <p class="tagline">${m.tagline}</p>
                </div>
                <div class="spotlight-body">
                    <img src="${m.image}" alt="Logo for ${m.name}" width="80" height="80" loading="lazy">
                    <div class="spotlight-info">
                        <p><strong>Phone:</strong> ${m.phone}</p>
                        <p><strong>Address:</strong> ${m.address}</p>
                        <p><strong>URL:</strong> <a href="${m.website}" target="_blank" rel="noopener">${cleanUrl}</a></p>
                        <p class="badge"><strong>Level:</strong> ${m.membershipLevel}</p>
                    </div>
                </div>
            </div>
        `;
    }).join("");
}