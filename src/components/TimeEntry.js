import React from "react"

const TimeEntry = ({ entry, onChange, onRemove }) => {
  const handleChange = (e) => {
    const { name, value } = e.target
    onChange(entry.id, { ...entry, [name]: value })
  }

  return (
    <div className="time-entry">
      <input type="time" 
        name="startTime" 
        value={entry.startTime} 
        onChange={handleChange} 
      />
      <input 
        type="time" 
        name="endTime" 
        value={entry.endTime} 
        onChange={handleChange} 
      />
      <button onClick={() => onRemove(entry.id)}>Remove</button>
    </div>
  )
}

export default TimeEntry
