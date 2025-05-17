export const format = (dateString, detailed = false) => {
  const date = new Date(dateString)
  const now = new Date()
  const diffTime = Math.abs(now - date)
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))
  
  // If the date is today
  if (diffDays === 0) {
    if (detailed) {
      return `Today at ${formatTime(date)}`
    }
    return formatTime(date)
  }
  
  // If the date is yesterday
  if (diffDays === 1) {
    if (detailed) {
      return `Yesterday at ${formatTime(date)}`
    }
    return 'Yesterday'
  }
  
  // If the date is within the last week
  if (diffDays < 7) {
    if (detailed) {
      return `${formatDayOfWeek(date)} at ${formatTime(date)}`
    }
    return formatDayOfWeek(date)
  }
  
  // If the date is older or detailed view is requested
  if (detailed) {
    return `${formatMonthDay(date)}, ${date.getFullYear()} at ${formatTime(date)}`
  }
  
  // Default format for list view
  return formatMonthDay(date)
}

const formatTime = (date) => {
  let hours = date.getHours()
  const minutes = date.getMinutes().toString().padStart(2, '0')
  const ampm = hours >= 12 ? 'PM' : 'AM'
  
  hours = hours % 12
  hours = hours ? hours : 12 // the hour '0' should be '12'
  
  return `${hours}:${minutes} ${ampm}`
}

const formatDayOfWeek = (date) => {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  return days[date.getDay()]
}

const formatMonthDay = (date) => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  return `${months[date.getMonth()]} ${date.getDate()}`
}