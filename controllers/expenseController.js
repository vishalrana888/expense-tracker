const Expense = require('../models/expense');

const getData = async (req, res) => {
    try {
        const expenses = await Expense.findAll();
        res.json(expenses);
    } catch (error) {
        console.error('Error fetching expenses:', error);
        res.status(500).json({ error: 'Error fetching expenses', detailedError: error.message });
    }
}

const addData = async (req, res) => {
    try {
        const { category, amount, date, description } = req.body;

        if (!category || !amount || !date || !description) {
            return res.status(400).json({ message: 'Category, amount, date, and description are required' });
        }

        const newExpense = await Expense.create({ category, amount, date, description });
        res.status(201).json(newExpense);
    } catch (error) {
        console.error('Error adding expense:', error);
        res.status(500).json({ error: 'Error adding expense', detailedError: error.message });
    }
}


const putUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { category, amount, date, description } = req.body;
        
        const expense = await Expense.findByPk(id);

        if (!expense) {
            return res.status(404).json({ error: 'Expense not found' });
        }

        // Update the expense details
        expense.category = category;
        expense.amount = amount;
        expense.date = date;
        expense.description = description;

        // Save the updated expense
        await expense.save();

        res.json(expense);
    } catch (error) {
        console.error('Error updating expense:', error);
        res.status(500).json({ error: 'Error updating expense', detailedError: error.message });
    }
}

const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedRows = await Expense.destroy({ where: { id } });

        if (!deletedRows) {
            return res.status(404).json({ error: 'Expense not found' });
        }

        res.json({ message: 'Expense deleted successfully' });
    } catch (error) {
        console.error('Error deleting expense:', error);
        res.status(500).json({ error: 'Error deleting expense', detailedError: error.message });
    }
}

module.exports = {
    getData,
    addData,
    putUser,
    deleteUser
}
