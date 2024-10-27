import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './TaskPage.js.css';

const TaskPage = () => {
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState('Low');
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/tasks');
        setTasks(response.data);
      } catch (error) {
        setError('Error retrieving tasks');
      }
    };
    fetchTasks();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newTask = {
        title: taskTitle,
        description: taskDescription,
        dueDate: dueDate,
        priority: priority,
      };
      const response = await axios.post('http://localhost:8000/api/tasks', newTask, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      setTasks([...tasks, response.data]);
      setTaskTitle('');
      setTaskDescription('');
      setDueDate('');
      setPriority('Low');
    } catch (error) {
      setError('Error creating task');
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/tasks/${id}`);
      setTasks(tasks.filter(task => task.id !== id));
    } catch (error) {
      setError('Error deleting task');
    }
  };

  return (
    <div className="task-page">
      <h1>Create New Task</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Task Title:
          <input
            type="text"
            value={taskTitle}
            onChange={(e) => setTaskTitle(e.target.value)}
            required
          />
        </label>
        <label>
          Description:
          <textarea
            value={taskDescription}
            onChange={(e) => setTaskDescription(e.target.value)}
            required
          />
        </label>
        <label>
          Due Date:
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            required
          />
        </label>
        <label>
          Priority Level:
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </label>
        <button type="submit">Save Task</button>
      </form>
      {error && <p className="error">{error}</p>}
      <div className="task-list">
        <h2>Task List</h2>
        <ul>
          {tasks.map((task) => (
            <li key={task.id}>
              <h3>{task.title}</h3>
              <p>{task.description}</p>
              <p>Due Date: {task.dueDate}</p>
              <p>Priority: {task.priority}</p>
              <button onClick={() => handleDelete(task.id)}>Delete Task</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TaskPage;
