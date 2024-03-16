const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const expenseRoutes = require('./routes/expenseRoutes');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());

app.use('/api/expenses', expenseRoutes);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
