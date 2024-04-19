const express = require('express');
const path = require('path');
const User = require('./models/user');
const bodyParser = require('body-parser');
const expenseRoutes = require('./routes/expenseRoutes');
const userRoutes = require('./routes/userRoutes');
const bcrypt = require('bcrypt'); // Import bcrypt for password hashing and verification

const app = express();
const cors = require('cors');
app.use(cors());
app.use('/api/expenses', expenseRoutes);
app.use('/user', userRoutes);

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());

const port = process.env.PORT || 3000;

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
