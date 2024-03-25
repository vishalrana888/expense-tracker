document.getElementById('signupForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const name = document.getElementById('signupName').value;
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('password').value;

    const signupDetails = {
        name,
        email,
        password
    };

    try {
        const response = await axios.post('http://localhost:3000/user/signup', signupDetails);

        if (response.status === 201) {
            window.location.href = "./signup.html"; // Redirect to signup.html
        } else {
            throw new Error('Failed to signup');
        }
    } catch (error) {
        console.error('Signup Error:', error);

        if (error.response && error.response.data && error.response.data.message) {
            if (error.response.data.message.includes('User already exists')) {
                // Display "User already exists" error message on the screen
                document.getElementById('errorMessage').innerText = 'User already exists';
            } else {
                // Display the error message returned from the server on the screen
                document.getElementById('errorMessage').innerText = error.response.data.message;
            }
        } else {
            // Display a generic error message on the screen
            document.getElementById('errorMessage').innerText = 'An error occurred while signing up';
        }
    }
});