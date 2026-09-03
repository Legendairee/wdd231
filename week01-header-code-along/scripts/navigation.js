const navigationButton = document.querySelector("#ham-btn");
const navigationBar = document.querySelector("#nav-bar");

navigationButton.addEventListener("click", () => {
    navigationButton.classList.toggle("show");
    navigationBar.classList.toggle("show");
});
