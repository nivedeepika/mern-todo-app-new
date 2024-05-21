// frontend/src/App.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  // Set up a place in the application to keep track of to-do items and new to-do input.
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState('');

  // When the application starts, get the list of to-do items from the server and store them.
  useEffect(() => {
    axios.get('http://localhost:5000/todos')
      .then(response => setTodos(response.data))
      .catch(error => console.error('Error fetching todos:', error));
  }, []);

  // Create a way for users to enter a new to-do item and send it to the server.
  const addTodo = () => {
    if (text) {
      axios.post('http://localhost:5000/todos', { text })
        .then(response => setTodos([...todos, response.data]))
        .catch(error => console.error('Error adding todo:', error));
      setText('');
    }
  };

  // Create a way for users to delete a to-do item and send the request to the server.
  const deleteTodo = (id) => {
    axios.delete(`http://localhost:5000/todos/${id}`)
      .then(() => setTodos(todos.filter(todo => todo._id !== id)))
      .catch(error => console.error('Error deleting todo:', error));
  };

  // Show the list of to-do items on the screen and provide buttons for adding and deleting items.
  return (
    <div className="App">
      <h1>To-Do List</h1>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add a new to-do"
      />
      <button onClick={addTodo}>Add</button>
      <ul>
        {todos.map(todo => (
          <li key={todo._id}>
            {todo.text} <button onClick={() => deleteTodo(todo._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
