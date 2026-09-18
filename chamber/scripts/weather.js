// This is the page weather data section

const LAT = 6.5244;
const LON = 3.3792;
const API_KEY = "321e0cc309df263996b5b8f71370cf65";

export async function fetchWeather() {
    const weatherContainer = document.querySelector("#weather-content");
    if (!weatherContainer) return;

    const currentUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${LAT}&lon=${LON}&units=metric&appid=${API_KEY}`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${LAT}&lon=${LON}&units=metric&appid=${API_KEY}`;

    try {
        const [currentRes, forecastRes] = await Promise.all([
            fetch(currentUrl),
            fetch(forecastUrl)
        ]);

        if (!currentRes.ok || !forecastRes.ok) throw new Error("API call failed");

        const currentData = await currentRes.json();
        const forecastData = await forecastRes.json();

        displayWeather(currentData, forecastData, weatherContainer);
    } catch (error) {
        console.warn("Unable to fetch live weather. Showing default information.", error);
        displayFallbackWeather(weatherContainer);
    }
}

function displayWeather(current, forecast, container) {
    const temp = Math.round(current.main.temp);
    const desc = current.weather[0].description;
    const icon = `https://openweathermap.org/img/wn/${current.weather[0].icon}@2x.png`;

    const dailyForecasts = [];
    const seenDates = [];
    const todayString = new Date().toLocaleDateString();

    for (const item of forecast.list) {
        const dateString = new Date(item.dt * 1000).toLocaleDateString();

        if (dateString === todayString) {
            continue;
        }

        if (!seenDates.includes(dateString)) {
            seenDates.push(dateString);
            dailyForecasts.push(item);
        }

        if (dailyForecasts.length === 3) {
            break;
        }
    }

    let forecastHtml = dailyForecasts.map(day => {
        const dateName = new Date(day.dt * 1000).toLocaleDateString("en-US", { weekday: "short" });
        return `<div class="forecast-day"><span>${dateName}:</span> <strong>${Math.round(day.main.temp)}°C</strong></div>`;
    }).join("");

    container.innerHTML = `
        <div class="current-weather">
            <img src="${icon}" alt="${desc}" width="60" height="60">
            <div>
                <p class="temp">${temp}°C</p>
                <p class="desc">${capitalize(desc)}</p>
            </div>
        </div>
        <div class="forecast-section">
            <h3>3-Day Forecast</h3>
            ${forecastHtml}
        </div>
    `;
}

function displayFallbackWeather(container) {
    container.innerHTML = `
        <div class="current-weather">
            <div>
                <p class="temp">29°C</p>
                <p class="desc">Partly Cloudy</p>
            </div>
        </div>
        <div class="forecast-section">
            <h3>3-Day Forecast</h3>
            <div class="forecast-day"><span>Tomorrow:</span> <strong>30°C</strong></div>
            <div class="forecast-day"><span>Thu:</span> <strong>28°C</strong></div>
            <div class="forecast-day"><span>Fri:</span> <strong>31°C</strong></div>
        </div>
    `;
}

function capitalize(str) {
    return str.replace(/\b\w/g, char => char.toUpperCase());
}