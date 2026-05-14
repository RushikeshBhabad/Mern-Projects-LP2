# Task Management App - Frontend

React + Vite frontend for the Task Management Application.

## Pages

| Page            | Route            | Description                     |
| --------------- | ---------------- | ------------------------------- |
| Home            | /                | Displays all tasks as cards     |
| Task Details    | /task/:id        | View task details               |
| Create Task     | /create          | Add new task                    |
| Edit Task       | /edit/:id        | Edit existing task              |

## Setup

```bash
npm install
npm run dev
```

Create `.env`:
```
VITE_API_URL=http://localhost:5000/api
```
