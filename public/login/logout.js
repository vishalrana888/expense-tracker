document.getElementById('logoutButton').addEventListener('click', async function(event) {
    try {
        // Perform logout operation, e.g., invalidate session, clear token, etc.
        // Redirect user to the login page
        window.location.href = 'login.html';
    } catch (error) {
        console.error('Logout Error:', error);
    }
});
