import { Link } from "react-router-dom";

const TaskCard = ({ task, onDelete, onStatusChange, onPriorityChange }) => {
  const priorityColors = {
    low: "#d4edda",
    medium: "#fff3cd",
    high: "#f8d7da",
  };

  const statusColors = {
    pending: "#ffc107",
    completed: "#28a745",
  };

  return (
    <div
      style={{ ...styles.card, backgroundColor: priorityColors[task.priority] }}
    >
      <h3 style={styles.title}>{task.title}</h3>
      <p style={styles.description}>{task.description.substring(0, 80)}...</p>

      <div style={styles.info}>
        <p>
          <strong>Due:</strong> {new Date(task.dueDate).toLocaleDateString()}
        </p>
        <p>
          <strong>Assigned to:</strong> {task.assignedTo?.name}
        </p>
      </div>

      <div style={styles.badges}>
        <span
          style={{
            ...styles.badge,
            backgroundColor: statusColors[task.status],
          }}
        >
          {task.status}
        </span>
        <span style={styles.badge}>{task.priority}</span>
      </div>

      <div style={styles.actions}>
        <Link to={`/tasks/${task._id}`} style={styles.viewBtn}>
          View Details
        </Link>

        <select
          value={task.status}
          onChange={(e) => onStatusChange(task._id, e.target.value)}
          style={styles.select}
        >
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
        </select>

        <select
          value={task.priority}
          onChange={(e) => onPriorityChange(task._id, e.target.value)}
          style={styles.select}
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>

        <button onClick={() => onDelete(task._id)} style={styles.deleteBtn}>
          Delete
        </button>
      </div>
    </div>
  );
};

const styles = {
  card: {
    border: "1px solid #ddd",
    borderRadius: "8px",
    padding: "1.5rem",
    marginBottom: "1rem",
  },
  title: {
    margin: "0 0 0.5rem 0",
    color: "#2c3e50",
  },
  description: {
    color: "#555",
    marginBottom: "1rem",
  },
  info: {
    marginBottom: "1rem",
    fontSize: "0.9rem",
  },
  badges: {
    display: "flex",
    gap: "0.5rem",
    marginBottom: "1rem",
  },
  badge: {
    padding: "0.25rem 0.75rem",
    borderRadius: "12px",
    fontSize: "0.85rem",
    color: "white",
    fontWeight: "bold",
  },
  actions: {
    display: "flex",
    gap: "0.5rem",
    flexWrap: "wrap",
  },
  viewBtn: {
    backgroundColor: "#3498db",
    color: "white",
    padding: "0.5rem 1rem",
    borderRadius: "4px",
    textDecoration: "none",
    fontSize: "0.9rem",
  },
  select: {
    padding: "0.5rem",
    borderRadius: "4px",
    border: "1px solid #ddd",
    fontSize: "0.9rem",
  },
  deleteBtn: {
    backgroundColor: "#e74c3c",
    color: "white",
    border: "none",
    padding: "0.5rem 1rem",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "0.9rem",
  },
};

export default TaskCard;
