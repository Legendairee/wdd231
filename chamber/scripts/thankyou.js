const myInfo = new URLSearchParams(window.location.search);
const dataContainer = document.querySelector("#submitted-data");

const rawTimestamp = myInfo.get("timestamp");
const formattedDate = rawTimestamp ? new Date(rawTimestamp).toLocaleString() : "";

dataContainer.innerHTML = `
    <p><strong>First Name:</strong> ${myInfo.get("first")}</p>
    <p><strong>Last Name:</strong> ${myInfo.get("last")}</p>
    <p><strong>Email Address:</strong> ${myInfo.get("email")}</p>
    <p><strong>Mobile Phone:</strong> ${myInfo.get("phone")}</p>
    <p><strong>Organization Name:</strong> ${myInfo.get("organization")}</p>
    <p><strong>Application Timestamp:</strong> ${formattedDate}</p>
`;