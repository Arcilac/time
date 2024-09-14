import React, { useState, useEffect, useCallback } from "react"
import TimeEntry from "./TimeEntry"
import { v4 as uuidv4 } from "uuid"

const TimeTracker = () => {
  const [entries, setEntries] = useState([])
  const [totalTime, setTotalTime] = useState({ hours: 0, minutes: 0 })

  useEffect(() => {
    const savedEntries = JSON.parse(localStorage.getItem("timeEntries"))
    if (savedEntries) {
      setEntries(savedEntries)
    }
  }, [])

  const calculateTotalTime = useCallback(() => {
    let totalMinutes = 0
    entries.forEach((entry) => {
      if (entry.startTime && entry.endTime) {
        const start = new Date(`1950-01-01T${entry.startTime}:00`)
        const end = new Date(`1950-01-01T${entry.endTime}:00`)
        const diff = (end - start) / 1000 / 60
        totalMinutes += diff
      }
    })
    const hours = Math.floor(totalMinutes / 60)
    const minutes = Math.floor(totalMinutes % 60)
    setTotalTime({ hours, minutes })
  }, [entries])

  useEffect(() => {
    localStorage.setItem("timeEntries", JSON.stringify(entries))
    calculateTotalTime()
  }, [entries, calculateTotalTime])

  const addEntry = () => {
    setEntries([...entries, { id: uuidv4(), startTime: "", endTime: "" }])
  }

  const removeEntry = (id) => {
    setEntries(entries.filter((entry) => entry.id !== id))
  }

  const updateEntry = (id, updatedEntry) => {
    setEntries(entries.map((entry) => (entry.id === id ? updatedEntry : entry)))
  }

  const handleSave = () => {
    console.log("Entries saved:", JSON.stringify(entries, null, 2))
  }

  const styles = {
    container: {
      backgroundColor: "#1a2634",
      color: "#ecf0f1",
      padding: "20px",
      borderRadius: "10px",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      maxWidth: "600px",
      margin: "20px auto",
    },
    header: {
      fontSize: "28px",
      marginBottom: "20px",
      textAlign: "center",
    },
    buttonContainer: {
      display: "flex",
      justifyContent: "space-between",
      marginTop: "20px",
    },
    button: {
      padding: "10px 20px",
      fontSize: "16px",
      color: "#ecf0f1",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
      transition: "background-color 0.3s ease",
    },
    addButton: {
      backgroundColor: "#27ae60",
    },
    saveButton: {
      backgroundColor: "#3498db",
    },
    totalTime: {
      marginTop: "20px",
      fontSize: "18px",
      textAlign: "center",
    },
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Time Tracker</h1>
      {entries.map((entry) => (
        <TimeEntry key={entry.id} entry={entry} onChange={updateEntry} onRemove={removeEntry} />
      ))}
      <div style={styles.buttonContainer}>
        <button
          onClick={addEntry}
          style={{ ...styles.button, ...styles.addButton }}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#2ecc71")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "#27ae60")}
        >
          Add Entry
        </button>
        <button
          onClick={handleSave}
          style={{ ...styles.button, ...styles.saveButton }}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#2980b9")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "#3498db")}
        >
          Save
        </button>
      </div>
      <h2 style={styles.totalTime}>
        Total hours worked: {totalTime.hours} hours and {totalTime.minutes} minutes
      </h2>
    </div>
  )
}

export default TimeTracker
