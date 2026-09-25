
const myInfo = new URLSearchParams(window.location.search);


const myResult = document.querySelector("#results");

myResult.innerHTML = `<p>Appointment for ${myInfo.get("first")} ${myInfo.get("last")}</p><p>Proxy ${myInfo.get("ordinance")} on ${myInfo.get("date")} in the ${myInfo.get("location")} Temple</p><p>Your Phone: ${myInfo.get("phone")}</p><p>Your Email: ${myInfo.get("email")}</p>`