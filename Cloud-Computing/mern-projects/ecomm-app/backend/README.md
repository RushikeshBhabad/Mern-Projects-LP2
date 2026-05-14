# E-Commerce App - Backend

Express.js REST API for the E-Commerce Application.

## Tech Stack

- Node.js + Express.js
- MongoDB Atlas (Mongoose ODM)
- dotenv for environment variables

## API Endpoints

### Products

| Method | Endpoint            | Description            |
| ------ | ------------------- | ---------------------- |
| GET    | /api/products       | Get all products       |
| GET    | /api/products/:id   | Get a single product   |
| POST   | /api/products       | Add a new product      |
| PUT    | /api/products/:id   | Update a product       |
| DELETE | /api/products/:id   | Delete a product       |

### Orders

| Method | Endpoint            | Description            |
| ------ | ------------------- | ---------------------- |
| POST   | /api/orders         | Place a new order      |
| GET    | /api/orders/:id     | Get order details      |

## Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Environment Variables

Create a `.env` file:

```
PORT=5000
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/ecommdb?retryWrites=true&w=majority
```

### 3. Seed sample products

```bash
npm run seed
```

### 4. Run the server

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
    ├── server.js                 # Entry point
    ├── seed.js                   # Seed sample products
    ├── config/
    │   └── db.js                 # MongoDB connection
    ├── controllers/
    │   ├── productController.js  # Product handlers
    │   └── orderController.js    # Order handlers
    ├── middlewares/
    │   └── errorHandler.js       # Error handling
    ├── models/
    │   ├── Product.js            # Product model
    │   └── Order.js              # Order model
    └── routes/
        ├── productRoutes.js      # Product routes
        └── orderRoutes.js        # Order routes
```

## AWS Deployment

1. Launch an Ubuntu EC2 instance
2. SSH into the instance
3. Install Node.js
4. Clone the repo and `cd backend`
5. Run `npm install`
6. Set environment variables
7. Run `npm run seed` to populate products
8. Start with PM2: `pm2 start src/server.js --name ecomm-api`
