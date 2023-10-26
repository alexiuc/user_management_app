import { validateForm, URL, API_KEY } from "./validation.js";

const urlParams = new URLSearchParams(window.location.search);
const userId = urlParams.get('id');

let initialData = {};

axios.get(`${URL}?id=eq.${userId}`, {
    headers: {
        'Content-Type': 'application/json',
        'apikey': API_KEY
    }
})
.then(response => {
    const userData = response.data[0];
    initialData = {...userData};

    document.getElementById('first_name').value = userData.first_name;
    document.getElementById('last_name').value = userData.last_name;
    document.querySelector(`input[name="gender"][value="${userData.gender}"]`).checked = true;
    document.getElementById('age').value = userData.age;
    document.getElementById('date').value = userData.start_with;
    document.querySelector(`select[name="language"]`).value = userData.language;
    document.getElementById('comments').value = userData.comments;
})
.catch(error => {
    console.error('Network error:', error);
});

const form = document.getElementById('form');

form.addEventListener('submit', function(event) {
    event.preventDefault();
    
    const formData = new FormData(this);
    const updatedData = {};
      
    formData.forEach((value, key) => {
        if (value !== initialData[key]) { 
            updatedData[key] = value;
        }
    });

    const isValidData = validateForm(updatedData, true);

    if (isValidData) {
       if (Object.keys(updatedData).length > 0) { 
            axios.patch(`${URL}?id=eq.${userId}`, updatedData, {
                headers: {
                    'Content-Type': 'application/json',
                    'apikey': API_KEY
                }
            })
            .then(response => {
                console.log(`User with ID ${userId} updated successfully`);
                window.location.href = 'users.html';
            })
            .catch(error => {
                console.error('Network error:', error);
            });
        } 
    }
});