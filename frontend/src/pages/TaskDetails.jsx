import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/api";
import Navbar from "../components/Navbar";
import TaskForm from "../components/TaskForm";

const TaskDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTask();
  }, [id]);

  const fetchTask = async () => {
    try {
      const response = await api.get(`/tasks/${id}`);
      setTask(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching task:", error);
      alert("Task not found or unauthorized");
      navigate("/dashboard");
    }
  };

  const handleUpdateTask = async (formData) => {
    try {
      await api.put(`/tasks/${id}`, formData);
      setIsEditing(false);
      fetchTask();
    } catch (error) {
      console.error("Error updating task:", error);
      alert("Failed to update task");
    }
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div style={styles.container}>
          <p>Loading...</p>
        </div>
      </>
    );
  }

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
    <>
      <Navbar />
      <div style={styles.container}>
        <button onClick={() => navigate("/dashboard")} style={styles.backBtn}>
          ← Back to Dashboard
        </button>

        {isEditing ? (
          <TaskForm
            task={task}
            onSubmit={handleUpdateTask}
            onCancel={() => setIsEditing(false)}
          />
        ) : (
          <div
            style={{
              ...styles.card,
              backgroundColor: priorityColors[task.priority],
            }}
          >
            <div style={styles.header}>
              <h1 style={styles.title}>{task.title}</h1>
              <button onClick={() => setIsEditing(true)} style={styles.editBtn}>
                Edit Task
              </button>
            </div>

            <div style={styles.section}>
              <h3>Description</h3>
              <p style={styles.description}>{task.description}</p>
            </div>

            <div style={styles.detailsGrid}>
              <div style={styles.detailItem}>
                <strong>Due Date:</strong>
                <p>{new Date(task.dueDate).toLocaleDateString()}</p>
              </div>

              <div style={styles.detailItem}>
                <strong>Status:</strong>
                <span
                  style={{
                    ...styles.badge,
                    backgroundColor: statusColors[task.status],
                  }}
                >
                  {task.status}
                </span>
              </div>

              <div style={styles.detailItem}>
                <strong>Priority:</strong>
                <span style={styles.badge}>{task.priority}</span>
              </div>

              <div style={styles.detailItem}>
                <strong>Assigned To:</strong>
                <p>
                  {task.assignedTo?.name} ({task.assignedTo?.email})
                </p>
              </div>

              <div style={styles.detailItem}>
                <strong>Created By:</strong>
                <p>
                  {task.createdBy?.name} ({task.createdBy?.email})
                </p>
              </div>

              <div style={styles.detailItem}>
                <strong>Created At:</strong>
                <p>{new Date(task.createdAt).toLocaleString()}</p>
              </div>

              <div style={styles.detailItem}>
                <strong>Last Updated:</strong>
                <p>{new Date(task.updatedAt).toLocaleString()}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

const styles = {
  container: {
    maxWidth: "900px",
    margin: "0 auto",
    padding: "2rem 1rem",
  },
  backBtn: {
    backgroundColor: "#95a5a6",
    color: "white",
    border: "none",
    padding: "0.75rem 1.5rem",
    borderRadius: "4px",
    cursor: "pointer",
    marginBottom: "2rem",
    fontWeight: "bold",
  },
  card: {
    border: "1px solid #ddd",
    borderRadius: "8px",
    padding: "2rem",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "2rem",
    flexWrap: "wrap",
    gap: "1rem",
  },
  title: {
    margin: 0,
    color: "#2c3e50",
  },
  editBtn: {
    backgroundColor: "#3498db",
    color: "white",
    border: "none",
    padding: "0.75rem 1.5rem",
    borderRadius: "4px",
    cursor: "pointer",
    fontWeight: "bold",
  },
  section: {
    marginBottom: "2rem",
  },
  description: {
    fontSize: "1.1rem",
    lineHeight: "1.6",
    color: "#555",
  },
  detailsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "1.5rem",
  },
  detailItem: {
    padding: "1rem",
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    borderRadius: "4px",
  },
  badge: {
    display: "inline-block",
    padding: "0.5rem 1rem",
    borderRadius: "12px",
    fontSize: "0.9rem",
    color: "white",
    fontWeight: "bold",
    marginTop: "0.5rem",
  },
};

export default TaskDetails;
