import { Link } from "react-router-dom";
import { useCart } from "../contexts/CartContext";

function Navbar() {
  const { getCartCount } = useCart();
  const count = getCartCount();

  return (
    <nav className="navbar">
      <Link to="/" className="logo">
        🛒 ShopEasy
      </Link>
      <div className="nav-links">
        <Link to="/add-product" className="nav-link nav-add">
          + Add Product
        </Link>
        <Link to="/cart" className="nav-link nav-cart">
          🛒 Cart {count > 0 && <span className="cart-badge">{count}</span>}
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
