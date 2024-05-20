import React, { useState, useEffect, useCallback } from "react"
import TimeEntry from "./TimeEntry"
import { v4 as uuidv4 } from "uuid"

const TimeTracker = () => {
  const [entries, setEntries] = useState([])
  const [totalTime, setTotalTime] = useState({ hours: 0, minutes: 0 })

  useEffect(() => {
    // Recuperar los datos guardados en localStorage
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
    const minutes = totalMinutes % 60
    setTotalTime({ hours, minutes })
  }, [entries])

  useEffect(() => {
    // Guardar los datos en localStorage cuando cambian las entradas
    // se debe cambiar para enlazar a la DB
    localStorage.setItem("timeEntries", JSON.stringify(entries))
    // Calcular el total de horas trabajadas
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

  return (
    <div className="time">
      <h1>Time </h1>
      {entries.map((entry) => (
        <TimeEntry key={entry.id} entry={entry} onChange={updateEntry} onRemove={removeEntry} />
      ))}
      <button onClick={addEntry}>Add Entry</button>
      <button onClick={handleSave}>Save</button>
      <h2>
        Total hours worked: {totalTime.hours} hours with {totalTime.minutes} minutes
      </h2>
    </div>
  )
}

export default TimeTracker
