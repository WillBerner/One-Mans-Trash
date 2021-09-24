// Handle updating user email address
const updateEmailHandler = async (event) => {
    event.preventDefault();

    // Collect value from email update field
    const newEmail = document.querySelector('#email-update').value.trim();

    // Attempt to update the email address
    const response = await fetch('/api/users/updateEmail', {
        method: 'PUT',
        body: JSON.stringify({ newEmail }),
        headers: { 'Content-Type': 'application/json' },
    });

    // If everything's good, alert the user and reload the page
    // Would be better to eventually use something other than an alert
    if (response.ok) {
        alert('Email Address updated successfully');
        // Page needs to be re-rendered to successfully sequentially update information (only necessary for email changes)
        document.location.replace('/profile');
    } else {
        alert(response.statusText);
    }

}

// Handle updating user name
const updateNameHandler = async (event) => {
    event.preventDefault();

    // Collect value from email update field
    const newName = document.querySelector('#name-update').value.trim();

    // Attempt to update the name
    const response = await fetch('/api/users/updateName', {
        method: 'PUT',
        body: JSON.stringify({ newName }),
        headers: { 'Content-Type': 'application/json' },
    });

    // If everything's good, alert the user and reload the page
    // Would be better to eventually use something other than an alert
    if (response.ok) {
        alert('Name updated successfully');
    } else {
        alert(response.statusText);
    }

}

// Handle updating user password
const updatePasswordHandler = async (event) => {
    event.preventDefault();

    // Collect value from email update field
    const newPassword = document.querySelector('#password-update').value.trim();

    // Attempt to update the password
    const response = await fetch('/api/users/updatePassword', {
        method: 'PUT',
        body: JSON.stringify({ newPassword }),
        headers: { 'Content-Type': 'application/json' },
    });

    // If everything's good, alert the user and reload the page
    // Would be better to eventually use something other than an alert
    if (response.ok) {
        alert('Password updated successfully');
    } else {
        alert(response.statusText);
    }

}

// Handle deleting a user's item
const deleteUserItemHandler = async (event) => {
    event.preventDefault();

    // Get the id of the item to delete
    const productID = event.target.id;

    // Attempt to delete the item
    const response = await fetch(`/api/products/${productID}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
    });

    // If the item was successfully deleted, reload the page to update
    if (response.ok) {
        alert('Item removed successfully');
        document.location.reload();
    } else {
        alert(response.statusText);
    }

}

// Add click handlers to the update buttons
document.querySelector('.update-email-form').addEventListener('submit', updateEmailHandler);
document.querySelector('.update-name-form').addEventListener('submit', updateNameHandler);
document.querySelector('.update-password-form').addEventListener('submit', updatePasswordHandler);

// Add click handlers to each of the item deletion buttons
let deleteButtons = document.querySelectorAll('.itemDeleteButton');
deleteButtons.forEach(button => {
    button.addEventListener('click', deleteUserItemHandler);
});