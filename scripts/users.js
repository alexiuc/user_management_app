const URL = 'https://oboshxaroihamznlgplt.supabase.co/rest/v1/users';
const apikey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9ib3NoeGFyb2loYW16bmxncGx0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTcxOTAwODMsImV4cCI6MjAxMjc2NjA4M30.5hMpZrVCr7NHydQghHhBRgoW6IykUYCbUAMf3Gu52lA';

axios.get(URL, {
    headers: {
        'Content-Type': 'application/json',
        'apikey': apikey
    }
})
.then(response => {
    const users = response.data;
    const tbody = document.querySelector('table tbody');

    users.forEach(user => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${user.first_name}</td>
            <td>${user.last_name}</td>
            <td>${user.gender}</td>
            <td>${user.age}</td>
            <td>${user.start_with}</td>
            <td>${user.language}</td>
            <td>${user.comments}</td>
            <td>
                <button class="edit">Edit</button> 
                <button class="delete">Delete</button>
            </td>
        `;
        tbody.appendChild(row);

        const deleteBtn = row.querySelector('.delete');
        deleteBtn.addEventListener('click', () => deleteUser(user.id));

        const editBtn = row.querySelector('.edit');
        editBtn.addEventListener('click', () => editUser(user.id));
    });
})
.catch(error => {
    console.error('Network error:', error);
});

const deleteUser = (userId) => {
    axios.delete(`${URL}?id=eq.${userId}`, {
        headers: {
            'Content-Type': 'application/json',
            'apikey': apikey
        }
    })
    .then(response => {
        console.log(`User with ID ${userId} deleted successfully`);
        location.reload();
    })
    .catch(error => {
        console.error('Network error:', error);
    });
}

const editUser = (userId) => {
    window.location.href = `edit.html?id=${userId}`;
}