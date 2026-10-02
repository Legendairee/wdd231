import { initNavigation } from "./navigation.js";
import { initFooter } from "./footer.js";
import { initDiscoverPage } from "./discover.js";

initNavigation();
initFooter();

if (document.querySelector(".discover-main")) {
    initDiscoverPage();
}