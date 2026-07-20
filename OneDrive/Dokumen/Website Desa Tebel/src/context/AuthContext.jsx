import { createContext, useState, useEffect, useCallback } from 'react'
import authService from '../services/authService'

export const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem('sitebel_user')
    return stored ? JSON.parse(stored) : null
  })
  const [token, setToken] = useState(() => localStorage.getItem('sitebel_token'))
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const bootstrap = async () => {
      if (token) {
        try {
          const { data } = await authService.me()
          setUser(data.data)
          localStorage.setItem('sitebel_user', JSON.stringify(data.data))
        } catch {
          setUser(null)
          setToken(null)
          localStorage.removeItem('sitebel_token')
          localStorage.removeItem('sitebel_user')
        }
      }
      setLoading(false)
    }
    bootstrap()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const login = useCallback(async (credentials) => {
    const { data } = await authService.login(credentials)
    const { user: userData, token: authToken } = data.data
    localStorage.setItem('sitebel_token', authToken)
    localStorage.setItem('sitebel_user', JSON.stringify(userData))
    setUser(userData)
    setToken(authToken)
    return userData
  }, [])

  const register = useCallback(async (payload) => {
    const { data } = await authService.register(payload)
    return data
  }, [])

  const logout = useCallback(async () => {
    try {
      await authService.logout()
    } catch {
      /* ignore network errors on logout */
    }
    localStorage.removeItem('sitebel_token')
    localStorage.removeItem('sitebel_user')
    setUser(null)
    setToken(null)
  }, [])

  const value = {
    user,
    token,
    isAuthenticated: !!token,
    isAdmin: user?.role === 'admin',
    loading,
    login,
    register,
    logout,
    setUser,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
