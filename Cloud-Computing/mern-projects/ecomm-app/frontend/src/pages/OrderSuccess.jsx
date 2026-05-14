import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "/api";

function OrderSuccess() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrder();
  }, [id]);

  const fetchOrder = async () => {
    try {
      const res = await axios.get(`${API_URL}/orders/${id}`);
      setOrder(res.data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="loading">Loading order...</div>;

  return (
    <div className="order-success">
      <div className="success-icon">✅</div>
      <h1>Order Placed Successfully!</h1>
      <p className="success-msg">Thank you for your purchase.</p>

      {order && (
        <div className="order-details-box">
          <h3>Order Details</h3>
          <p><strong>Order ID:</strong> {order._id}</p>
          <p><strong>Customer:</strong> {order.customerName}</p>
          <p><strong>Address:</strong> {order.customerAddress}</p>
          <p>
            <strong>Date:</strong>{" "}
            {new Date(order.orderDate).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>

          <div className="order-items-list">
            {order.products.map((item, index) => (
              <div key={index} className="checkout-item">
                <span>{item.name} × {item.quantity}</span>
                <span>₹{(item.price * item.quantity).toLocaleString()}</span>
              </div>
            ))}
            <div className="checkout-item checkout-total">
              <strong>Total Paid</strong>
              <strong>₹{order.totalAmount.toLocaleString()}</strong>
            </div>
          </div>
        </div>
      )}

      <Link to="/" className="btn btn-primary" style={{ marginTop: "20px" }}>
        Continue Shopping
      </Link>
    </div>
  );
}

export default OrderSuccess;
