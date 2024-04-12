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
            document.getElementById('successMessage').innerText = 'Account created';
        } else {
            throw new Error('Failed to signup');
        }
    } catch (error) {
        console.error('Signup Error:', error);

        if (error.response && error.response.status === 500) {
            document.getElementById('errorMessage').innerText = 'An internal server error occurred';
        } else if (error.response && error.response.status === 400 && error.response.data) {
            console.log('Actual Error Response:', error.response.data); // Log the actual error response
            
            if (error.response.data.message === 'User already exists') {
                document.getElementById('errorMessage').innerText = 'User already exists';
            } else if (error.response.data.error === 'Validation error') {
                document.getElementById('errorMessage').innerText = 'Validation error occurred';
            } else {
                document.getElementById('errorMessage').innerText = 'An internal server error occurred';
            }
        } else {
            document.getElementById('errorMessage').innerText = 'An error occurred while signing up';
        }
    }
});
