import { useState, useEffect } from "react";
import api from "../api/api";
import Navbar from "../components/Navbar";
import TaskCard from "../components/TaskCard";
import TaskForm from "../components/TaskForm";
import ConfirmDialog from "../components/ConfirmDialog";
import Pagination from "../components/Pagination";

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [deleteId, setDeleteId] = useState(null);
  const [view, setView] = useState("all");

  useEffect(() => {
    fetchTasks();
  }, [currentPage]);

  const fetchTasks = async () => {
    try {
      const response = await api.get(`/tasks?page=${currentPage}&limit=6`);
      setTasks(response.data.tasks);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const handleCreateTask = async (formData) => {
    try {
      await api.post("/tasks", formData);
      setShowForm(false);
      fetchTasks();
    } catch (error) {
      console.error("Error creating task:", error);
      alert("Failed to create task");
    }
  };

  const handleDeleteTask = async () => {
    try {
      await api.delete(`/tasks/${deleteId}`);
      setDeleteId(null);
      fetchTasks();
    } catch (error) {
      console.error("Error deleting task:", error);
      alert("Failed to delete task");
    }
  };

  const handleStatusChange = async (id, status) => {
    try {
      await api.put(`/tasks/${id}`, { status });
      fetchTasks();
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const handlePriorityChange = async (id, priority) => {
    try {
      await api.put(`/tasks/${id}`, { priority });
      fetchTasks();
    } catch (error) {
      console.error("Error updating priority:", error);
    }
  };

  const filterTasks = (priority) => {
    return tasks.filter((task) => task.priority === priority);
  };

  const priorityColors = {
    low: "#d4edda",
    medium: "#fff3cd",
    high: "#f8d7da",
  };

  return (
    <>
      <Navbar />
      <div style={styles.container}>
        <div style={styles.header}>
          <h1>Task Dashboard</h1>
          <div style={styles.controls}>
            <button
              onClick={() => setView("all")}
              style={view === "all" ? styles.activeBtn : styles.viewBtn}
            >
              All Tasks
            </button>
            <button
              onClick={() => setView("priority")}
              style={view === "priority" ? styles.activeBtn : styles.viewBtn}
            >
              Priority View
            </button>
            <button onClick={() => setShowForm(true)} style={styles.createBtn}>
              Create New Task
            </button>
          </div>
        </div>

        {showForm && (
          <TaskForm
            onSubmit={handleCreateTask}
            onCancel={() => setShowForm(false)}
          />
        )}

        {view === "all" ? (
          <>
            <div style={styles.taskList}>
              {tasks.map((task) => (
                <TaskCard
                  key={task._id}
                  task={task}
                  onDelete={(id) => setDeleteId(id)}
                  onStatusChange={handleStatusChange}
                  onPriorityChange={handlePriorityChange}
                />
              ))}
            </div>

            {tasks.length === 0 && (
              <p style={styles.noTasks}>
                No tasks found. Create your first task!
              </p>
            )}

            {totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            )}
          </>
        ) : (
          <div style={styles.priorityView}>
            {["low", "medium", "high"].map((priority) => (
              <div
                key={priority}
                style={{
                  ...styles.priorityColumn,
                  backgroundColor: priorityColors[priority],
                }}
              >
                <h2 style={styles.priorityTitle}>
                  {priority.toUpperCase()} Priority
                </h2>
                {filterTasks(priority).map((task) => (
                  <TaskCard
                    key={task._id}
                    task={task}
                    onDelete={(id) => setDeleteId(id)}
                    onStatusChange={handleStatusChange}
                    onPriorityChange={handlePriorityChange}
                  />
                ))}
                {filterTasks(priority).length === 0 && (
                  <p style={styles.emptyColumn}>No {priority} priority tasks</p>
                )}
              </div>
            ))}
          </div>
        )}

        {deleteId && (
          <ConfirmDialog
            message="Are you sure you want to delete this task? This action cannot be undone."
            onConfirm={handleDeleteTask}
            onCancel={() => setDeleteId(null)}
          />
        )}
      </div>
    </>
  );
};

const styles = {
  container: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "0 1rem",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "2rem",
    flexWrap: "wrap",
    gap: "1rem",
  },
  controls: {
    display: "flex",
    gap: "0.5rem",
  },
  viewBtn: {
    backgroundColor: "#95a5a6",
    color: "white",
    border: "none",
    padding: "0.75rem 1.5rem",
    borderRadius: "4px",
    cursor: "pointer",
    fontWeight: "bold",
  },
  activeBtn: {
    backgroundColor: "#2c3e50",
    color: "white",
    border: "none",
    padding: "0.75rem 1.5rem",
    borderRadius: "4px",
    cursor: "pointer",
    fontWeight: "bold",
  },
  createBtn: {
    backgroundColor: "#27ae60",
    color: "white",
    border: "none",
    padding: "0.75rem 1.5rem",
    borderRadius: "4px",
    cursor: "pointer",
    fontWeight: "bold",
  },
  taskList: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))",
    gap: "1rem",
    marginBottom: "2rem",
  },
  priorityView: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "1rem",
  },
  priorityColumn: {
    padding: "1.5rem",
    borderRadius: "8px",
    minHeight: "400px",
  },
  priorityTitle: {
    textAlign: "center",
    marginBottom: "1rem",
    color: "#2c3e50",
  },
  emptyColumn: {
    textAlign: "center",
    color: "#555",
    marginTop: "2rem",
  },
  noTasks: {
    textAlign: "center",
    color: "#555",
    fontSize: "1.2rem",
    marginTop: "3rem",
  },
};

export default Dashboard;
