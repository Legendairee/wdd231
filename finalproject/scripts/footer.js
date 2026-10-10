export function getCurrentYear() {
    return new Date().getFullYear();
}

export function getLastModified() {
    return document.lastModified;
}

export function initFooter() {
    const yearSpan = document.getElementById('current-year');
    const modified = document.getElementById('last-modified');

    if (yearSpan) {
        yearSpan.textContent = getCurrentYear();
    }

    if (modified) {
        modified.textContent = `Last Modified: ${getLastModified()}`;
    }
}