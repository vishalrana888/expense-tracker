const bcrypt = require('bcrypt');
const User = require('../models/user');

// Controller for user signup
exports.signup = async (req, res) => {
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
};

// Controller for user login
exports.login = async (req, res) => {
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
};
