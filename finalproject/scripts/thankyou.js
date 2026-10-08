import { initFooter } from './footer.js';

initFooter();

const queryString = window.location.search;

const urlParams = new URLSearchParams(queryString);

const fullname = urlParams.get('fullname');
const email = urlParams.get('email');
const phone = urlParams.get('phone');
const reason = urlParams.get('reason');
const message = urlParams.get('message');

const formDataDiv = document.getElementById('form-data');

let html = '';

if (fullname) {
    html += `<p><strong>Full Name:</strong> ${fullname}</p>`;
}
if (email) {
    html += `<p><strong>Email:</strong> ${email}</p>`;
}
if (phone) {
    html += `<p><strong>Phone:</strong> ${phone}</p>`;
}
if (reason) {
    html += `<p><strong>Reason:</strong> ${reason}</p>`;
}
if (message) {
    html += `<p><strong>Message:</strong> ${message}</p>`;
}


if (html === '') {
    html = '<p>No form data was received.</p>';
}

formDataDiv.innerHTML = html;