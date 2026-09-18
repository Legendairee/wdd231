// This is the footer

export function initFooter() {
    const currentYear = document.querySelector("#year");
    const lastModified = document.querySelector("#lastModified");

    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }

    if (lastModified) {
        lastModified.innerHTML = `Last Modified: ${document.lastModified}`;
    }
}