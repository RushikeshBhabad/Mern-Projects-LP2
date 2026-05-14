import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "/api";

function RegistrationForm() {
  const { id } = useParams(); // event ID
  const navigate = useNavigate();
  
  const [event, setEvent] = useState(null);
  const [formData, setFormData] = useState({
    participantName: "",
    email: "",
    phoneNumber: "",
    eventId: id,
  });
  
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    fetchEvent();
  }, [id]);

  const fetchEvent = async () => {
    try {
      const res = await axios.get(`${API_URL}/events/${id}`);
      setEvent(res.data.data);
      setError(null);
    } catch (err) {
      setError("Failed to load event details. Cannot register.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      await axios.post(`${API_URL}/registrations`, formData);
      setSuccess(true);
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed. Try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div className="loading">Loading registration form...</div>;
  if (!event && error) return <div className="error-message">{error}</div>;

  if (success) {
    return (
      <div className="form-container" style={{ textAlign: "center" }}>
        <h1 style={{ color: "#059669" }}>Registration Successful! 🎉</h1>
        <p style={{ fontSize: "1.125rem", margin: "1rem 0 2rem" }}>
          You have successfully registered for <strong>{event.name}</strong>.
        </p>
        <Link to="/" className="btn btn-primary">
          Back to Events
        </Link>
      </div>
    );
  }

  return (
    <div>
      <Link to={`/event/${id}`} className="back-link">
        ← Back to Event Details
      </Link>
      
      <div className="form-container">
        <h1>Register for Event</h1>
        <p style={{ color: "#6b7280", marginBottom: "2rem" }}>
          You are registering for: <strong>{event.name}</strong>
        </p>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="participantName">Full Name</label>
            <input
              type="text"
              id="participantName"
              name="participantName"
              value={formData.participantName}
              onChange={handleChange}
              placeholder="John Doe"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="john@example.com"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="phoneNumber">Phone Number</label>
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              placeholder="+1 (555) 000-0000"
              required
            />
          </div>

          <div className="form-group" style={{ marginBottom: "2rem" }}>
            <label>Registration Fee</label>
            <div style={{ padding: "1rem", backgroundColor: "#f3f4f6", borderRadius: "0.375rem", fontWeight: "bold" }}>
              {event.fee === 0 ? "Free" : `Total: $${event.fee.toFixed(2)}`}
            </div>
          </div>

          <button type="submit" className="btn btn-success btn-block" disabled={submitting}>
            {submitting ? "Processing..." : "Confirm Registration"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default RegistrationForm;
