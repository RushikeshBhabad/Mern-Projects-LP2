const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Product = require("./models/Product");

dotenv.config();

const sampleProducts = [
  {
    name: "Wireless Bluetooth Headphones",
    description: "High-quality over-ear wireless headphones with noise cancellation, 30-hour battery life, and premium sound quality. Perfect for music lovers and professionals.",
    price: 2499,
    category: "Electronics",
    stock: 25,
    imageUrl: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80",
  },
  {
    name: "Laptop Backpack",
    description: "Durable and water-resistant laptop backpack with multiple compartments, USB charging port, and padded straps. Fits laptops up to 15.6 inches.",
    price: 1299,
    category: "Accessories",
    stock: 40,
    imageUrl: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&q=80",
  },
  {
    name: "Smart Watch Pro",
    description: "Feature-packed smartwatch with heart rate monitor, GPS tracking, sleep analysis, and water resistance. Compatible with Android and iOS.",
    price: 3999,
    category: "Electronics",
    stock: 15,
    imageUrl: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80",
  },
  {
    name: "Running Shoes",
    description: "Lightweight and breathable running shoes with cushioned sole, arch support, and slip-resistant grip. Available in multiple sizes.",
    price: 1899,
    category: "Footwear",
    stock: 50,
    imageUrl: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&q=80",
  },
  {
    name: "Stainless Steel Water Bottle",
    description: "Double-walled vacuum insulated water bottle. Keeps drinks cold for 24 hours or hot for 12 hours. BPA-free, 750ml capacity.",
    price: 599,
    category: "Home & Kitchen",
    stock: 100,
    imageUrl: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=500&q=80",
  },
  {
    name: "Mechanical Keyboard",
    description: "RGB backlit mechanical keyboard with blue switches, anti-ghosting, and programmable keys. Ideal for gaming and productivity.",
    price: 2199,
    category: "Electronics",
    stock: 30,
    imageUrl: "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=500&q=80",
  },
  {
    name: "Sunglasses Classic",
    description: "Polarized UV400 protection sunglasses with lightweight metal frame. Stylish design suitable for all face types.",
    price: 799,
    category: "Accessories",
    stock: 60,
    imageUrl: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500&q=80",
  },
  {
    name: "Desk Lamp LED",
    description: "Adjustable LED desk lamp with 5 brightness levels and 3 color temperatures. USB charging port included. Eye-care technology.",
    price: 999,
    category: "Home & Kitchen",
    stock: 35,
    imageUrl: "https://images.unsplash.com/photo-1507473885765-e6ed057ab6fe?w=500&q=80",
  },
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB Connected for seeding...");

    await Product.deleteMany({});
    console.log("Cleared existing products.");

    await Product.insertMany(sampleProducts);
    console.log(`Seeded ${sampleProducts.length} sample products.`);

    await mongoose.connection.close();
    console.log("Database connection closed. Seeding complete!");
    process.exit(0);
  } catch (error) {
    console.error(`Seeding Error: ${error.message}`);
    process.exit(1);
  }
};

seedDB();
