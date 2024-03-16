const express = require('express');
const router = express.Router();
const Expense = require('../models/Expense');
const expenseController=require('../controllers/expenseController');
// Get all expenses
router.get('/',expenseController.getData );

// Add a new expense
router.post('/', expenseController.addData);

// Update an expense
router.put('/:id', expenseController.putUser);

// Delete an expense
router.delete('/:id', expenseController.deleteUser);

module.exports = router;
