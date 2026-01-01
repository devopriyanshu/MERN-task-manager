const ConfirmDialog = ({ message, onConfirm, onCancel }) => {
  return (
    <div style={styles.overlay}>
      <div style={styles.dialog}>
        <h3 style={styles.title}>Confirm Action</h3>
        <p style={styles.message}>{message}</p>
        <div style={styles.buttons}>
          <button onClick={onConfirm} style={styles.confirmBtn}>
            Yes, Delete
          </button>
          <button onClick={onCancel} style={styles.cancelBtn}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  dialog: {
    backgroundColor: "white",
    padding: "2rem",
    borderRadius: "8px",
    maxWidth: "400px",
    width: "90%",
  },
  title: {
    margin: "0 0 1rem 0",
    color: "#2c3e50",
  },
  message: {
    marginBottom: "1.5rem",
    color: "#555",
  },
  buttons: {
    display: "flex",
    gap: "1rem",
  },
  confirmBtn: {
    flex: 1,
    backgroundColor: "#e74c3c",
    color: "white",
    border: "none",
    padding: "0.75rem",
    borderRadius: "4px",
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
    cursor: "pointer",
    fontWeight: "bold",
  },
};

export default ConfirmDialog;
