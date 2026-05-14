import { Link } from "react-router-dom";

function EventCard({ event }) {
  const formattedDate = new Date(event.date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="event-card">
      <img 
        src={event.imageUrl} 
        alt={event.name} 
        className="event-img"
        onError={(e) => {
          e.target.src = "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80"; // Fallback image
        }}
      />
      <div className="event-content">
        <h3 className="event-title">{event.name}</h3>
        
        <div className="event-meta">
          <span>📅 {formattedDate}</span>
          <span>📍 {event.venue}</span>
          <span>👥 By: {event.organizer}</span>
        </div>

        <div className="event-fee">
          {event.fee === 0 ? "Free" : `$${event.fee.toFixed(2)}`}
        </div>

        <div className="event-actions">
          <Link to={`/event/${event._id}`} className="btn btn-primary btn-block">
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}

export default EventCard;
