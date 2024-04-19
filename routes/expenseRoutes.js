const express = require('express');
const router = express.Router();
const expenseController = require('../controllers/expenseController');

router.get('/', expenseController.getData);
router.post('/', expenseController.addData);
router.put('/:id', expenseController.putUser);
router.delete('/:id', expenseController.deleteUser);

module.exports = router;
