```javascript
// File: authController.js

const bcrypt = require('bcrypt');
const { Users } = require('../models/Users');

// Function to handle registration
exports.registerUser = async (req, res) => {
  const { email, password } = req.body;
  
  try {
    // Check if user already exists
    const existingUser = await Users.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'Email is already registered.' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = await Users.create({ email, password: hashedPassword });

    return res.status(201).json({ success: true, message: 'Registration successful. Please check your email for confirmation.' });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'An error occurred. Please try again.', error });
  }
};

// Function to handle login
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user by email
    const user = await Users.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found.' });
    }

    // Check if password is correct
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ success: false, message: 'Incorrect password.' });
    }

    return res.status(200).json({ success: true, message: 'Login successful.' });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'An error occurred. Please try again.', error });
  }
};
```