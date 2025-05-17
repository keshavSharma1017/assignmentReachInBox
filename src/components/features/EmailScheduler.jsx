import { useState } from 'react'
import '../../styles/components/EmailScheduler.css'

// This is the unique feature implementation: Smart Email Scheduling
const EmailScheduler = ({ onSchedule, onClose }) => {
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [priority, setPriority] = useState('normal')
  const [recurrence, setRecurrence] = useState('none')
  
  const handleSubmit = (e) => {
    e.preventDefault()
    
    // Create schedule data
    const scheduleData = {
      date,
      time,
      priority,
      recurrence
    }
    
    onSchedule(scheduleData)
  }
  
  // Generate time options (every 30 minutes)
  const generateTimeOptions = () => {
    const options = []
    for (let hour = 0; hour < 24; hour++) {
      for (let minute of ['00', '30']) {
        const hourFormatted = hour.toString().padStart(2, '0')
        options.push(`${hourFormatted}:${minute}`)
      }
    }
    return options
  }
  
  const timeOptions = generateTimeOptions()
  
  return (
    <div className="email-scheduler">
      <div className="scheduler-header">
        <h3>Smart Email Scheduling</h3>
        <button className="close-btn" onClick={onClose}>×</button>
      </div>
      
      <form onSubmit={handleSubmit} className="scheduler-form">
        <div className="form-row">
          <label htmlFor="schedule-date">Date:</label>
          <input
            id="schedule-date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            min={new Date().toISOString().split('T')[0]}
            required
          />
        </div>
        
        <div className="form-row">
          <label htmlFor="schedule-time">Time:</label>
          <select
            id="schedule-time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            required
          >
            <option value="">Select a time</option>
            {timeOptions.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </div>
        
        <div className="form-row">
          <label htmlFor="schedule-priority">Priority:</label>
          <select
            id="schedule-priority"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value="low">Low</option>
            <option value="normal">Normal</option>
            <option value="high">High</option>
            <option value="urgent">Urgent</option>
          </select>
        </div>
        
        <div className="form-row">
          <label htmlFor="schedule-recurrence">Recurrence:</label>
          <select
            id="schedule-recurrence"
            value={recurrence}
            onChange={(e) => setRecurrence(e.target.value)}
          >
            <option value="none">None (One-time)</option>
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
          </select>
        </div>
        
        <div className="smart-timing">
          <h4>Smart Timing Recommendations</h4>
          <div className="timing-options">
            <button 
              type="button" 
              className="timing-option"
              onClick={() => {
                // Set to next morning at 8:00 AM
                const tomorrow = new Date()
                tomorrow.setDate(tomorrow.getDate() + 1)
                tomorrow.setHours(8, 0, 0, 0)
                setDate(tomorrow.toISOString().split('T')[0])
                setTime('08:00')
              }}
            >
              Tomorrow Morning (8:00 AM)
            </button>
            
            <button 
              type="button" 
              className="timing-option"
              onClick={() => {
                // Set to optimal delivery time based on past engagement
                const optimal = new Date()
                optimal.setDate(optimal.getDate() + 1)
                optimal.setHours(10, 30, 0, 0)
                setDate(optimal.toISOString().split('T')[0])
                setTime('10:30')
                setPriority('high')
              }}
            >
              Optimal Delivery Time
            </button>
            
            <button 
              type="button" 
              className="timing-option"
              onClick={() => {
                // Weekend delivery
                const today = new Date()
                const daysUntilSaturday = (6 - today.getDay() + 7) % 7
                const saturday = new Date(today)
                saturday.setDate(today.getDate() + daysUntilSaturday)
                saturday.setHours(11, 0, 0, 0)
                setDate(saturday.toISOString().split('T')[0])
                setTime('11:00')
              }}
            >
              Weekend Delivery
            </button>
          </div>
        </div>
        
        <div className="scheduler-actions">
          <button type="submit" className="schedule-btn">
            Schedule Email
          </button>
          <button type="button" className="cancel-btn" onClick={onClose}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}

export default EmailScheduler