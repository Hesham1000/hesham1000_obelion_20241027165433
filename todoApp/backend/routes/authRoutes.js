```javascript
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('todoApp', 'root', 'root', {
  host: 'localhost',
  port: 3306,
  dialect: 'mysql'
});

sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  email: {
    type: DataTypes.STRING(255),
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING(255),
    allowNull: false
  }
}, {
  tableName: 'Users'
});

router.post('/register', async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await authController.registerUser(email, password);
    if (result.success) {
      res.status(201).json({ success: true, message: 'Registration successful. Please check your email for confirmation.' });
    } else {
      res.status(400).json({ success: false, message: result.message || 'Registration failed' });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: 'An error occurred. Please try again.' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await authController.loginUser(email, password);
    if (result.success) {
      res.status(200).json({ success: true, message: 'Login successful', token: result.token });
    } else {
      res.status(401).json({ success: false, message: result.message || 'Login failed' });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: 'An error occurred. Please try again.' });
  }
});

module.exports = router;
```