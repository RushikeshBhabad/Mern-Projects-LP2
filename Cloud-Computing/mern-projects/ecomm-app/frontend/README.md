# E-Commerce App - Frontend

React + Vite frontend for the E-Commerce Application.

## Pages

| Page            | Route            | Description                     |
| --------------- | ---------------- | ------------------------------- |
| Home            | /                | Product listing grid            |
| Product Details | /product/:id     | Single product view             |
| Cart            | /cart            | Shopping cart                   |
| Checkout        | /checkout        | Order form                      |
| Add Product     | /add-product     | Add new product form            |
| Edit Product    | /edit-product/:id| Edit product form               |
| Order Success   | /order-success/:id| Order confirmation             |

## Setup

```bash
npm install
npm run dev
```

Create `.env`:
```
VITE_API_URL=http://localhost:5000/api
```
