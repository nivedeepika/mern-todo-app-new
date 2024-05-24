// frontend/src/App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState('');
  const [filter, setFilter] = useState('');
  const [sort, setSort] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState('');

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setIsLoggedIn(true);
      setToken(storedToken);
    }
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      axios
        .get('http://localhost:5000/api/todos', {
          params: { filter, sort },
          headers: { Authorization: `Bearer ${token}` }
        })
        .then((response) => setTodos(response.data))
        .catch((error) => console.error('Error fetching todos:', error));
    }
  }, [filter, sort, isLoggedIn, token]);

  const addTodo = () => {
    if (text && isLoggedIn) {
      axios
        .post('http://localhost:5000/api/todos', { text }, { headers: { Authorization: `Bearer ${token}` } })
        .then((response) => setTodos([...todos, response.data]))
        .catch((error) => console.error('Error adding todo:', error));
      setText('');
    }
  };

  const deleteTodo = (id) => {
    if (isLoggedIn) {
      axios
        .delete(`http://localhost:5000/api/todos/${id}`, { headers: { Authorization: `Bearer ${token}` } })
        .then(() => setTodos(todos.filter((todo) => todo._id !== id)))
        .catch((error) => console.error('Error deleting todo:', error));
    }
  };

  const handleLogin = () => {
    axios
      .post('http://localhost:5000/api/auth/login', { username, password })
      .then((response) => {
        setIsLoggedIn(true);
        setToken(response.data.token);
        localStorage.setItem('token', response.data.token);
      })
      .catch((error) => console.error('Error logging in:', error));
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setToken('');
    localStorage.removeItem('token');
  };

  return (
    <div>
      <h1>Todo App</h1>
      {isLoggedIn ? (
        <>
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
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <div>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
          <button onClick={handleLogin}>Login</button>
        </div>
      )}
    </div>
  );
};

export default App;