const URL = 'https://oboshxaroihamznlgplt.supabase.co/rest/v1/users';
const apikey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9ib3NoeGFyb2loYW16bmxncGx0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTcxOTAwODMsImV4cCI6MjAxMjc2NjA4M30.5hMpZrVCr7NHydQghHhBRgoW6IykUYCbUAMf3Gu52lA';

const urlParams = new URLSearchParams(window.location.search);
const userId = urlParams.get('id');

let initialData = {};

axios.get(`${URL}?id=eq.${userId}`, {
    headers: {
        'Content-Type': 'application/json',
        'apikey': apikey
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

    if (Object.keys(updatedData).length > 0) { 
        axios.patch(`${URL}?id=eq.${userId}`, updatedData, {
            headers: {
                'Content-Type': 'application/json',
                'apikey': apikey
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
});