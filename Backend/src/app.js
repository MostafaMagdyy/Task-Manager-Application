const express = require('express');
const cors = require('cors');
const userRouter = require('./routes/User');
const taskRouter = require('./routes/Task');
const setupSwagger = require('./swagger');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use(userRouter);
app.use(taskRouter);
setupSwagger(app);
module.exports = app;