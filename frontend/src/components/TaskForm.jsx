import { useState, useEffect, useContext } from "react";
import api from "../api/api";
import { AuthContext } from "../context/AuthContext";

const TaskForm = ({ task, onSubmit, onCancel }) => {
  const { user } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    dueDate: "",
    priority: "low",
    assignedTo: "",
  });
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (user?.role === "admin") {
      fetchUsers();
    }
  }, [user]);

  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title,
        description: task.description,
        dueDate: task.dueDate.split("T")[0],
        priority: task.priority,
        assignedTo: task.assignedTo?._id || "",
      });
    }
  }, [task]);

  const fetchUsers = async () => {
    try {
      const response = await api.get("/users");
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <h2>{task ? "Edit Task" : "Create New Task"}</h2>

      <div style={styles.formGroup}>
        <label style={styles.label}>Title *</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          style={styles.input}
        />
      </div>

      <div style={styles.formGroup}>
        <label style={styles.label}>Description *</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
          rows="4"
          style={styles.textarea}
        />
      </div>

      <div style={styles.formGroup}>
        <label style={styles.label}>Due Date *</label>
        <input
          type="date"
          name="dueDate"
          value={formData.dueDate}
          onChange={handleChange}
          required
          style={styles.input}
        />
      </div>

      <div style={styles.formGroup}>
        <label style={styles.label}>Priority *</label>
        <select
          name="priority"
          value={formData.priority}
          onChange={handleChange}
          style={styles.select}
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>

      {user?.role === "admin" && (
        <div style={styles.formGroup}>
          <label style={styles.label}>Assign To</label>
          <select
            name="assignedTo"
            value={formData.assignedTo}
            onChange={handleChange}
            style={styles.select}
          >
            <option value="">Select User</option>
            {users.map((u) => (
              <option key={u._id} value={u._id}>
                {u.name} ({u.email})
              </option>
            ))}
          </select>
        </div>
      )}

      <div style={styles.buttons}>
        <button type="submit" style={styles.submitBtn}>
          {task ? "Update Task" : "Create Task"}
        </button>
        <button type="button" onClick={onCancel} style={styles.cancelBtn}>
          Cancel
        </button>
      </div>
    </form>
  );
};

const styles = {
  form: {
    backgroundColor: "white",
    padding: "2rem",
    borderRadius: "8px",
    border: "1px solid #ddd",
    maxWidth: "600px",
    margin: "2rem auto",
  },
  formGroup: {
    marginBottom: "1.5rem",
  },
  label: {
    display: "block",
    marginBottom: "0.5rem",
    fontWeight: "bold",
    color: "#2c3e50",
  },
  input: {
    width: "100%",
    padding: "0.75rem",
    border: "1px solid #ddd",
    borderRadius: "4px",
    fontSize: "1rem",
    boxSizing: "border-box",
  },
  textarea: {
    width: "100%",
    padding: "0.75rem",
    border: "1px solid #ddd",
    borderRadius: "4px",
    fontSize: "1rem",
    fontFamily: "inherit",
    boxSizing: "border-box",
  },
  select: {
    width: "100%",
    padding: "0.75rem",
    border: "1px solid #ddd",
    borderRadius: "4px",
    fontSize: "1rem",
    boxSizing: "border-box",
  },
  buttons: {
    display: "flex",
    gap: "1rem",
  },
  submitBtn: {
    flex: 1,
    backgroundColor: "#27ae60",
    color: "white",
    border: "none",
    padding: "0.75rem",
    borderRadius: "4px",
    fontSize: "1rem",
    cursor: "pointer",
    fontWeight: "bold",
  },
  cancelBtn: {
    flex: 1,
    backgroundColor: "#95a5a6",
    color: "white",
    border: "none",
    padding: "0.75rem",
    borderRadius: "4px",
    fontSize: "1rem",
    cursor: "pointer",
    fontWeight: "bold",
  },
};

export default TaskForm;
