import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "/api";

function TaskDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTask();
  }, [id]);

  const fetchTask = async () => {
    try {
      const res = await axios.get(`${API_URL}/tasks/${id}`);
      setTask(res.data.data);
      setError(null);
    } catch (err) {
      setError("Failed to load task details.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this task?")) return;

    try {
      await axios.delete(`${API_URL}/tasks/${id}`);
      navigate("/");
    } catch (err) {
      setError("Failed to delete task.");
    }
  };

  const handleStatusToggle = async () => {
    const newStatus = task.status === "Pending" ? "Completed" : "Pending";
    try {
      await axios.put(`${API_URL}/tasks/${id}`, {
        ...task,
        status: newStatus,
      });
      setTask({ ...task, status: newStatus });
    } catch (err) {
      alert("Failed to update status");
    }
  };

  if (loading) return <div className="loading">Loading task details...</div>;
  if (error) return <div className="error-message">{error}</div>;
  if (!task) return <div className="error-message">Task not found.</div>;

  const formattedDueDate = new Date(task.dueDate).toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  
  const formattedCreatedDate = new Date(task.createdAt).toLocaleString("en-US");

  return (
    <div>
      <Link to="/" className="back-link">
        ← Back to Dashboard
      </Link>

      <div className="task-detail">
        <div className="detail-header">
          <h1>{task.title}</h1>
          <span className={`status-badge ${task.status}`}>
            {task.status}
          </span>
        </div>

        <div className="detail-meta">
          <div className="meta-item">
            <span className="meta-label">Priority</span>
            <span className="meta-value">
              <strong style={{ 
                color: task.priority === "High" ? "#e74c3c" : 
                       task.priority === "Medium" ? "#f39c12" : "#3498db" 
              }}>
                {task.priority}
              </strong>
            </span>
          </div>
          <div className="meta-item">
            <span className="meta-label">Due Date</span>
            <span className="meta-value">{formattedDueDate}</span>
          </div>
          <div className="meta-item">
            <span className="meta-label">Created</span>
            <span className="meta-value">{formattedCreatedDate}</span>
          </div>
        </div>

        <div className="detail-desc">
          <span className="meta-label" style={{ display: "block", marginBottom: "10px" }}>
            Description
          </span>
          {task.description}
        </div>

        <div className="detail-actions">
          <button 
            className={`btn ${task.status === 'Pending' ? 'btn-success' : 'btn-secondary'}`}
            onClick={handleStatusToggle}
          >
            Mark as {task.status === "Pending" ? "Completed" : "Pending"}
          </button>
          <Link to={`/edit/${task._id}`} className="btn btn-primary">
            Edit Task
          </Link>
          <button onClick={handleDelete} className="btn btn-danger">
            Delete Task
          </button>
        </div>
      </div>
    </div>
  );
}

export default TaskDetails;
