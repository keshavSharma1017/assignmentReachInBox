import { useState, useRef } from 'react'
import ReactQuill from 'react-quill'
import { sendReply } from '../../services/oneboxService.js'
import CustomToolbar from './CustomToolbar.jsx'
import 'react-quill/dist/quill.snow.css'
import '../../styles/components/ReplyComposer.css'

const ReplyComposer = ({ thread, onClose, onReplySent }) => {
  const [replyContent, setReplyContent] = useState('')
  const [isSending, setIsSending] = useState(false)
  const [showVariables, setShowVariables] = useState(false)
  const [error, setError] = useState('')
  const quillRef = useRef(null)
  
  const modules = {
    toolbar: {
      container: '#custom-toolbar',
    }
  }
  
  const handleSendReply = async (e) => {
    if (e) e.preventDefault()
    
    if (!replyContent.trim() || isSending) return
    
    setIsSending(true)
    setError('')
    
    try {
      const replyData = {
        from: thread.toEmail,
        fromName: thread.toName,
        to: thread.fromEmail,
        toName: thread.fromName,
        subject: thread.subject,
        body: replyContent,
        references: thread.references || [],
        inReplyTo: thread.messageId
      }
      
      const response = await sendReply(2, replyData) // Using threadId 2
      
      if (response.status === 404) {
        throw new Error(response.message)
      }
      
      onReplySent()
      onClose()
    } catch (error) {
      setError(error.message || 'Failed to send reply. Please try again.')
    } finally {
      setIsSending(false)
    }
  }
  
  const handleSave = () => {
    alert('Draft saved successfully')
  }
  
  const insertVariable = (variable) => {
    if (!quillRef.current) return
    
    const editor = quillRef.current.getEditor()
    const range = editor.getSelection(true)
    editor.insertText(range.index, `{{${variable}}}`)
    setShowVariables(false)
  }
  
  const toggleVariables = () => {
    setShowVariables(!showVariables)
  }
  
  const variables = [
    'recipient_name',
    'sender_name',
    'company_name',
    'current_date',
    'meeting_time',
    'signature'
  ]
  
  return (
    <div className="reply-composer">
      <div className="reply-header">
        <h3>Reply to: {thread.fromName || thread.fromEmail}</h3>
        <button className="close-btn" onClick={onClose}>×</button>
      </div>
      
      <form onSubmit={handleSendReply} className="reply-form">
        <div className="reply-recipient">
          <label>To:</label>
          <input type="text" value={thread.fromEmail} readOnly />
        </div>
        
        <div className="reply-subject">
          <label>Subject:</label>
          <input type="text" value={`Re: ${thread.subject}`} readOnly />
        </div>
        
        <div className="reply-editor">
          <CustomToolbar 
            onSave={handleSave} 
            onToggleVariables={toggleVariables} 
          />
          
          {showVariables && (
            <div className="variables-popup">
              <h4>Insert Variable</h4>
              <ul className="variables-list">
                {variables.map(variable => (
                  <li key={variable} onClick={() => insertVariable(variable)}>
                    {variable}
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          <ReactQuill
            ref={quillRef}
            theme="snow"
            value={replyContent}
            onChange={setReplyContent}
            modules={modules}
            placeholder="Compose your reply..."
          />
        </div>
        
        {error && (
          <div className="error-message">
            {error}
          </div>
        )}
        
        <div className="reply-actions">
          <button 
            type="submit"
            className="send-btn"
            disabled={isSending || !replyContent.trim()}
          >
            {isSending ? 'Sending...' : 'Send'}
          </button>
          
          <button 
            type="button" 
            className="discard-btn" 
            onClick={onClose}
          >
            Discard
          </button>
        </div>
      </form>
    </div>
  )
}

export default ReplyComposer