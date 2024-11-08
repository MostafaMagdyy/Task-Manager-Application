import React, { useState } from 'react';
import { List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, Container, Typography, Select, MenuItem } from '@mui/material';
import { CheckCircle, Cancel, Delete } from '@mui/icons-material';

const TaskList = ({ tasks, setTasks }) => {
  const [filter, setFilter] = useState('all');
  const authToken = localStorage.getItem('token');

  const fetchFilteredTasks = async (status) => {
    try {
      const query = status === 'all' ? '' : `?completed=${status === 'completed'}`;
      const response = await fetch(`http://localhost:3000/tasks${query}`, {
        headers: {
          'Authorization': `Bearer ${authToken}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch tasks');
      }

      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleFilterChange = (event) => {
    const status = event.target.value;
    setFilter(status);
    fetchFilteredTasks(status);
  };

  const toggleTaskCompletion = async (task) => {
    try {
      console.log(task);
      const response = await fetch(`http://localhost:3000/tasks/${task._id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`,
        },
        body: JSON.stringify({ completed: !task.completed }),
      });

      if (!response.ok) {
        throw new Error('Failed to update task');
      }

      const updatedTask = await response.json();
      setTasks(tasks.map(t => t._id === task._id ? updatedTask : t));
    } catch (error) {
      console.error(error);
    }
  };

  const deleteTask = async (taskId) => {
    try {
      const response = await fetch(`http://localhost:3000/tasks/${taskId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${authToken}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete task');
      }

      setTasks(tasks.filter(task => task._id !== taskId));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4" component="h1" gutterBottom>
        Tasks
      </Typography>
      <Select value={filter} onChange={handleFilterChange}>
        <MenuItem value="all">All</MenuItem>
        <MenuItem value="completed">Completed</MenuItem>
        <MenuItem value="incomplete">Incomplete</MenuItem>
      </Select>
      <List>
        {tasks.map(task => (
          <ListItem key={task._id} button>
            <ListItemText
              primary={task.title}
              secondary={task.description}
              style={{ textDecoration: task.completed ? 'line-through' : 'none' }}
            />
            <ListItemSecondaryAction>
              <IconButton edge="end" onClick={() => toggleTaskCompletion(task)}>
                {task.completed ? <Cancel color="secondary" /> : <CheckCircle color="primary" />}
              </IconButton>
              <IconButton edge="end" onClick={() => deleteTask(task._id)}>
                <Delete color="error" />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default TaskList;