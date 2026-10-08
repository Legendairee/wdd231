export function initHeader() {
    const navigationButton = document.querySelector("#hamburger-button");
    const navigationBar = document.querySelector("#navigation-button");

    if (navigationButton && navigationBar) {
        navigationButton.addEventListener("click", () => {
            navigationButton.classList.toggle("show");
            navigationBar.classList.toggle("show");
        });
    }
}