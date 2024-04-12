const express = require('express');
const path = require('path');
const User = require('./models/user');
const bodyParser = require('body-parser');
const expenseRoutes = require('./routes/expenseRoutes');
const bcrypt = require('bcrypt'); // Import bcrypt for password hashing and verification

const app = express();
const cors = require('cors');
app.use(cors());

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());

const port = process.env.PORT || 3000;

// Route for user signup
app.post('/user/signup', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Hash the password before saving it to the database
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            name,
            email,
            password: hashedPassword // Store hashed password in the database
        });

        res.status(201).json({ message: 'User signed up successfully' });
    } catch (error) {
        console.error('Signup Error:', error);
        res.status(500).json({ message: 'Failed to signup', error: error.message });
    }
});

// Route for user login
app.post('/user/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ where: { email } });

        if (user) {
            // Compare the provided password with the hashed password stored in the database
            const passwordMatch = await bcrypt.compare(password, user.password);
            if (passwordMatch) {
                // Password matches, login successful
                res.status(200).json({ success: true, message: 'Login successful' });
            } else {
                // Incorrect password
                res.status(401).json({ message: 'Invalid email or password' });
            }
        } else {
            // User not found
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        console.error('Login Error:', error);
        res.status(500).json({ message: 'Failed to login', error: error.message });
    }
});

// Other routes and configurations...

User.sync()
    .then(() => {
        console.log('user table created successfully');
    })
    .catch(err => {
        console.error('error creating user table:', err);
    });

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
