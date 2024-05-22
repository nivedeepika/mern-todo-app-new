// backend/controllers/todoController.js
const Todo = require('../models/Todo');

exports.getTodos = async (req, res) => {
  const { filter, sort } = req.query;
  try {
    const query = {};
    if (filter) {
      query.text = { $regex: filter, $options: 'i' };
    }
    let todos = await Todo.find(query);
    if (sort) {
      todos = todos.sort((a, b) => (a.text > b.text ? 1 : -1));
    }
    res.json(todos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }

};

exports.addTodo = async (req, res) => {
  const newTodo = new Todo({
    text: req.body.text
  });
  try {
    const savedTodo = await newTodo.save();
    res.json(savedTodo);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteTodo = async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) return res.status(404).json({ message: 'Todo not found' });
    await todo.remove();
    res.json({ message: 'Todo deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};