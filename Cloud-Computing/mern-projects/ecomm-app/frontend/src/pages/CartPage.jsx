import { Link } from "react-router-dom";
import { useCart } from "../contexts/CartContext";

function CartPage() {
  const { cartItems, removeFromCart, updateQuantity, getTotal } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="empty-message">
        <h2>Your cart is empty</h2>
        <p>Browse products and add items to your cart.</p>
        <Link to="/" className="btn btn-primary" style={{ marginTop: "16px" }}>
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div className="page-header">
        <h1>Shopping Cart</h1>
        <span className="record-count">{cartItems.length} items</span>
      </div>

      <div className="cart-layout">
        <div className="cart-items">
          {cartItems.map((item) => (
            <div key={item._id} className="cart-item">
              <img src={item.imageUrl} alt={item.name} className="cart-item-img" />
              <div className="cart-item-info">
                <Link to={`/product/${item._id}`} className="cart-item-name">
                  {item.name}
                </Link>
                <p className="cart-item-price">₹{item.price.toLocaleString()}</p>
              </div>
              <div className="cart-item-qty">
                <button
                  className="qty-btn"
                  onClick={() => updateQuantity(item._id, item.quantity - 1)}
                >
                  −
                </button>
                <span className="qty-value">{item.quantity}</span>
                <button
                  className="qty-btn"
                  onClick={() => updateQuantity(item._id, item.quantity + 1)}
                >
                  +
                </button>
              </div>
              <p className="cart-item-total">
                ₹{(item.price * item.quantity).toLocaleString()}
              </p>
              <button
                className="cart-item-remove"
                onClick={() => removeFromCart(item._id)}
              >
                ✕
              </button>
            </div>
          ))}
        </div>

        <div className="cart-summary">
          <h3>Order Summary</h3>
          <div className="summary-row">
            <span>Items ({cartItems.length})</span>
            <span>₹{getTotal().toLocaleString()}</span>
          </div>
          <div className="summary-row summary-total">
            <span>Total</span>
            <span>₹{getTotal().toLocaleString()}</span>
          </div>
          <Link to="/checkout" className="btn btn-success btn-block">
            Proceed to Checkout
          </Link>
          <Link to="/" className="btn btn-secondary btn-block" style={{ marginTop: "8px" }}>
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}

export default CartPage;
