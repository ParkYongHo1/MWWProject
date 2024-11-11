// components/Pagination.js
import React from "react";

const Pagination = ({ totalPages, currentPage, onPageChange }) => {
  return (
    <div style={styles.pagination}>
      {Array.from({ length: totalPages }, (_, i) => (
        <button
          key={i}
          style={{
            ...styles.pageButton,
            backgroundColor: currentPage === i + 1 ? "#007bff" : "#fff",
            color: currentPage === i + 1 ? "#fff" : "#007bff",
          }}
          onClick={() => onPageChange(i + 1)}
        >
          {i + 1}
        </button>
      ))}
    </div>
  );
};

const styles = {
  pagination: {
    marginTop: "20px",
    display: "flex",
    justifyContent: "center",
    gap: "5px",
  },
  pageButton: {
    padding: "5px 10px",
    border: "1px solid #007bff",
    cursor: "pointer",
  },
};

export default Pagination;
