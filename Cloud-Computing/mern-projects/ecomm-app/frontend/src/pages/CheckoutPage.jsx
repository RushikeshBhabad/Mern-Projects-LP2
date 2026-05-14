import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { useCart } from "../contexts/CartContext";

const API_URL = import.meta.env.VITE_API_URL || "/api";

function CheckoutPage() {
  const navigate = useNavigate();
  const { cartItems, getTotal, clearCart } = useCart();
  const [formData, setFormData] = useState({
    customerName: "",
    customerAddress: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  if (cartItems.length === 0) {
    return (
      <div className="empty-message">
        <h2>Nothing to checkout</h2>
        <p>Add items to your cart first.</p>
        <Link to="/" className="btn btn-primary" style={{ marginTop: "16px" }}>
          Browse Products
        </Link>
      </div>
    );
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const orderData = {
        products: cartItems.map((item) => ({
          productId: item._id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
        })),
        totalAmount: getTotal(),
        customerName: formData.customerName,
        customerAddress: formData.customerAddress,
      };

      const res = await axios.post(`${API_URL}/orders`, orderData);
      clearCart();
      navigate(`/order-success/${res.data.data._id}`);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to place order.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Link to="/cart" className="back-link">← Back to Cart</Link>

      <div className="checkout-layout">
        <div className="form-container">
          <h1>Checkout</h1>
          {error && <div className="error-message">{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="customerName">Full Name</label>
              <input
                type="text"
                id="customerName"
                name="customerName"
                value={formData.customerName}
                onChange={handleChange}
                placeholder="Enter your full name"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="customerAddress">Delivery Address</label>
              <input
                type="text"
                id="customerAddress"
                name="customerAddress"
                value={formData.customerAddress}
                onChange={handleChange}
                placeholder="Enter delivery address"
                required
              />
            </div>

            <div className="checkout-items">
              <h3>Order Items</h3>
              {cartItems.map((item) => (
                <div key={item._id} className="checkout-item">
                  <span>{item.name} × {item.quantity}</span>
                  <span>₹{(item.price * item.quantity).toLocaleString()}</span>
                </div>
              ))}
              <div className="checkout-item checkout-total">
                <strong>Total</strong>
                <strong>₹{getTotal().toLocaleString()}</strong>
              </div>
            </div>

            <button type="submit" className="btn btn-success btn-block" disabled={loading}>
              {loading ? "Placing Order..." : "Place Order"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CheckoutPage;
