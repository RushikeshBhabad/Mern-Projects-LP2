import { Link } from "react-router-dom";

function TaskCard({ task, onStatusChange }) {
  const formattedDate = new Date(task.dueDate).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <div className={`task-card priority-${task.priority} status-${task.status}`}>
      <div className="card-header">
        <h3 className="card-title">{task.title}</h3>
        <span className={`status-badge ${task.status}`}>
          {task.status}
        </span>
      </div>
      <p className="card-desc">{task.description}</p>
      
      <div className="card-meta">
        <span>Due: {formattedDate}</span>
        <span>Priority: <strong>{task.priority}</strong></span>
      </div>

      <div className="card-actions">
        <Link to={`/task/${task._id}`} className="btn btn-sm btn-primary">
          View
        </Link>
        <Link to={`/edit/${task._id}`} className="btn btn-sm btn-secondary">
          Edit
        </Link>
        {task.status === "Pending" ? (
          <button 
            className="btn btn-sm btn-success"
            onClick={() => onStatusChange(task._id, "Completed")}
          >
            Mark Done
          </button>
        ) : (
          <button 
            className="btn btn-sm btn-secondary"
            onClick={() => onStatusChange(task._id, "Pending")}
          >
            Mark Pending
          </button>
        )}
      </div>
    </div>
  );
}

export default TaskCard;
