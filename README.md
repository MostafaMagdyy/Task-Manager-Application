# 📋 Task Manager Application

A platform where users can manage tasks by creating, reading, updating, and deleting (CRUD) them. It includes user authentication, so users can sign up and log in to access their tasks.

![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png)

## ✨ Features

### 🔐 User Authentication
- Secure signup and login system
- JWT (JSON Web Token) based authentication

### 📝 Task Management
- **Create:** Add new tasks with title, description.
- **Read:** View all your tasks
- **Update:** Mark tasks as completed
- **Delete:** Remove unwanted tasks from your list

![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png)

## 🛠️ Tech Stack

### Frontend
- ![React](https://img.shields.io/badge/-React-61DAFB?logo=react&logoColor=white&style=flat)
- ![Material UI](https://img.shields.io/badge/-Material_UI-0081CB?logo=material-ui&logoColor=white&style=flat)

### Backend
- ![Node.js](https://img.shields.io/badge/-Node.js-339933?logo=node.js&logoColor=white&style=flat)
- ![Express](https://img.shields.io/badge/-Express-000000?logo=express&logoColor=white&style=flat)

### Database
- ![MongoDB](https://img.shields.io/badge/-MongoDB-47A248?logo=mongodb&logoColor=white&style=flat)

### Authentication
- ![JWT](https://img.shields.io/badge/-JWT-000000?logo=json-web-tokens&logoColor=white&style=flat)

![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png)

## 🚀 Getting Started

### Prerequisites
- Node.js
- MongoDB (local or Atlas URI)

### Installation

#### 1. Clone the Repository
```bash
git clone https://github.com/MostafaMagdyy/Task-Manager-Application
cd Task-Manager-Application
```

#### 2. Backend Setup
```bash
# Navigate to backend directory
cd Backend

# Install dependencies
npm install

# Create .env file in root directory and override Those variables inside it.
PORT=3000
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret

# Start the server
node index.js
```

#### 3. Frontend Setup
```bash
# Navigate to frontend directory
cd Frontend

# Install dependencies
npm install

# Start the development server
npm start
```

The application will be available at:
- Backend: `http://localhost:3000`
- Frontend: `http://localhost:3001`

![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png)

## ⚙️ Backend Architecture

The backend is built with Node.js and Express, handling all API requests and business logic for user authentication and task management.

### 📂 Detailed Folder Structure

```
Backend/src
├── models/
│   ├── User.js              # User schema definition
│   └── Task.js              # Task schema definition
├── routes/
│   ├── User.js              # Authentication routes
│   └── Task.js              # Task management routes
├── middleware/
│   ├── auth.js              # JWT authentication middleware
│   ├── validateUser.js      # User data validation
│   └── validateTask.js      # Task data validation
```

## 📚 API Documentation

The API documentation is available through Swagger UI at:
```
http://localhost:3000/api-docs/#/
```
![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png)
