import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { useCart } from "../contexts/CartContext";

const API_URL = import.meta.env.VITE_API_URL || "/api";

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const res = await axios.get(`${API_URL}/products/${id}`);
      setProduct(res.data.data);
    } catch (err) {
      setError("Failed to load product.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    try {
      await axios.delete(`${API_URL}/products/${id}`);
      navigate("/");
    } catch (err) {
      setError("Failed to delete product.");
    }
  };

  const handleAddToCart = () => {
    addToCart(product);
    alert("Added to cart!");
  };

  if (loading) return <div className="loading">Loading product...</div>;
  if (error) return <div className="error-message">{error}</div>;
  if (!product) return <div className="error-message">Product not found.</div>;

  return (
    <div>
      <Link to="/" className="back-link">← Back to Products</Link>

      <div className="product-detail">
        <div className="detail-img-wrapper">
          <img src={product.imageUrl} alt={product.name} className="detail-img" />
        </div>
        <div className="detail-info">
          <span className="detail-category">{product.category}</span>
          <h1>{product.name}</h1>
          <p className="detail-price">₹{product.price.toLocaleString()}</p>
          <p className="detail-stock">
            {product.stock > 0
              ? `✅ ${product.stock} in stock`
              : "❌ Out of stock"}
          </p>
          <p className="detail-desc">{product.description}</p>

          <div className="detail-actions">
            <button
              className="btn btn-success"
              onClick={handleAddToCart}
              disabled={product.stock === 0}
            >
              {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
            </button>
            <Link to={`/edit-product/${product._id}`} className="btn btn-primary">
              Edit
            </Link>
            <button onClick={handleDelete} className="btn btn-danger">
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
