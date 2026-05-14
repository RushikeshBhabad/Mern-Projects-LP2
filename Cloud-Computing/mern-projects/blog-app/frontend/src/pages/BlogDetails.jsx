import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "/api";

function BlogDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchBlog();
  }, [id]);

  const fetchBlog = async () => {
    try {
      const res = await axios.get(`${API_URL}/blogs/${id}`);
      setBlog(res.data.data);
      setError(null);
    } catch (err) {
      setError("Failed to load blog.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this blog?")) return;

    try {
      await axios.delete(`${API_URL}/blogs/${id}`);
      navigate("/");
    } catch (err) {
      setError("Failed to delete blog.");
    }
  };

  if (loading) return <div className="loading">Loading blog...</div>;

  if (error) return <div className="error-message">{error}</div>;

  if (!blog) return <div className="error-message">Blog not found.</div>;

  const formattedDate = new Date(blog.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div>
      <Link to="/" className="back-link">
        ← Back to Home
      </Link>

      <div className="blog-detail">
        <span className="detail-category">{blog.category}</span>
        <h1>{blog.title}</h1>
        <div className="detail-meta">
          <span>By <strong>{blog.author}</strong></span>
          <span>{formattedDate}</span>
        </div>
        <div className="detail-content">{blog.content}</div>

        <div className="detail-actions">
          <Link to={`/edit/${blog._id}`} className="btn btn-primary">
            Edit
          </Link>
          <button onClick={handleDelete} className="btn btn-danger">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default BlogDetails;
