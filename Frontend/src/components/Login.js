import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Alert } from '@mui/material';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); // State for error messages

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Clear previous errors
    try {
      const response = await fetch('http://localhost:3000/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Login failed');
      }

      const data = await response.json();
      onLogin(data.token);
    } catch (error) {
      setError(error.message); // Set error message
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" component="h1" gutterBottom>
        Log In
      </Typography>
      {error && <Alert severity="error">{error}</Alert>} {/* Display error message */}
      <form onSubmit={handleSubmit}>
        <TextField
          label="Email"
          type="email"
          variant="outlined"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Log In
        </Button>
      </form>
    </Container>
  );
};

export default Login;