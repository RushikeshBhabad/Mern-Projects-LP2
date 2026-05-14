# Full Stack MERN Application Deployment using AWS EC2 and GitHub

## Overview

This project demonstrates how to deploy a full stack MERN (MongoDB, Express.js, React.js, Node.js) application on AWS Cloud using two separate EC2 instances.

The deployment architecture separates:

- Frontend Server
- Backend Server
- Cloud Database

The complete deployment is performed directly from a GitHub repository without manually uploading project files.

The implementation uses:

- AWS EC2
- Ubuntu Server
- React.js (Frontend)
- Node.js + Express.js (Backend)
- MongoDB Atlas
- Nginx
- PM2
- Git & GitHub

---

# Objective

- Deploy a full stack MERN application on AWS Cloud
- Use separate EC2 instances for frontend and backend
- Clone project directly from GitHub
- Configure backend APIs
- Configure frontend API communication
- Use MongoDB Atlas as cloud database
- Make the application publicly accessible

---

# Technologies Used

- AWS EC2
- Ubuntu 22.04
- React.js
- Node.js
- Express.js
- MongoDB Atlas
- Nginx
- PM2
- GitHub
- Git
- SSH

---

# Project Structure

```text
Cloud Computing/
└── mern-projects/
    └── blog-app/
        ├── backend/
        └── frontend/
```

---

# Deployment Architecture

```text
                    Internet
                        |
                        |
                Frontend EC2 Instance
                 (React + Nginx)
                        |
                 API Requests
                        |
                Backend EC2 Instance
               (Node.js + PM2)
                        |
                        |
                 MongoDB Atlas
                  Cloud Database
```

---

# Prerequisites

Before starting, ensure you have:

- AWS Account
- GitHub Repository
- EC2 Key Pair (.pem file)
- MongoDB Atlas Database
- Internet Connection
- PowerShell / Terminal

---

# Step 1: Launch Backend EC2 Instance

Open AWS Console.

Go to:

```text
EC2 Dashboard
```

Click:

```text
Launch Instance
```

Configure:

| Setting | Value |
|---|---|
| Name | backend-server |
| Operating System | Ubuntu 22.04 |
| Instance Type | t2.micro |
| Storage | 8 GB |

Use existing key pair.

---

# Backend Security Group Configuration

Allow inbound rules:

| Type | Port | Source |
|---|---|---|
| SSH | 22 | My IP |
| Custom TCP | 5000 | Anywhere |
| HTTP | 80 | Anywhere |

Launch instance.

---

# Step 2: Launch Frontend EC2 Instance

Repeat same process.

Configure:

| Setting | Value |
|---|---|
| Name | frontend-server |
| Operating System | Ubuntu 22.04 |
| Instance Type | t2.micro |
| Storage | 8 GB |

---

# Frontend Security Group Configuration

Allow inbound rules:

| Type | Port | Source |
|---|---|---|
| SSH | 22 | My IP |
| HTTP | 80 | Anywhere |
| HTTPS | 443 | Anywhere |

Launch instance.

---

# Step 3: Connect to Backend Server

Using PowerShell:

```bash
ssh -i awskey.pem ubuntu@<BACKEND_PUBLIC_IP>
```

Example:

```bash
ssh -i awskey.pem ubuntu@13.xxx.xxx.xxx
```

---

# Step 4: Update Backend Server Packages

```bash
sudo apt update
sudo apt upgrade -y
```

---

# Step 5: Install Required Backend Dependencies

Install Git, Curl and Nginx:

```bash
sudo apt install git curl nginx -y
```

---

# Step 6: Install Node.js

```bash
curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
sudo apt install nodejs -y
```

Verify:

```bash
node -v
npm -v
```

---

# Step 7: Install PM2

```bash
sudo npm install -g pm2
```

Verify:

```bash
pm2 -v
```

---

# Step 8: Clone GitHub Repository on Backend Server

Go to home directory:

```bash
cd ~
```

Clone repository:

```bash
git clone <YOUR_GITHUB_REPO_URL>
```

Example:

```bash
git clone https://github.com/krrish2906/Cloud-Computing
```

---

# Step 9: Navigate to Backend Folder

```bash
cd "~/Cloud-Computing/mern-projects/blog-app/backend"
```

---

# Step 10: Install Backend Packages

```bash
npm install
```

---

# Step 11: Configure Backend Environment Variables

Create `.env` file:

```bash
nano .env
```

Add:

```env
PORT=5000
MONGO_URI=your_mongodb_atlas_connection_string
```

Example:

```env
PORT=5000
MONGO_URI=mongodb+srv://user:password@cluster.mongodb.net/blogdb
```

Save file.

---

# Step 12: Start Backend Server using PM2

Check `package.json` scripts first:

```bash
cat package.json
```

If start script exists:

```bash
pm2 start npm --name blog-backend -- start
```

Otherwise:

```bash
pm2 start src/server.js --name blog-backend
```

---

# Step 13: Verify Backend Server

Check PM2 status:

```bash
pm2 list
```

Check logs:

