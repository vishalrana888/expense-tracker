const express = require('express');
const path = require('path');
const User = require('./models/user');
const bodyParser = require('body-parser');
const expenseRoutes = require('./routes/expenseRoutes');
var cors = require('cors')
var app = express()
 
app.use(cors())

const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());

// Define Signup Route
app.post('/user/signup', async (req, res) => {
    try {
        // Extract signup details from request body
        const { name, email, password } = req.body;

        // Logic to save user details to database
        // This is just a placeholder, you should implement the actual logic to save user details to the database
        const newUser = await User.create({
            name,
            email,
            password
        });

        // Send success response
        res.status(201).json({ message: 'User signed up successfully' });
    } catch (error) {
        console.error('Signup Error:', error);
        // Send error response
        res.status(500).json({ message: 'Failed to signup' });
    }
});

app.use('/api/expenses', expenseRoutes);

User.sync()
.then(()=>{
    console.log('user table created sucessfully');
})
.catch(err => {
    console.error('error creating user table:',err)
});
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
