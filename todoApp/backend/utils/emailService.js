```javascript
const nodemailer = require('nodemailer');
const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('database', 'root', 'root', {
  host: 'localhost',
  dialect: 'mysql',
  port: 3306,
});

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

const transporter = nodemailer.createTransport({
  host: 'localhost',
  port: 3306,
  auth: {
    user: 'root',
    pass: 'root',
  },
});

const sendRegistrationEmail = async (email, name) => {
  const mailOptions = {
    from: 'noreply@todoapp.com',
    to: email,
    subject: 'Registration Confirmation',
    text: `Hello ${name},\n\nThank you for registering at TodoApp. Please confirm your registration by clicking on the link below:\n\n[Confirmation Link]\n\nBest regards,\nTodoApp Team`,
  };

  try {
    await transporter.sendMail(mailOptions);
    return { success: true, message: 'Confirmation email sent successfully.' };
  } catch (error) {
    return { success: false, message: 'Failed to send confirmation email.', error };
  }
};

module.exports = { sendRegistrationEmail, User };
```