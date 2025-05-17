import { useState } from 'react'
import '../../styles/components/Sidebar.css'

const Sidebar = () => {
  const [activeItem, setActiveItem] = useState('inbox')
  
  const menuItems = [
    { id: 'inbox', label: 'Inbox', icon: 'inbox', count: 12 },
    { id: 'starred', label: 'Starred', icon: 'star', count: 5 },
    { id: 'sent', label: 'Sent', icon: 'sent', count: null },
    { id: 'drafts', label: 'Drafts', icon: 'draft', count: 3 },
    { id: 'trash', label: 'Trash', icon: 'trash', count: null },
    { id: 'spam', label: 'Spam', icon: 'spam', count: 8 }
  ]
  
  const handleItemClick = (id) => {
    setActiveItem(id)
  }
  
  return (
    <div className="sidebar">
      <div className="compose-btn-wrapper">
        <button className="compose-btn">
          <span className="compose-icon">+</span>
          <span>Compose</span>
        </button>
      </div>
      
      <nav className="sidebar-nav">
        <ul className="sidebar-menu">
          {menuItems.map(item => (
            <li 
              key={item.id} 
              className={`sidebar-item ${activeItem === item.id ? 'active' : ''}`}
              onClick={() => handleItemClick(item.id)}
            >
              <div className="sidebar-item-icon">
                {getIcon(item.icon)}
              </div>
              <span className="sidebar-item-label">{item.label}</span>
              {item.count !== null && (
                <span className="sidebar-item-count">{item.count}</span>
              )}
            </li>
          ))}
        </ul>
      </nav>
      
      <div className="sidebar-footer">
        <div className="storage-info">
          <div className="storage-progress">
            <div 
              className="storage-progress-bar" 
              style={{ width: '35%' }}
            ></div>
          </div>
          <span className="storage-text">2.5 GB of 15 GB used</span>
        </div>
      </div>
    </div>
  )
}

// Helper function to render icons
const getIcon = (iconName) => {
  switch (iconName) {
    case 'inbox':
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5v-3h3.56c.69 1.19 1.97 2 3.45 2s2.75-.81 3.45-2H19v3zm0-5h-4.99c0 1.1-.9 2-2 2s-2-.9-2-2H5V5h14v9z" fill="currentColor"/>
        </svg>
      )
    case 'star':
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27z" fill="currentColor"/>
        </svg>
      )
    case 'sent':
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2 .01 7z" fill="currentColor"/>
        </svg>
      )
    case 'draft':
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" fill="currentColor"/>
        </svg>
      )
    case 'trash':
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" fill="currentColor"/>
        </svg>
      )
    case 'spam':
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" fill="currentColor"/>
        </svg>
      )
    default:
      return null
  }
}

export default Sidebar