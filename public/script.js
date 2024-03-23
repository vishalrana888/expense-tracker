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
            <td>${expense.description}</td>
            <td>${expense.amount}</td>
            <td>${expense.date}</td>
            <td><button class="edit-btn" onclick="editExpense(${expense.id})">Edit</button></td>
            <td><button class="delete-btn" onclick="deleteExpense(${expense.id})">Delete</button></td>
        `;
    });

    // Display the total amount
    totalAmountCell.textContent = totalAmount.toFixed(2);

    // Reset the form and button text after rendering
    resetForm();
}

// Function to populate form fields for editing an expense
function editExpense(id) {
    const expense = expenses.find(expense => expense.id === id);
    if (expense) {
        document.getElementById('category-select').value = expense.category;
        document.getElementById('description-input').value = expense.description;
        document.getElementById('amount-input').value = expense.amount;
        document.getElementById('date-input').value = formatDate(expense.date);
        document.getElementById('expense-id').value = expense.id;
        document.getElementById('add-btn').textContent = 'Update';
    }
}

// Function to format date string to "yyyy-MM-dd" format
function formatDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

// Function to reset the form and button text
function resetForm() {
    document.getElementById('category-select').value = '';
    document.getElementById('description-input').value = '';
    document.getElementById('amount-input').value = '';
    document.getElementById('date-input').value = '';
    document.getElementById('expense-id').value = '';
    document.getElementById('add-btn').textContent = 'Add';
    document.getElementById('add-btn').removeEventListener('click', updateExpense);
    document.getElementById('add-btn').addEventListener('click', handleAdd);
}

// Function to handle the form submission and add/update expense
function handleAdd(event) {
    event.preventDefault();
    const category = document.getElementById('category-select').value;
    const description = document.getElementById('description-input').value; // Get description value
    const amount = parseFloat(document.getElementById('amount-input').value);
    const date = document.getElementById('date-input').value;
    if (category && description && amount && date) {
        const expense = { category, description, amount, date }; // Include description in the expense object
        const expenseId = document.getElementById('expense-id').value;
        if (expenseId) {
            // Update existing expense
            const updatedExpense = { id: parseInt(expenseId), ...expense };
            updateExpense(updatedExpense);
        } else {
            // Add new expense
            addExpense(expense);
        }
    }
}


// Event listener to handle form submission
document.getElementById('add-btn').addEventListener('click', handleAdd);

// Initialize by fetching expenses from the server
fetchExpenses();
