```javascript
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('todoApp', 'root', 'root', {
  host: 'localhost',
  dialect: 'mysql',
  port: 3306,
});

const Task = sequelize.define('Task', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  title: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  dueDate: {
    type: DataTypes.DATE,
    allowNull: false
  },
  priority: {
    type: DataTypes.ENUM('Low', 'Medium', 'High'),
    allowNull: false,
    defaultValue: 'Low'
  }
}, {
  tableName: 'tasks',
  timestamps: false
});

const createTask = async (req, res) => {
  try {
    const { title, description, dueDate, priority } = req.body;
    const task = await Task.create({ title, description, dueDate, priority });
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create task' });
  }
};

const getTasks = async (req, res) => {
  try {
    const tasks = await Task.findAll();
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve tasks' });
  }
};

const getTaskById = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findByPk(id);
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve task' });
  }
};

const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, dueDate, priority } = req.body;
    const task = await Task.findByPk(id);
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
    await task.update({ title, description, dueDate, priority });
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update task' });
  }
};

const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findByPk(id);
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
    await task.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete task' });
  }
};

module.exports = {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
};
```