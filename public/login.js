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
            // Display success message
            document.body.innerHTML += `<div style="color:green;">Successfully logged in!</div>`;
        } else {
            throw new Error('Failed to login');
        }
    } catch (error) {
        console.error('Login Error:', error);
        if (error.response && error.response.data && error.response.data.message) {
            if (error.response.data.message.includes('User already exists')) {
                document.body.innerHTML += `<div style="color:red;">User already exists</div>`;
            } else {
                document.body.innerHTML += `<div style="color:red;">${error.response.data.message}</div>`;
            }
        } else {
            document.body.innerHTML += `<div style="color:red;">An error occurred while logging in</div>`;
        }
    }
});
