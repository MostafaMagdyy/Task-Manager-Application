import React, { useState } from 'react';
import { TextField, Button, Container, Typography } from '@mui/material';

const TaskForm = ({ onTaskAdded }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const authToken = localStorage.getItem('token');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`,
        },
        body: JSON.stringify({ title, description }),
      });

      if (!response.ok) {
        throw new Error('Failed to add task');
      }

      const task = await response.json();
      onTaskAdded(task); 
      setTitle('');
      setDescription('');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" component="h1" gutterBottom>
        Add Task
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Title"
          variant="outlined"
          fullWidth
          margin="normal"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <TextField
          label="Description"
          variant="outlined"
          fullWidth
          margin="normal"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Add Task
        </Button>
      </form>
    </Container>
  );
};

export default TaskForm;