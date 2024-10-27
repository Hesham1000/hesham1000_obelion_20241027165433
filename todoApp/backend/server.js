// server.js

const express = require('express');
const mysql = require('mysql2');
const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');
const notificationRoutes = require('./routes/notificationRoutes');
const reportRoutes = require('./routes/reportRoutes');

const app = express();
const PORT = 8000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MySQL Database Connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'agent',
  password: 'agentpass',
  database: 'Obelien AI'
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    process.exit(1);
  }
  console.log('Connected to the MySQL database.');
});

// Routes
app.use('/auth', authRoutes);
app.use('/tasks', taskRoutes);
app.use('/notifications', notificationRoutes);
app.use('/reports', reportRoutes);

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Start the Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
