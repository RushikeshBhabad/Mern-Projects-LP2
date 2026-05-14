const Order = require("../models/Order");

// @desc    Place a new order
// @route   POST /api/orders
const placeOrder = async (req, res, next) => {
  try {
    const { products, totalAmount, customerName, customerAddress } = req.body;

    if (!products || products.length === 0) {
      return res.status(400).json({ success: false, message: "No products in order" });
    }

    const order = await Order.create({
      products,
      totalAmount,
      customerName,
      customerAddress,
    });

    res.status(201).json({ success: true, data: order });
  } catch (error) {
    next(error);
  }
};

// @desc    Get order by ID
// @route   GET /api/orders/:id
const getOrderById = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    res.status(200).json({ success: true, data: order });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  placeOrder,
  getOrderById,
};
