const myTown = document.querySelector('#town');
const myDescription = document.querySelector('#description');
const myTemperature = document.querySelector('#temperature');
const myGraphic = document.querySelector('#graphic');

const myKey = "321e0cc309df263996b5b8f71370cf65"
const myLad = "49.749831802902435"
const myLong = "6.639829512261493"

const myURL = `//api.openweathermap.org/data/2.5/weather?lat=${myLad}&lon=${myLong}&appid=${myKey}&units=imperial`


async function apiFetch() {
    try {
        const response = await fetch(myURL);
        if (response.ok) {
            const data = await response.json();
            displayResults(data);
        } else {
            throw Error(await response.text());
        }
    } catch (error) {
        console.log(error);
    }
}

function displayResults(data) {
    myTown.textContent = data.name
    myDescription.textContent = data.weather[0].description
    myTemperature.innerHTML = `${data.main.temp}&deg;F`
    const iconSrc = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

    myGraphic.setAttribute("src", iconSrc)
    myGraphic.setAttribute("alt", data.weather[0].description)
}

apiFetch();


