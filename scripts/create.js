const URL = 'https://oboshxaroihamznlgplt.supabase.co/rest/v1/users';
const apikey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9ib3NoeGFyb2loYW16bmxncGx0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTcxOTAwODMsImV4cCI6MjAxMjc2NjA4M30.5hMpZrVCr7NHydQghHhBRgoW6IykUYCbUAMf3Gu52lA';

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
                'apikey': apikey
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

const validateForm = (data) => {
    let isValid = true;

    const showError = (input, message) => {
        const errorElement = document.createElement('div');
        errorElement.className = "error";
        errorElement.textContent = message;
        input.parentNode.appendChild(errorElement);
        isValid = false;
    }

    const errorMessages = document.querySelectorAll('.error');
    errorMessages.forEach((error) => error.remove());

    for (const key in data) {
        switch (key) {
        case 'first_name':
        case 'last_name' :
            if (!/^[a-zA-Z]{2,25}$/.test(data[key])) {
                showError(document.querySelector(`[name="${key}"]`), `Must contain between 2 and 25 letters`);
            } 
            break;
        case 'start_with' :
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            const selectedDate = new Date(data[key]);
            selectedDate.setHours(0, 0, 0, 0);
            if (selectedDate.getTime() !== today.getTime()) {
                showError(document.querySelector(`[name="${key}"]`), `Must contain today's date`);
            }
            break;
        case 'comments' :
            if (data[key].length > 255) {
                showError(document.querySelector(`[name="${key}"]`), `Should be less than 255 words`);
            } break;
        } 
    }

    return isValid;
}