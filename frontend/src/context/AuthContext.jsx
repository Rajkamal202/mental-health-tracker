import { createContext, useContext, useState, useEffect } from 'react'
import axios from 'axios'
import { toast } from 'react-hot-toast'

const AuthContext = createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  // Set up axios defaults
  axios.defaults.baseURL = import.meta.env.VITE_API_URL

  useEffect(() => {
    const initializeAuth = async () => {
      const token = localStorage.getItem('token')
      if (token) {
        try {
          // Set the auth header
          setAuthHeader(token)
          // Verify the token is still valid
          const response = await axios.get('/api/auth/profile')
          setUser({ token, ...response.data })
        } catch (error) {
          console.error('Token validation failed:', error)
          localStorage.removeItem('token')
          delete axios.defaults.headers.common['Authorization']
        }
      }
      setLoading(false)
    }

    initializeAuth()
  }, [])

  const setAuthHeader = (token) => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    } else {
      delete axios.defaults.headers.common['Authorization']
    }
  }

  const login = async (email, password) => {
    try {
      const response = await axios.post('/api/auth/login', { email, password })
      const { token } = response.data
      localStorage.setItem('token', token)
      setAuthHeader(token)
      setUser({ token, email })
      toast.success('Logged in successfully')
      return true
    } catch (error) {
      console.error('Login failed:', error)
      toast.error(error.response?.data?.message || 'Failed to log in')
      throw error
    }
  }

  const register = async (email, password) => {
    try {
      const response = await axios.post('/api/auth/register', { email, password })
      const { token } = response.data
      localStorage.setItem('token', token)
      setAuthHeader(token)
      setUser({ token, email })
      toast.success('Account created successfully')
      return true
    } catch (error) {
      console.error('Registration failed:', error)
      toast.error(error.response?.data?.message || 'Failed to create account')
      throw error
    }
  }

  const logout = () => {
    localStorage.removeItem('token')
    setAuthHeader(null)
    setUser(null)
    toast.success('Logged out successfully')
  }

  const value = {
    user,
    login,
    register,
    logout,
    loading
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}



