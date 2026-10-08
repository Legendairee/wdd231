import { getCurrentYear, getLastModified } from './utils.js';

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