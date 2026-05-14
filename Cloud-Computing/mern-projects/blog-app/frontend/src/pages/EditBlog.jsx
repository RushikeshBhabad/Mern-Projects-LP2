import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "/api";

function EditBlog() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    author: "",
    category: "General",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  const categories = [
    "General",
    "Technology",
    "Travel",
    "Food",
    "Lifestyle",
    "Education",
    "Health",
    "Sports",
  ];

  useEffect(() => {
    fetchBlog();
  }, [id]);

  const fetchBlog = async () => {
    try {
      const res = await axios.get(`${API_URL}/blogs/${id}`);
      const blog = res.data.data;
      setFormData({
        title: blog.title,
        content: blog.content,
        author: blog.author,
        category: blog.category,
      });
      setError(null);
    } catch (err) {
      setError("Failed to load blog.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    try {
      await axios.put(`${API_URL}/blogs/${id}`, formData);
      navigate(`/blog/${id}`);
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to update blog. Try again."
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="loading">Loading blog...</div>;

  return (
    <div>
      <Link to={`/blog/${id}`} className="back-link">
        ← Back to Blog
      </Link>
      <div className="form-container">
        <h1>Edit Blog</h1>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter blog title"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="author">Author</label>
            <input
              type="text"
              id="author"
              name="author"
              value={formData.author}
              onChange={handleChange}
              placeholder="Enter author name"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="category">Category</label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="content">Content</label>
            <textarea
              id="content"
              name="content"
              value={formData.content}
              onChange={handleChange}
              placeholder="Write your blog content here..."
              required
            />
          </div>

          <button type="submit" className="btn btn-primary" disabled={saving}>
            {saving ? "Saving..." : "Update Blog"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditBlog;
