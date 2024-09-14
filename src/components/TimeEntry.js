import React from "react"

const TimeEntry = ({ entry, onChange, onRemove }) => {
  const handleChange = (e) => {
    const { name, value } = e.target
    onChange(entry.id, { ...entry, [name]: value })
  }

  const styles = {
    timeEntry: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      margin: "10px 0",
      padding: "10px",
      backgroundColor: "#2c3e50",
      borderRadius: "8px",
      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    },
    input: {
      margin: "0 10px",
      padding: "8px",
      backgroundColor: "#34495e",
      color: "#ecf0f1",
      border: "1px solid #7f8c8d",
      borderRadius: "4px",
      fontSize: "14px",
    },
    button: {
      padding: "8px 16px",
      backgroundColor: "#c0392b",
      color: "#ecf0f1",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
      fontSize: "14px",
      transition: "background-color 0.3s ease",
    },
  }

  return (
    <div style={styles.timeEntry}>
      <input
        type="time"
        name="startTime"
        value={entry.startTime}
        onChange={handleChange}
        style={styles.input}
      />
      <input
        type="time"
        name="endTime"
        value={entry.endTime}
        onChange={handleChange}
        style={styles.input}
      />
      <button
        onClick={() => onRemove(entry.id)}
        style={styles.button}
        onMouseOver={(e) => (e.target.style.backgroundColor = "#e74c3c")}
        onMouseOut={(e) => (e.target.style.backgroundColor = "#c0392b")}
      >
        Remove
      </button>
    </div>
  )
}

export default TimeEntry
