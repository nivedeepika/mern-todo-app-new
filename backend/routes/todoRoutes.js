// backend/routes/todoRoutes.js
const express = require('express');
const router = express.Router();
const todoController = require('../controllers/todoController');
const auth = require('../middleware/auth');

router.get('/todos', auth, todoController.getTodos);
router.post('/todos', auth, todoController.addTodo);
router.delete('/todos/:id', auth, todoController.deleteTodo);

module.exports = router;