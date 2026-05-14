# Blog App - Backend

Express.js REST API for the Blog Application.

## Tech Stack

- Node.js + Express.js
- MongoDB Atlas (Mongoose ODM)
- dotenv for environment variables

## API Endpoints

| Method | Endpoint         | Description          |
| ------ | ---------------- | -------------------- |
| GET    | /api/blogs       | Get all blog posts   |
| GET    | /api/blogs/:id   | Get a single blog    |
| POST   | /api/blogs       | Create a new blog    |
| PUT    | /api/blogs/:id   | Update a blog        |
| DELETE | /api/blogs/:id   | Delete a blog        |

## Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Environment Variables

Create a `.env` file:

```
PORT=5000
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/blogapp?retryWrites=true&w=majority
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
    │   └── blogController.js # Blog route handlers
    ├── middlewares/
    │   └── errorHandler.js  # Error handling middleware
    ├── models/
    │   └── Blog.js          # Blog Mongoose model
    └── routes/
        └── blogRoutes.js    # Blog API routes
```

## AWS Deployment

1. Launch an Ubuntu EC2 instance
2. SSH into the instance
3. Install Node.js: `curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash - && sudo apt-get install -y nodejs`
4. Clone the repo and `cd backend`
5. Run `npm install`
6. Set environment variables
7. Start with PM2: `pm2 start src/server.js --name blog-api`
