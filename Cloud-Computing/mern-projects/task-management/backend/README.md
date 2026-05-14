# Task Management - Backend

Express.js REST API for the Task Management Application.

## Tech Stack

- Node.js + Express.js
- MongoDB Atlas (Mongoose ODM)
- dotenv for environment variables

## API Endpoints

| Method | Endpoint         | Description          |
| ------ | ---------------- | -------------------- |
| GET    | /api/tasks       | Get all tasks        |
| GET    | /api/tasks/:id   | Get a single task    |
| POST   | /api/tasks       | Create a new task    |
| PUT    | /api/tasks/:id   | Update a task        |
| DELETE | /api/tasks/:id   | Delete a task        |

## Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Environment Variables

Create a `.env` file:

```
PORT=5000
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/taskdb?retryWrites=true&w=majority
```

### 3. Run the server

Development:

```bash
npm run dev
```

Production:

```bash
npm start
```

## Project Structure

```
backend/
├── package.json
├── README.md
└── src/
    ├── server.js            # Entry point
    ├── config/
    │   └── db.js            # MongoDB connection
    ├── controllers/
    │   └── taskController.js # Task route handlers
    ├── middlewares/
    │   └── errorHandler.js  # Error handling middleware
    ├── models/
    │   └── Task.js          # Task Mongoose model
    └── routes/
        └── taskRoutes.js    # Task API routes
```

## AWS Deployment

1. Launch an Ubuntu EC2 instance
2. SSH into the instance
3. Install Node.js
4. Clone the repo and `cd backend`
5. Run `npm install`
6. Set environment variables
7. Start with PM2: `pm2 start src/server.js --name task-api`
