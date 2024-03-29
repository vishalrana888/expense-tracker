const Expense = require('../models/Expense');

const getData= async (req, res) => {
    try {
        const expenses = await Expense.findAll();
        res.json(expenses);
    } catch (error) {
        console.error('Error fetching expenses:', error);
        res.status(500).json({ error: 'Error fetching expenses' });
    }
}
const addData=async (req, res) => {
    try {
        const { category, amount, date } = req.body;
        const newExpense = await Expense.create({ category, amount, date });
        res.status(201).json(newExpense);
    } catch (error) {
        console.error('Error adding expense:', error);
        res.status(500).json({ error: 'Error adding expense' });
    }
}
const putUser=async (req, res) => {
    try {
        const { id } = req.params;
        const { category, amount, date } = req.body;
        const expense = await Expense.findByPk(id);
        if (!expense) {
            return res.status(404).json({ error: 'Expense not found' });
        }
        expense.category = category;
        expense.amount = amount;
        expense.date = date;
        await expense.save();
        res.json(expense);
    } catch (error) {
        console.error('Error updating expense:', error);
        res.status(500).json({ error: 'Error updating expense' });
    }
}
const deleteUser=async (req, res) => {
    try {
        const { id } = req.params;
        const deletedRows = await Expense.destroy({ where: { id } });
        if (!deletedRows) {
            return res.status(404).json({ error: 'Expense not found' });
        }
        res.json({ message: 'Expense deleted successfully' });
    } catch (error) {
        console.error('Error deleting expense:', error);
        res.status(500).json({ error: 'Error deleting expense' });
    }
}

module.exports={
    getData,
    addData,
    putUser,
    deleteUser

}