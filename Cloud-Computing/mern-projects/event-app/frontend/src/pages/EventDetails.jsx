import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "/api";

function EventDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchEvent();
  }, [id]);

  const fetchEvent = async () => {
    try {
      const res = await axios.get(`${API_URL}/events/${id}`);
      setEvent(res.data.data);
      setError(null);
    } catch (err) {
      setError("Failed to load event details.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this event? All registrations will also be effectively orphaned.")) return;

    try {
      await axios.delete(`${API_URL}/events/${id}`);
      navigate("/");
    } catch (err) {
      setError("Failed to delete event.");
    }
  };

  if (loading) return <div className="loading">Loading details...</div>;
  if (error) return <div className="error-message">{error}</div>;
  if (!event) return <div className="error-message">Event not found.</div>;

  const formattedDate = new Date(event.date).toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div>
      <Link to="/" className="back-link">
        ← Back to Events
      </Link>

      <div className="detail-container">
        <img 
          src={event.imageUrl} 
          alt={event.name} 
          className="detail-img"
          onError={(e) => {
            e.target.src = "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&q=80";
          }}
        />
        
        <div className="detail-content">
          <h1 className="detail-title">{event.name}</h1>

          <div className="detail-info-grid">
            <div className="info-item">
              <span className="info-label">Date</span>
              <span className="info-value">{formattedDate}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Venue</span>
              <span className="info-value">{event.venue}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Organizer</span>
              <span className="info-value">{event.organizer}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Registration Fee</span>
              <span className="info-value" style={{ color: "#059669" }}>
                {event.fee === 0 ? "Free" : `$${event.fee.toFixed(2)}`}
              </span>
            </div>
          </div>

          <div className="detail-desc">
            {event.description}
          </div>

          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", marginTop: "2rem" }}>
            <Link to={`/register/${event._id}`} className="btn btn-success" style={{ flex: 1, padding: "1rem" }}>
              Register for this Event
            </Link>
            <Link to={`/edit-event/${event._id}`} className="btn btn-secondary">
              Edit Event
            </Link>
            <button onClick={handleDelete} className="btn btn-danger">
              Delete Event
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EventDetails;
