import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";
import Navbar from "../components/Navbar";
import ConfirmDialog from "../components/ConfirmDialog";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [deleteId, setDeleteId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await api.get("/users");
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
      if (error.response?.status === 403) {
        alert("Access denied. Admin only.");
        navigate("/dashboard");
      }
    }
  };

  const handleDeleteUser = async () => {
    try {
      await api.delete(`/users/${deleteId}`);
      setDeleteId(null);
      fetchUsers();
    } catch (error) {
      console.error("Error deleting user:", error);
      alert(error.response?.data?.message || "Failed to delete user");
    }
  };

  return (
    <>
      <Navbar />
      <div style={styles.container}>
        <div style={styles.header}>
          <h1>User Management</h1>
          <button onClick={() => navigate("/dashboard")} style={styles.backBtn}>
            Back to Dashboard
          </button>
        </div>

        <div style={styles.tableContainer}>
          <table style={styles.table}>
            <thead>
              <tr style={styles.headerRow}>
                <th style={styles.th}>Name</th>
                <th style={styles.th}>Email</th>
                <th style={styles.th}>Role</th>
                <th style={styles.th}>Joined</th>
                <th style={styles.th}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id} style={styles.row}>
                  <td style={styles.td}>{user.name}</td>
                  <td style={styles.td}>{user.email}</td>
                  <td style={styles.td}>
                    <span
                      style={{
                        ...styles.roleBadge,
                        backgroundColor:
                          user.role === "admin" ? "#e74c3c" : "#3498db",
                      }}
                    >
                      {user.role}
                    </span>
                  </td>
                  <td style={styles.td}>
                    {new Date(user.createdAt).toLocaleDateString()}
                  </td>
                  <td style={styles.td}>
                    <button
                      onClick={() => setDeleteId(user._id)}
                      style={styles.deleteBtn}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {users.length === 0 && <p style={styles.noUsers}>No users found.</p>}
        </div>

        {deleteId && (
          <ConfirmDialog
            message="Are you sure you want to remove this user? All their tasks will remain but they won't be able to access the system."
            onConfirm={handleDeleteUser}
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
    padding: "2rem 1rem",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "2rem",
  },
  backBtn: {
    backgroundColor: "#95a5a6",
    color: "white",
    border: "none",
    padding: "0.75rem 1.5rem",
    borderRadius: "4px",
    cursor: "pointer",
    fontWeight: "bold",
  },
  tableContainer: {
    backgroundColor: "white",
    borderRadius: "8px",
    overflow: "hidden",
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
  },
  headerRow: {
    backgroundColor: "#2c3e50",
  },
  th: {
    padding: "1rem",
    textAlign: "left",
    color: "white",
    fontWeight: "bold",
  },
  row: {
    borderBottom: "1px solid #ddd",
  },
  td: {
    padding: "1rem",
  },
  roleBadge: {
    padding: "0.25rem 0.75rem",
    borderRadius: "12px",
    fontSize: "0.85rem",
    color: "white",
    fontWeight: "bold",
  },
  deleteBtn: {
    backgroundColor: "#e74c3c",
    color: "white",
    border: "none",
    padding: "0.5rem 1rem",
    borderRadius: "4px",
    cursor: "pointer",
  },
  noUsers: {
    textAlign: "center",
    padding: "2rem",
    color: "#555",
  },
};

export default UserManagement;
