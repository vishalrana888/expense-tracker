const express = require('express'); 
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const User = require('./models/user');
const Expense = require("./models/expense");

const sequelize = require('./util/db');

const expenseRoutes = require('./routes/expenseRoutes'); // Import expenseRoutes
const userRoutes = require('./routes/userRoutes');
const bcrypt = require('bcrypt'); // Import bcrypt for password hashing and verification

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.static(path.join(__dirname, 'public')));


app.use('/api/expenses', expenseRoutes); // Mount expenseRoutes at /api/expenses
app.use('/user', userRoutes);

User.hasMany(Expense);
Expense.belongsTo(User);





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
