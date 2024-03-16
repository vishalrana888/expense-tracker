const Expense = require('../models/expense');

// Controller functions for expense management
const expenseController = {
    // Add a new expense
    addExpense: async (req, res) => {
        try {
            const { category, amount, date } = req.body;
            // Create a new expense record in the database
            const newExpense = await Expense.create({ category, amount, date });
            // Respond with the newly created expense
            res.status(201).json(newExpense);
        } catch (error) {
            console.error('Error adding expense:', error);
            res.status(500).json({ error: 'Error adding expense' });
        }
    },

    // Fetch all expenses
    getAllExpenses: async (req, res) => {
        try {
            // Retrieve all expenses from the database
            const expenses = await Expense.findAll();
            // Respond with the list of expenses
            res.json(expenses);
        } catch (error) {
            console.error('Error fetching expenses:', error);
            res.status(500).json({ error: 'Error fetching expenses' });
        }
    },

    // Update an existing expense
    updateExpense: async (req, res) => {
        try {
            const { id } = req.params;
            const { category, amount, date } = req.body;
            // Find the expense by ID
            let expense = await Expense.findByPk(id);
            if (!expense) {
                return res.status(404).json({ error: 'Expense not found' });
            }
            // Update the expense record
            expense.category = category;
            expense.amount = amount;
            expense.date = date;
            await expense.save();
            // Respond with the updated expense
            res.json(expense);
        } catch (error) {
            console.error('Error updating expense:', error);
            res.status(500).json({ error: 'Error updating expense' });
        }
    },

    // Delete an existing expense
    deleteExpense: async (req, res) => {
        try {
            const { id } = req.params;
            // Find the expense by ID and delete it
            const deletedExpense = await Expense.destroy({ where: { id } });
            if (!deletedExpense) {
                return res.status(404).json({ error: 'Expense not found' });
            }
            // Respond with success message
            res.json({ message: 'Expense deleted successfully' });
        } catch (error) {
            console.error('Error deleting expense:', error);
            res.status(500).json({ error: 'Error deleting expense' });
        }
    }
};

module.exports = expenseController;