```bash
pm2 logs
```

Expected output:

```text
MongoDB Connected
Server running on port 5000
```

---

# Step 14: Test Backend API

Open browser:

```text
http://<BACKEND_PUBLIC_IP>:5000
```

Or API route:

```text
http://<BACKEND_PUBLIC_IP>:5000/api/blogs
```

Backend should respond successfully.

---

# Step 15: Connect to Frontend Server

Using PowerShell:

```bash
ssh -i awskey.pem ubuntu@<FRONTEND_PUBLIC_IP>
```

---

# Step 16: Update Frontend Server Packages

```bash
sudo apt update
sudo apt upgrade -y
```

---

# Step 17: Install Frontend Dependencies

```bash
sudo apt install nginx git curl -y
```

Install Node.js:

```bash
curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
sudo apt install nodejs -y
```

---

# Step 18: Clone GitHub Repository on Frontend Server

```bash
git clone <YOUR_GITHUB_REPO_URL>
```

Example:

```bash
git clone https://github.com/krrish2906/Cloud-Computing
```

---

# Step 19: Navigate to Frontend Folder

```bash
cd "~/Cloud-Computing/mern-projects/blog-app/frontend"
```

---

# Step 20: Install Frontend Packages

```bash
npm install
```

---

# Step 21: Configure Frontend Environment Variables

Create `.env` file:

```bash
nano .env
```

Add:

```env
VITE_API_URL=http://<BACKEND_PUBLIC_IP>:5000/api
```

Example:

```env
VITE_API_URL=http://13.xxx.xxx.xxx:5000/api
```

Save file.

---

# Step 22: Build React Frontend

```bash
npm run build
```

This creates:

```text
dist/
```

---

# Step 23: Deploy Frontend using Nginx

Remove default files:

```bash
sudo rm -rf /var/www/html/*
```

Copy React build files:

```bash
sudo cp -r dist/* /var/www/html/
```

---

# Step 24: Configure Nginx

Open Nginx configuration:

```bash
sudo nano /etc/nginx/sites-available/default
```

Replace contents with:

```nginx
server {
    listen 80;
    server_name _;

    root /var/www/html;
    index index.html;

    location / {
        try_files $uri /index.html;
    }
}
```

Save file.

---

# Step 25: Restart Nginx

Test configuration:

```bash
sudo nginx -t
```

Restart Nginx:

```bash
sudo systemctl restart nginx
```

Enable Nginx on boot:

```bash
sudo systemctl enable nginx
```

---

# Step 26: Open Frontend Application

Open browser:

```text
http://<FRONTEND_PUBLIC_IP>
```

The MERN application frontend should appear.

---

# Step 27: Verify Complete MERN Communication

Check:

- Frontend loads successfully
- API requests reach backend
- Backend connects to MongoDB Atlas
- Data is fetched correctly

---

# Common Issues and Solutions

## 1. Frontend Loads but API Fails

Cause:
- Wrong API URL
- Backend not running
- Port 5000 blocked

Fix:
- Verify `.env`
- Restart backend
- Open port 5000 in security group

---

## 2. MongoDB Connection Error

Cause:
- Wrong MongoDB URI
- Atlas network access blocked

Fix:
- Verify `.env`
- Add:

```text
0.0.0.0/0
```

in MongoDB Atlas Network Access.

---

## 3. CORS Error

Fix backend CORS configuration:

```javascript
app.use(cors({
  origin: "*",
  credentials: true
}));
```

Restart backend:

```bash
pm2 restart blog-backend
```

---

# Useful Commands

| Operation | Command |
|---|---|
| Connect to EC2 | `ssh -i awskey.pem ubuntu@IP` |
| Clone Repository | `git clone REPO_URL` |
| Install Packages | `npm install` |
| Build React App | `npm run build` |
| Start PM2 App | `pm2 start npm -- start` |
| View PM2 Logs | `pm2 logs` |
| Restart Backend | `pm2 restart blog-backend` |
| Restart Nginx | `sudo systemctl restart nginx` |

---

# Output

- Frontend EC2 deployed successfully
- Backend EC2 deployed successfully
- GitHub repository cloned successfully
- React frontend hosted publicly
- Backend API hosted successfully
- MongoDB Atlas connected
- Full MERN communication achieved

---

# Applications

- Blogging Platforms
- E-commerce Websites
- Task Management Systems
- Student Management Systems
- Event Management Systems
- Full Stack Cloud Applications

---

# Advantages

- Scalable Architecture
- Separate Frontend and Backend Servers
- Cloud-Based Deployment
- Better Resource Management
- Public Accessibility
- Real-world Production Deployment

---

# Result

Successfully deployed a full stack MERN application on AWS Cloud using two separate EC2 instances and GitHub-based deployment architecture.

---

# Conclusion

Deploying frontend and backend services on separate cloud instances improves scalability, maintainability, and real-world deployment understanding. AWS EC2 combined with GitHub, PM2, Nginx, and MongoDB Atlas provides a powerful infrastructure for hosting full stack web applications.

---
