import { createContext, useContext, useEffect, useState } from 'react'
import api from '../api/axios'

const AuthContext = createContext(undefined)
const ADMIN_SESSION_KEY = 'adminSession'

export const AuthProvider = ({ children }) => {
  const hasStoredSession = localStorage.getItem(ADMIN_SESSION_KEY) === 'true'
  const [adminUser, setAdminUser] = useState(null)
  const [loading, setLoading] = useState(hasStoredSession)

  useEffect(() => {
    if (!hasStoredSession) return

    api.get('/users/profile')
      .then(({ data }) => {
        if (data.isAdmin) {
          setAdminUser(data)
        } else {
          localStorage.removeItem(ADMIN_SESSION_KEY)
        }
      })
      .catch(() => localStorage.removeItem(ADMIN_SESSION_KEY))
      .finally(() => setLoading(false))
  }, [hasStoredSession])

  const login = async (email, password) => {
    const { data } = await api.post('/users/auth', { email, password })

    if (!data.isAdmin) {
      await api.post('/users/logout')
      throw new Error('This account does not have administrator access.')
    }

    localStorage.setItem(ADMIN_SESSION_KEY, 'true')
    setAdminUser(data)
  }

  const logout = async () => {
    try {
      await api.post('/users/logout')
    } finally {
      localStorage.removeItem(ADMIN_SESSION_KEY)
      setAdminUser(null)
    }
  }

  return (
    <AuthContext.Provider value={{ adminUser, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within an AuthProvider')
  return context
}
