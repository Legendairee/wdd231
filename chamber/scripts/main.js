import { initNavigation } from "./navigation.js";
import { initFooter } from "./footer.js";
import { fetchWeather } from "./weather.js";
import { fetchSpotlights } from "./spotlights.js";


export default function initHomePage() {
    initNavigation();
    initFooter();
    fetchWeather();
    fetchSpotlights();
}


document.addEventListener("DOMContentLoaded", () => {
    initHomePage();
});