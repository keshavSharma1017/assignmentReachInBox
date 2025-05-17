import { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext.jsx'
import { getThreads, deleteThread, resetData } from '../services/oneboxService.js'
import { checkAuthStatus } from '../services/authService.js'
import Header from '../components/common/Header.jsx'
import Sidebar from '../components/onebox/Sidebar.jsx'
import EmailList from '../components/onebox/EmailList.jsx'
import EmailDetail from '../components/onebox/EmailDetail.jsx'
import ReplyComposer from '../components/editor/ReplyComposer.jsx'
import '../styles/OneboxPage.css'

const OneboxPage = () => {
  const [threads, setThreads] = useState([])
  const [selectedThread, setSelectedThread] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [showReply, setShowReply] = useState(false)
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  // Check authentication on mount and fetch threads
  useEffect(() => {
    if (!checkAuthStatus()) {
      navigate('/')
      return
    }
    fetchThreads()
  }, [navigate])

  const fetchThreads = async () => {
    try {
      if (!checkAuthStatus()) {
        navigate('/')
        return
      }

      setIsLoading(true)
      setError(null)
      
      // Try to reset data, but continue even if it fails
      try {
        await resetData()
      } catch (err) {
        // Reset failure is non-critical, continue with thread fetch
        console.warn('Data reset skipped, continuing with thread fetch')
      }

      const data = await getThreads()
      setThreads(Array.isArray(data) ? data : [])
      
      if (data && Array.isArray(data) && data.length > 0 && !selectedThread) {
        setSelectedThread(data[0])
      }
    } catch (err) {
      if (err.response?.status === 401) {
        navigate('/')
        return
      }
      setError(err.message || 'Unable to load emails. Please try refreshing the page.')
      console.error('Error fetching threads:', err)
      setThreads([])
    } finally {
      setIsLoading(false)
    }
  }

  const handleSelectThread = (thread) => {
    setSelectedThread(thread)
    setShowReply(false)
  }

  const handleDeleteThread = async (threadId) => {
    try {
      if (!checkAuthStatus()) {
        navigate('/')
        return
      }

      await deleteThread(selectedThread.threadId)
      
      const updatedThreads = threads.filter(thread => thread.threadId !== threadId)
      setThreads(updatedThreads)
      
      if (selectedThread && selectedThread.threadId === threadId) {
        setSelectedThread(updatedThreads.length > 0 ? updatedThreads[0] : null)
      }
    } catch (err) {
      if (err.response?.status === 401) {
        navigate('/')
        return
      }
      console.error('Failed to delete thread:', err)
      setError(err.message || 'Failed to delete thread. Please try again.')
    }
  }

  const toggleReply = () => {
    setShowReply(!showReply)
  }

  const handleKeyDown = useCallback((event) => {
    if (!selectedThread) return
    
    if (event.key === 'd' || event.key === 'D') {
      handleDeleteThread(selectedThread.threadId)
    }
    
    if (event.key === 'r' || event.key === 'R') {
      toggleReply()
    }
  }, [selectedThread])

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [handleKeyDown])

  return (
    <div className="onebox-page">
      <Header user={user} onLogout={logout} />
      
      <div className="onebox-content">
        <Sidebar />
        
        <div className="main-content">
          <EmailList 
            threads={threads} 
            selectedThread={selectedThread}
            onSelectThread={handleSelectThread}
            onDeleteThread={handleDeleteThread}
            isLoading={isLoading}
            error={error}
          />
          
          <div className="email-detail-container">
            {selectedThread ? (
              <>
                <EmailDetail 
                  thread={selectedThread} 
                  onDelete={() => handleDeleteThread(selectedThread.threadId)}
                  onReply={toggleReply}
                />
                
                {showReply && (
                  <ReplyComposer 
                    thread={selectedThread}
                    onClose={() => setShowReply(false)}
                    onReplySent={fetchThreads}
                  />
                )}
              </>
            ) : (
              <div className="no-email-selected">
                <p>Select an email to view its contents</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default OneboxPage