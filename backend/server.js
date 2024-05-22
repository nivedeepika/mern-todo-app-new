 // backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const todoRoutes = require('./routes/todoRoutes');

const app = express();
const port = 5000;

app.use(express.json());
app.use(cors());

mongoose.connect('mongodb://localhost:27017/todoapp', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.use('/api', todoRoutes);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});