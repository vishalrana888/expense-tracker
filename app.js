const express = require('express');
const path = require('path');
const User = require('./models/user');
const bodyParser = require('body-parser');
const expenseRoutes = require('./routes/expenseRoutes');

const app = express();
const cors = require('cors');
app.use(cors());

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());

const port = process.env.PORT || 3000;

app.post('/user/signup', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        
        const newUser = await User.create({
            name,
            email,
            password
        });

        res.status(201).json({ message: 'User signed up successfully' });
    } catch (error) {
        console.error('Signup Error:', error);
        res.status(500).json({ message: 'Failed to signup', error: error.message });
    }
});

app.post('/user/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ where: { email } });

        if (user && user.password === password) {
            res.status(200).json({ success: true, message: 'Login successful' });
        } else {
            res.status(400).json({ message: 'Invalid email or password' });
        }
    } catch (error) {
        console.error('Login Error:', error);
        res.status(500).json({ message: 'Failed to login', error: error.message });
    }
});

app.use('/api/expenses', expenseRoutes);

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
