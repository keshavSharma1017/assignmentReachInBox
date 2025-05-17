import { format } from '../../utils/dateFormatter.js'
import '../../styles/components/EmailList.css'

const EmailList = ({ 
  threads, 
  selectedThread, 
  onSelectThread, 
  onDeleteThread, 
  isLoading, 
  error 
}) => {
  if (isLoading) {
    return (
      <div className="email-list loading">
        <div className="loading-spinner"></div>
        <p>Loading emails...</p>
      </div>
    )
  }
  
  if (error) {
    return (
      <div className="email-list error">
        <p>{error}</p>
        <button className="retry-button">Retry</button>
      </div>
    )
  }
  
  if (!threads || threads.length === 0) {
    return (
      <div className="email-list empty">
        <p>No emails found.</p>
      </div>
    )
  }
  
  return (
    <div className="email-list">
      <div className="email-list-header">
        <div className="header-actions">
          <input type="checkbox" className="select-all" />
          <button className="refresh-btn">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-8 3.58-8 8s3.58 8 8 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z" fill="currentColor"/>
            </svg>
          </button>
        </div>
      </div>
      
      <div className="email-items">
        {threads.map(thread => (
          <div 
            key={thread.threadId}
            className={`email-item ${selectedThread?.threadId === thread.threadId ? 'selected' : ''} ${!thread.isRead ? 'unread' : ''}`}
            onClick={() => onSelectThread(thread)}
          >
            <div className="email-checkbox">
              <input 
                type="checkbox" 
                onClick={(e) => e.stopPropagation()}
                onChange={() => {}} 
              />
            </div>
            
            <div className="email-sender">
              <span>{thread.fromName || thread.fromEmail}</span>
            </div>
            
            <div className="email-content">
              <div className="email-subject">
                {thread.subject}
              </div>
              <div className="email-snippet">
                {thread.body.replace(/<[^>]*>?/gm, '').substring(0, 50)}...
              </div>
            </div>
            
            <div className="email-date">
              {format(thread.sentAt)}
            </div>
            
            <div className="email-actions">
              <button 
                className="delete-btn"
                onClick={(e) => {
                  e.stopPropagation()
                  onDeleteThread(thread.threadId)
                }}
                title="Delete"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" fill="currentColor"/>
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default EmailList