# Task Tracker Backend

This is the backend API for the Task Tracker application built with Node.js, Express.js, and MongoDB.

## Features

- RESTful API endpoints for task management (CRUD operations)
- MongoDB integration with Mongoose
- CORS support
- Environment variable configuration

## API Endpoints

- `GET /api/tasks` - Get all tasks
- `GET /api/tasks/:id` - Get a specific task
- `POST /api/tasks` - Create a new task
- `PUT /api/tasks/:id` - Update a task
- `DELETE /api/tasks/:id` - Delete a task

## Setup Instructions

1. Install dependencies:
   ```
   npm install
   ```

2. Create a `.env` file with:
   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/tasktracker
   ```

3. Start the server:
   ```
   npm run dev
   ```