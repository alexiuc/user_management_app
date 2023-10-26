import { validateForm, URL, API_KEY } from "./validation.js";

const form = document.getElementById('form');

form.addEventListener("submit", function(event) {
    event.preventDefault();

    const formData = new FormData(this);

    const data = {};
    formData.forEach((value, key) => {
        data[key] = value;
    });

    const isValidData = validateForm(data);

    if (isValidData) {
        axios.post(URL, data, { 
            headers: {
                'Content-Type': 'application/json',
                'apikey': API_KEY
            }
        })
        .then(response => {
            console.log('Data sent successfully');
            window.location.href = 'users.html';
        })
        .catch(error => {
            console.error('Network error:', error);
        });
    }
});