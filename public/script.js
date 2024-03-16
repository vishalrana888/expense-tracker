// Define the expenses variable at a global scope
let expenses = [];

// Function to fetch all expenses from the server
async function fetchExpenses() {
    try {
        const response = await fetch('/api/expenses');
        if (!response.ok) {
            throw new Error('Failed to fetch expenses');
        }
        const data = await response.json();
        // Assign the fetched data to the expenses variable
        expenses = data;
        renderExpenses();
    } catch (error) {
        console.error('Error fetching expenses:', error);
    }
}

// Function to add a new expense to the server
async function addExpense(expense) {
    try {
        const response = await fetch('/api/expenses', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(expense),
        });
        if (!response.ok) {
            throw new Error('Failed to add expense');
        }
        const data = await response.json();
        // Push the newly added expense to the expenses array
        expenses.push(data);
        renderExpenses();
    } catch (error) {
        console.error('Error adding expense:', error);
    }
}

// Function to update an existing expense on the server
async function updateExpense(expense) {
    try {
        const response = await fetch(`/api/expenses/${expense.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(expense),
        });
        if (!response.ok) {
            throw new Error('Failed to update expense');
        }
        const data = await response.json();
        // Find the index of the updated expense in the expenses array
        const index = expenses.findIndex(e => e.id === expense.id);
        if (index !== -1) {
            // Update the expense in the expenses array
            expenses[index] = data;
            renderExpenses();
        }
    } catch (error) {
        console.error('Error updating expense:', error);
    }
}

// Function to delete an expense from the server
async function deleteExpense(id) {
    try {
        const response = await fetch(`/api/expenses/${id}`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            throw new Error('Failed to delete expense');
        }
        // Remove the deleted expense from the expenses array
        expenses = expenses.filter(expense => expense.id !== id);
        renderExpenses();
    } catch (error) {
        console.error('Error deleting expense:', error);
    }
}

// Function to render expenses in the table and display total amount
function renderExpenses() {
    const tableBody = document.getElementById('expense-table-body');
    const totalAmountCell = document.getElementById('total-amount');
    let totalAmount = 0;

    tableBody.innerHTML = '';
    expenses.forEach(expense => {
        totalAmount += expense.amount;
        const row = tableBody.insertRow();
        row.innerHTML = `
            <td>${expense.category}</td>
            <td>${expense.amount}</td>
            <td>${expense.date}</td>
            <td><button class="edit-btn" onclick="editExpense(${expense.id})">Edit</button></td>
            <td><button class="delete-btn" onclick="deleteExpense(${expense.id})">Delete</button></td>
        `;
    });

    // Display the total amount
    totalAmountCell.textContent = totalAmount.toFixed(2);
}

// Function to populate form fields for editing an expense
function editExpense(id) {
    const expense = expenses.find(expense => expense.id === id);
    if (expense) {
        document.getElementById('category-select').value = expense.category;
        document.getElementById('amount-input').value = expense.amount;
        document.getElementById('date-input').value = expense.date;
        document.getElementById('expense-id').value = expense.id;
        document.getElementById('add-btn').textContent = 'Update';
    }
}

// Event listener to handle form submission
document.getElementById('add-btn').addEventListener('click', function(event) {
    event.preventDefault();
    const category = document.getElementById('category-select').value;
    const amount = parseFloat(document.getElementById('amount-input').value);
    const date = document.getElementById('date-input').value;
    if (category && amount && date) {
        const expense = { category, amount, date };
        const expenseId = document.getElementById('expense-id').value;
        if (expenseId) {
            // Update existing expense
            expense.id = parseInt(expenseId);
            updateExpense(expense);
        } else {
            // Add new expense
            addExpense(expense);
        }
    }
});

// Initialize by fetching expenses from the server
fetchExpenses();
