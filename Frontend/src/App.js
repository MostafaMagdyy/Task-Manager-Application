import React, { useState, useEffect } from 'react';
import Signup from './components/Signup';
import Login from './components/Login';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import { Container, Button, Typography } from '@mui/material';

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    if (token) {
      fetchTasks();
    }
  }, [token]);

  const fetchTasks = async () => {
    try {
      const response = await fetch('http://localhost:3000/tasks', {
        headers: {
          'Authorization': `Bearer ${token}`,
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

  const handleAuth = (newToken) => {
    setToken(newToken);
    localStorage.setItem('token', newToken);
    fetchTasks(); // Fetch tasks after login/signup
  };

  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem('token');
    setTasks([]); // Clear tasks on logout
  };

  const handleTaskAdded = (newTask) => {
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  return (
    <Container>
      <Typography variant="h2" component="h1" gutterBottom>
        Task Manager
      </Typography>
      {!token ? (
        <>
          <Signup onSignup={handleAuth} />
          <Login onLogin={handleAuth} />
        </>
      ) : (
        <>
          <Button variant="contained" color="secondary" onClick={handleLogout}>
            Logout
          </Button>
          <TaskForm onTaskAdded={handleTaskAdded} />
          <TaskList tasks={tasks} setTasks={setTasks} />
        </>
      )}
    </Container>
  );
};

export default App;