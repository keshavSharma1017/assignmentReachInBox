import { useState } from 'react'
import { useTheme } from '../../contexts/ThemeContext.jsx'
import ThemeToggle from './ThemeToggle.jsx'
import '../../styles/components/Header.css'

const Header = ({ user, onLogout }) => {
  const [showDropdown, setShowDropdown] = useState(false)
  const { theme } = useTheme()
  
  const toggleDropdown = () => {
    setShowDropdown(!showDropdown)
  }

  return (
    <header className="app-header">
      <div className="header-left">
        <h1 className="app-title">ReachInbox</h1>
      </div>
      
      <div className="header-right">
        <div className="header-actions">
          <ThemeToggle />
          
          <div className="user-profile" onClick={toggleDropdown}>
            <img 
              src={user?.avatar || 'https://via.placeholder.com/40'} 
              alt={user?.name || 'User'} 
              className="user-avatar" 
            />
            <span className="user-name">{user?.name || 'User'}</span>
            
            {showDropdown && (
              <div className="user-dropdown">
                <div className="dropdown-user-info">
                  <img 
                    src={user?.avatar || 'https://via.placeholder.com/40'} 
                    alt={user?.name || 'User'} 
                    className="dropdown-avatar" 
                  />
                  <div className="dropdown-user-details">
                    <span className="dropdown-user-name">{user?.name || 'User'}</span>
                    <span className="dropdown-user-email">{user?.email || 'user@example.com'}</span>
                  </div>
                </div>
                
                <div className="dropdown-divider"></div>
                
                <ul className="dropdown-menu">
                  <li><a href="#">Profile</a></li>
                  <li><a href="#">Settings</a></li>
                  <li><button onClick={onLogout}>Sign Out</button></li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header