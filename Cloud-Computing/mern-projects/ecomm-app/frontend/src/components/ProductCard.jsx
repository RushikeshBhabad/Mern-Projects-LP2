import { Link } from "react-router-dom";
import { useCart } from "../contexts/CartContext";

function ProductCard({ product }) {
  const { addToCart } = useCart();

  const handleAddToCart = (e) => {
    e.preventDefault();
    addToCart(product);
  };

  return (
    <div className="product-card">
      <Link to={`/product/${product._id}`}>
        <div className="card-img-wrapper">
          <img src={product.imageUrl} alt={product.name} className="card-img" />
        </div>
      </Link>
      <div className="card-body">
        <span className="card-category">{product.category}</span>
        <Link to={`/product/${product._id}`}>
          <h3 className="card-title">{product.name}</h3>
        </Link>
        <div className="card-footer">
          <span className="card-price">₹{product.price.toLocaleString()}</span>
          <button
            className="btn-add-cart"
            onClick={handleAddToCart}
            disabled={product.stock === 0}
          >
            {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
          </button>
        </div>
        <span className="card-stock">
          {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
        </span>
      </div>
    </div>
  );
}

export default ProductCard;
