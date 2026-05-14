import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/" className="logo">
        🎟️ EventHub
      </Link>
      <Link to="/add-event" className="nav-link">
        + Create Event
      </Link>
    </nav>
  );
}

export default Navbar;
