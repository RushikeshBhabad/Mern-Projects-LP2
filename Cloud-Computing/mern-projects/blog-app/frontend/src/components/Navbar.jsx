import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/" className="logo">
        📝 Blog App
      </Link>
      <Link to="/create" className="nav-link">
        + New Blog
      </Link>
    </nav>
  );
}

export default Navbar;
