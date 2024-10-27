```javascript
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Assuming you have a config file for database connection

class Task extends Model {}

Task.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    dueDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    priority: {
      type: DataTypes.ENUM('Low', 'Medium', 'High'),
      allowNull: false,
      defaultValue: 'Low',
    },
  },
  {
    sequelize,
    modelName: 'Task',
    tableName: 'tasks',
    timestamps: false, // Disable timestamps
  }
);

module.exports = Task;
```