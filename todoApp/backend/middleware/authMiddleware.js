```javascript
const jwt = require('jsonwebtoken');
const { Users } = require('../models'); // Importing Users model

const authMiddleware = async (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) return res.status(401).json({ message: 'Access denied. No token provided.' });

  try {
    const decoded = jwt.verify(token, 'your_jwt_secret_key');
    const user = await Users.findByPk(decoded.id); // Ensure user exists in the database
    if (!user) return res.status(401).json({ message: 'Invalid token. User not found.' });

    req.user = user;
    next();
  } catch (ex) {
    res.status(400).json({ message: 'Invalid token.' });
  }
};

module.exports = authMiddleware;
```