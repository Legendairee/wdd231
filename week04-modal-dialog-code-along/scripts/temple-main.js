import { temples } from "./temples.js"
// console.log(temples)

import { url } from "./temples.js"
// console.log(url)

const showHere = document.querySelector("#showHere");
const mydialog = document.querySelector("#mydialog");
const mytitle = document.querySelector("#mydialog h2");
const myinfo = document.querySelector("#mydialog p");
const myClose = document.querySelector("#mydialog button");

myClose.addEventListener("click", () => mydialog.close());


function displayItems(data) {
    // console.log(data)
    data.forEach(info => {
        // console.log(info)
        const photos = document.createElement("img")
        photos.src = `${url}${info.path}`
        photos.alt = info.name

        photos.addEventListener("click", () => showStuff(info));

        showHere.appendChild(photos)
    })
}

displayItems(temples)


function showStuff(info) {
    mytitle.innerHTML = info.name
    myinfo.innerHTML = `Dedicated ${info.dedicated} by ${info.person} as temple number ${info.number}`
    mydialog.showModal()
}

const currentYear = document.querySelector("#current-year");
const lastModified = document.querySelector("#lastModified");

const today = new Date();

currentYear.textContent = today.getFullYear();

lastModified.innerHTML = `Last Modified: ${document.lastModified}`;