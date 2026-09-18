// This is the navigation

export function initNavigation() {
    const navigationButton = document.querySelector("#ham-btn");
    const navigationBar = document.querySelector("#nav-bar");

    if (navigationButton && navigationBar) {
        navigationButton.addEventListener("click", () => {
            navigationButton.classList.toggle("show");
            navigationBar.classList.toggle("show");
        });
    }
}