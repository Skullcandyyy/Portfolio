# Task Tracker Application - MERN Stack Implementation

## Project Overview
This is a complete Task Tracker application built with the MERN stack (MongoDB, Express.js, React.js, Node.js) that fulfills all the requirements of the assignment.

## Backend Implementation (Node.js + Express.js + MongoDB)

### Features Implemented:
- ✅ REST APIs for CRUD operations
- ✅ MongoDB integration with Mongoose
- ✅ Form validation
- ✅ Error handling
- ✅ Proper HTTP status codes

### Files Created:
- `backend/server.js` - Main server file with all API endpoints
- `backend/package.json` - Dependencies and scripts
- `backend/.env` - Environment variables

### API Endpoints:
- `GET /api/tasks` - Get all tasks (sorted by creation date)
- `GET /api/tasks/:id` - Get a specific task
- `POST /api/tasks` - Create a new task with validation
- `PUT /api/tasks/:id` - Update a task with validation
- `DELETE /api/tasks/:id` - Delete a task

## Frontend Implementation (React.js)

### Features Implemented:
- ✅ Responsive UI
- ✅ Dynamic updates without page refresh
- ✅ Form validation
- ✅ Task listing and management

### Files Created:
- `frontend/src/TaskTracker.js` - Main React component
- `frontend/package.json` - Dependencies
- `frontend/public/index.html` - Basic HTML structure

## Setup Instructions

### Backend Setup:
1. Navigate to backend directory: `cd backend`
2. Install dependencies: `npm install`
3. Create `.env` file with:
   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/tasktracker
   ```
4. Start server: `npm run dev`

### Frontend Setup:
1. Navigate to frontend directory: `cd frontend`
2. Install dependencies: `npm install`
3. Start React app: `npm start`

## Required Dependencies

### Backend:
- express
- mongoose
- cors
- dotenv

### Frontend:
- react
- react-dom
- react-scripts
- axios

## Bonus Features Implemented:
- ✅ Form validation
- ✅ Responsive UI
- ✅ Dynamic updates without page refresh
- ✅ Error handling
- ✅ Clean project structure
- ✅ Proper REST API design

## Deployment Notes:
- Backend: Can be deployed to platforms like Heroku, Vercel, or any Node.js hosting service
- Frontend: Can be deployed to Netlify, Vercel, or any static hosting service
- Both frontend and backend should be deployed to public URLs as required

## How to Use:
1. Start MongoDB server
2. Start backend server: `npm run dev` in backend directory
3. Start frontend: `npm start` in frontend directory
4. Access the application at http://localhost:3000

This implementation fulfills all the mandatory requirements and includes bonus features such as form validation, responsive UI, and dynamic updates without page refresh.