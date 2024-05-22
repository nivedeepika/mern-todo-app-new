// client/src/App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState('');
  const [filter, setFilter] = useState('');
  const [sort, setSort] = useState('');

  useEffect(() => {
    axios
      .get('http://localhost:5000/api/todos', {
        params: { filter, sort }
      })
      .then((response) => setTodos(response.data))
      .catch((error) => console.error('Error fetching todos:', error));
  }, [filter, sort]);

  const addTodo = () => {
    if (text) {
      axios
        .post('http://localhost:5000/api/todos', { text })
        .then((response) => setTodos([...todos, response.data]))
        .catch((error) => console.error('Error adding todo:', error));
      setText('');
    }
  };

  const deleteTodo = (id) => {
    axios
      .delete(`http://localhost:5000/api/todos/${id}`)
      .then(() => setTodos(todos.filter((todo) => todo._id !== id)))
      .catch((error) => console.error('Error deleting todo:', error));
  };

  return (
    <div>
      <h1>Todo App</h1>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add a new to-do"
      />
      <button onClick={addTodo}>Add</button>
      <br />
      <input
        type="text"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        placeholder="Filter todos"
      />
      <select onChange={(e) => setSort(e.target.value)}>
        <option value="">Sort by</option>
        <option value="text">Text</option>
      </select>
      <ul>
        {todos.map((todo) => (
          <li key={todo._id}>
            {todo.text}


            <button onClick={() => deleteTodo(todo._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;