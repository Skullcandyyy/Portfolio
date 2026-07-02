# Task Tracker Application

A full-stack Task Tracker application built with the MERN stack (MongoDB, Express.js, React.js, Node.js).

## Live Demo

- **Frontend**: https://task-tracker14.netlify.app
- **Backend API**: https://task-tracker-7bxp.onrender.com

## Features

### Mandatory
- Create, Read, Update, Delete (CRUD) tasks
- Form validation (both frontend & backend)
- RESTful APIs
- MongoDB Atlas integration
- Responsive UI (mobile-friendly)
- Dynamic updates without page refresh

### Bonus
- Filter tasks: All / Active / Completed
- Sort tasks: Newest, Oldest, A-Z, Z-A
- Search tasks by title
- Toast notifications for add/update/delete
- Reusable components (TaskForm, TaskItem, Notification)
- Custom hook for data management (useTasks)
- Statistics bar (total, active, completed counts)
- Modern UI with animations and gradients

## Project Structure

```
task-tracker/
├── backend/
│   ├── server.js
│   ├── package.json
│   └── .env
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── TaskForm.js
│   │   │   ├── TaskItem.js
│   │   │   └── Notification.js
│   │   ├── hooks/
│   │   │   └── useTasks.js
│   │   ├── App.js
│   │   ├── App.css
│   │   └── index.js
│   ├── package.json
│   └── .env
└── netlify.toml
```

## Setup Instructions

### Backend Setup
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

### Frontend Setup
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

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/tasks` | Get all tasks |
| GET | `/api/tasks/:id` | Get a specific task |
| POST | `/api/tasks` | Create a new task |
| PUT | `/api/tasks/:id` | Update a task |
| DELETE | `/api/tasks/:id` | Delete a task |

## Tech Stack

- **Frontend**: React.js, Axios
- **Backend**: Node.js, Express.js
- **Database**: MongoDB Atlas
- **Deployment**: Render (backend), Netlify (frontend)
