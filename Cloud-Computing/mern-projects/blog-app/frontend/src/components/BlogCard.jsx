import { Link } from "react-router-dom";

function BlogCard({ blog }) {
  // Truncate content to show as snippet
  const snippet =
    blog.content.length > 120
      ? blog.content.substring(0, 120) + "..."
      : blog.content;

  // Format the date
  const formattedDate = new Date(blog.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <div className="blog-card">
      <span className="card-category">{blog.category}</span>
      <h3 className="card-title">{blog.title}</h3>
      <p className="card-snippet">{snippet}</p>
      <div className="card-meta">
        <span className="author">By {blog.author}</span>
        <span>{formattedDate}</span>
      </div>
      <Link to={`/blog/${blog._id}`} className="read-more">
        Read More →
      </Link>
    </div>
  );
}

export default BlogCard;
