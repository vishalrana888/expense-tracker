const bcrypt = require('bcrypt');
const User = require('../models/user');

// Controller for user signup
exports.signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ message: 'Name, email, and password are required' });
        }

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

        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }

        const user = await User.findOne({ where: { email } });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Compare the provided password with the hashed password stored in the database
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Password matches, login successful
        res.status(200).json({ success: true, message: 'Login successful' });
    } catch (error) {
        console.error('Login Error:', error);
        res.status(500).json({ message: 'Failed to login', error: error.message });
    }
};
