import { URL, API_KEY } from "./validation.js";

axios.get(URL, {
    headers: {
        'Content-Type': 'application/json',
        'apikey': API_KEY
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
            'apikey': API_KEY
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