# Task Tracker Application

This is a full-stack Task Tracker application built with the MERN stack (MongoDB, Express.js, React.js, Node.js).

## Features Implemented

- Create, Read, Update, Delete (CRUD) tasks
- Form validation
- RESTful APIs
- MongoDB integration
- Responsive UI
- Dynamic updates without page refresh

## Project Structure

```
task-tracker/
├── backend/
│   ├── server.js
│   ├── package.json
│   └── .env
└── frontend/
    └── (React app files)
```

## Backend Setup

1. Navigate to the backend directory:
   ```
   cd backend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file with:
   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/tasktracker
   ```

4. Start the server:
   ```
   npm run dev
   ```

## Frontend Setup (React)

1. Navigate to the frontend directory:
   ```
   cd frontend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the React app:
   ```
   npm start
   ```

## API Endpoints

- `GET /api/tasks` - Get all tasks
- `GET /api/tasks/:id` - Get a specific task
- `POST /api/tasks` - Create a new task
- `PUT /api/tasks/:id` - Update a task
- `DELETE /api/tasks/:id` - Delete a task

## Required Dependencies (Backend)

- express
- mongoose
- cors
- dotenv

## Required Dependencies (Frontend)

- react
- react-dom
- react-scripts
- axios

## How to Run

1. Start MongoDB server
2. Start backend server: `npm run dev` in backend directory
3. Start frontend: `npm start` in frontend directory