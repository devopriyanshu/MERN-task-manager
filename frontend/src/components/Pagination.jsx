const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pages = [];

  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  return (
    <div style={styles.pagination}>
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        style={currentPage === 1 ? styles.disabledBtn : styles.btn}
      >
        Previous
      </button>

      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          style={currentPage === page ? styles.activeBtn : styles.btn}
        >
          {page}
        </button>
      ))}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        style={currentPage === totalPages ? styles.disabledBtn : styles.btn}
      >
        Next
      </button>
    </div>
  );
};

const styles = {
  pagination: {
    display: "flex",
    justifyContent: "center",
    gap: "0.5rem",
    margin: "2rem 0",
  },
  btn: {
    padding: "0.5rem 1rem",
    backgroundColor: "#3498db",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  activeBtn: {
    padding: "0.5rem 1rem",
    backgroundColor: "#2c3e50",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  disabledBtn: {
    padding: "0.5rem 1rem",
    backgroundColor: "#95a5a6",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "not-allowed",
  },
};

export default Pagination;
