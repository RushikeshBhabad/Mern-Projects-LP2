# Blog App - Frontend

React + Vite frontend for the Blog Application.

## Tech Stack

- React 18
- Vite (build tool)
- React Router DOM (routing)
- Axios (HTTP client)
- Vanilla CSS (styling)

## Pages

| Page         | Route         | Description                  |
| ------------ | ------------- | ---------------------------- |
| Home         | /             | Lists all blog posts         |
| Blog Details | /blog/:id     | Shows a single blog post     |
| Create Blog  | /create       | Form to create a new blog    |
| Edit Blog    | /edit/:id     | Form to edit existing blog   |

## Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Environment Variables

Create a `.env` file:

```
VITE_API_URL=http://localhost:5000/api
```

> **Note:** In development, Vite is configured with a proxy so you don't need the env variable locally. The env variable is needed for production builds.

### 3. Run in development

```bash
npm run dev
```

### 4. Build for production

```bash
npm run build
```

The build output will be in the `dist/` directory.

## Project Structure

```
frontend/
├── index.html
├── package.json
├── vite.config.js
├── eslint.config.js
├── README.md
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── App.css
    ├── index.css
    ├── assets/
    ├── components/
    │   ├── Navbar.jsx
    │   └── BlogCard.jsx
    ├── contexts/
    └── pages/
        ├── HomePage.jsx
        ├── CreateBlog.jsx
        ├── EditBlog.jsx
        └── BlogDetails.jsx
```

## AWS Deployment

### Using S3 + CloudFront

1. Run `npm run build`
2. Upload the `dist/` folder to an S3 bucket
3. Enable static website hosting on the bucket
4. Set up CloudFront for HTTPS (optional)

### Using EC2

1. Build the project on your local machine
2. Upload the `dist/` folder to EC2
3. Serve with Nginx or run the Vite preview server

> **Important:** Update `VITE_API_URL` in `.env` to your backend's public URL before building.
