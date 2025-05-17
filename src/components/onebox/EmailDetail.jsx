import { useState } from 'react'
import { format } from '../../utils/dateFormatter.js'
import parse from 'html-react-parser'
import '../../styles/components/EmailDetail.css'

const EmailDetail = ({ thread, onDelete, onReply }) => {
  const [showOptions, setShowOptions] = useState(false)
  
  if (!thread) return null
  
  const toggleOptions = () => {
    setShowOptions(!showOptions)
  }
  
  return (
    <div className="email-detail">
      <div className="email-detail-header">
        <div className="email-detail-subject">
          <h2>{thread.subject}</h2>
        </div>
        
        <div className="email-detail-actions">
          <div className="primary-actions">
            <button 
              className="reply-btn"
              onClick={onReply}
              title="Reply (R)"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 9V5l-7 7 7 7v-4.1c5 0 8.5 1.6 11 5.1-1-5-4-10-11-11z" fill="currentColor"/>
              </svg>
              <span>Reply</span>
            </button>
            
            <button 
              className="delete-btn"
              onClick={onDelete}
              title="Delete (D)"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" fill="currentColor"/>
              </svg>
              <span>Delete</span>
            </button>
          </div>
        </div>
      </div>
      
      <div className="email-detail-meta">
        <div className="sender-info">
          <div className="sender-avatar">
            {thread.fromName ? thread.fromName.charAt(0).toUpperCase() : ''}
          </div>
          
          <div className="sender-details">
            <div className="sender-name-row">
              <span className="sender-name">{thread.fromName || thread.fromEmail}</span>
              <span className="email-date">{format(thread.sentAt, true)}</span>
            </div>
            
            <div className="recipient-info">
              to <span className="recipient">{thread.toName || thread.toEmail}</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="email-detail-body">
        {parse(thread.body)}
      </div>
      
      <div className="email-detail-footer">
        <button className="reply-btn" onClick={onReply}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 9V5l-7 7 7 7v-4.1c5 0 8.5 1.6 11 5.1-1-5-4-10-11-11z" fill="currentColor"/>
          </svg>
          <span>Reply</span>
        </button>
      </div>
    </div>
  )
}

export default EmailDetail