import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav style={styles.nav}>
      <div style={styles.container}>
        <Link to="/dashboard" style={styles.logo}>
          Task Manager
        </Link>
        <div style={styles.menu}>
          <span style={styles.userName}>
            {user?.name} ({user?.role})
          </span>
          {user?.role === "admin" && (
            <Link to="/users" style={styles.link}>
              Manage Users
            </Link>
          )}
          <button onClick={handleLogout} style={styles.button}>
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

const styles = {
  nav: {
    backgroundColor: "#2c3e50",
    padding: "1rem 0",
    marginBottom: "2rem",
  },
  container: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "0 1rem",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  logo: {
    color: "white",
    fontSize: "1.5rem",
    fontWeight: "bold",
    textDecoration: "none",
  },
  menu: {
    display: "flex",
    alignItems: "center",
    gap: "1rem",
  },
  userName: {
    color: "white",
  },
  link: {
    color: "white",
    textDecoration: "none",
    padding: "0.5rem 1rem",
    borderRadius: "4px",
    backgroundColor: "#34495e",
  },
  button: {
    backgroundColor: "#e74c3c",
    color: "white",
    border: "none",
    padding: "0.5rem 1rem",
    borderRadius: "4px",
    cursor: "pointer",
  },
};

export default Navbar;
