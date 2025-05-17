import axios from 'axios'

const BASE_URL = 'https://hiring.reachinbox.xyz/api/v1'

// Logger utility
const logger = {
  logRequest: (method, url, headers, body) => {
    const timestamp = new Date().toISOString()
    const sanitizedHeaders = { ...headers }
    delete sanitizedHeaders['Authorization'] // Remove sensitive info
    
    console.group(`API Request - ${timestamp}`)
    console.log(`${method.toUpperCase()} ${url}`)
    console.log('Headers:', sanitizedHeaders)
    if (body) console.log('Body:', body)
    console.groupEnd()
  },
  
  logResponse: (method, url, status, data, duration) => {
    const timestamp = new Date().toISOString()
    const truncatedData = JSON.stringify(data).slice(0, 1000) // Truncate large responses
    
    console.group(`API Response - ${timestamp}`)
    console.log(`${method.toUpperCase()} ${url}`)
    console.log(`Status: ${status}`)
    console.log(`Duration: ${duration}ms`)
    console.log('Data:', truncatedData.length < JSON.stringify(data).length ? `${truncatedData}... (truncated)` : data)
    console.groupEnd()
  },
  
  logError: (method, url, error) => {
    const timestamp = new Date().toISOString()
    
    console.group(`API Error - ${timestamp}`)
    console.log(`${method.toUpperCase()} ${url}`)
    console.log('Error:', error.message)
    if (error.response) {
      console.log('Status:', error.response.status)
      console.log('Data:', error.response.data)
    }
    console.groupEnd()
  }
}

const apiClient = () => {
  const token = localStorage.getItem('token')
  const instance = axios.create({
    baseURL: BASE_URL,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  })
  
  // Request interceptor
  instance.interceptors.request.use(
    (config) => {
      config.metadata = { startTime: new Date() }
      logger.logRequest(
        config.method,
        config.url,
        config.headers,
        config.data
      )
      return config
    },
    (error) => {
      logger.logError(
        error.config?.method || 'UNKNOWN',
        error.config?.url || 'UNKNOWN',
        error
      )
      return Promise.reject(error)
    }
  )
  
  // Response interceptor
  instance.interceptors.response.use(
    (response) => {
      const duration = new Date() - response.config.metadata.startTime
      logger.logResponse(
        response.config.method,
        response.config.url,
        response.status,
        response.data,
        duration
      )
      return response
    },
    (error) => {
      logger.logError(
        error.config?.method || 'UNKNOWN',
        error.config?.url || 'UNKNOWN',
        error
      )
      return Promise.reject(error)
    }
  )
  
  return instance
}

export const getThreads = async () => {
  try {
    const response = await apiClient().get('/onebox/list')
    return response.data.data || []
  } catch (error) {
    return {
      status: 404,
      message: "Email threads not found"
    }
  }
}

export const getThread = async (threadId) => {
  try {
    const response = await apiClient().get(`/onebox/messages/${threadId}`)
    return response.data.data
  } catch (error) {
    return {
      status: 404,
      message: "Email thread not found"
    }
  }
}

export const deleteThread = async (threadId) => {
  try {
    const response = await apiClient().delete(`/onebox/messages/${threadId}`)
    return response.data.data
  } catch (error) {
    return {
      status: 404,
      message: "Email thread not found"
    }
  }
}

export const sendReply = async (threadId, replyData) => {
  try {
    const response = await apiClient().post(`/onebox/reply/${threadId}`, replyData)
    return response.data
  } catch (error) {
    return {
      status: 404,
      message: "Failed to send reply"
    }
  }
}

export const resetData = async () => {
  try {
    const response = await apiClient().get('/onebox/reset')
    return response.data
  } catch (error) {
    return {
      status: 404,
      message: "Reset operation failed"
    }
  }
}