document.getElementById('loginForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    const loginDetails = {
        email,
        password
    };

    try {
        const response = await axios.post('http://localhost:3000/user/login', loginDetails);

        if (response.status === 200) {
            // Redirect to dashboard after successful login
            window.location.href = 'dashboard.html';
        } else {
            throw new Error('Failed to login');
        }
    } catch (error) {
        console.error('Login Error:', error);
        const errorMessage = document.getElementById('errorMessage');
        if (error.response && error.response.data && error.response.data.message) {
            errorMessage.textContent = error.response.data.message;
        } else {
            errorMessage.textContent = 'An error occurred while logging in';
        }
    }
});
