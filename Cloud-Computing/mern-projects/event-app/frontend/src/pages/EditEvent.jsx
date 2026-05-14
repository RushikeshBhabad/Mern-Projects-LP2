import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "/api";

function EditEvent() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    date: "",
    venue: "",
    organizer: "",
    fee: 0,
    imageUrl: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchEvent();
  }, [id]);

  const fetchEvent = async () => {
    try {
      const res = await axios.get(`${API_URL}/events/${id}`);
      const event = res.data.data;
      
      // Format date for datetime-local input (YYYY-MM-DDThh:mm)
      const dateObj = new Date(event.date);
      // Adjust for local timezone to display correctly in the input
      const tzOffset = dateObj.getTimezoneOffset() * 60000;
      const localISOTime = (new Date(dateObj - tzOffset)).toISOString().slice(0, 16);

      setFormData({
        name: event.name,
        description: event.description,
        date: localISOTime,
        venue: event.venue,
        organizer: event.organizer,
        fee: event.fee,
        imageUrl: event.imageUrl,
      });
      setError(null);
    } catch (err) {
      setError("Failed to load event data.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const value = e.target.name === "fee" ? Number(e.target.value) : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    try {
      // Need to convert the local datetime string back to UTC Date
      const payload = {
        ...formData,
        date: new Date(formData.date).toISOString()
      };
      await axios.put(`${API_URL}/events/${id}`, payload);
      navigate(`/event/${id}`);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update event.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="loading">Loading event...</div>;

  return (
    <div>
      <Link to={`/event/${id}`} className="back-link">
        ← Back to Event Details
      </Link>
      
      <div className="form-container" style={{ maxWidth: "800px" }}>
        <h1>Edit Event</h1>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Event Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
            <div className="form-group">
              <label htmlFor="date">Date & Time</label>
              <input
                type="datetime-local"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="venue">Venue</label>
              <input
                type="text"
                id="venue"
                name="venue"
                value={formData.venue}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
            <div className="form-group">
              <label htmlFor="organizer">Organizer Name</label>
              <input
                type="text"
                id="organizer"
                name="organizer"
                value={formData.organizer}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="fee">Registration Fee ($)</label>
              <input
                type="number"
                id="fee"
                name="fee"
                min="0"
                step="0.01"
                value={formData.fee}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="imageUrl">Cover Image URL</label>
            <input
              type="url"
              id="imageUrl"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Event Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary btn-block" disabled={saving}>
            {saving ? "Saving Changes..." : "Update Event"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditEvent;
