import axios from 'axios'
import { API_BASE_URL } from '../utils/constants'

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    Accept: 'application/json',
  },
})

// Attach bearer token to every request if present
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('sitebel_token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Global response handling: auto-logout on 401, normalize error shape
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('sitebel_token')
      localStorage.removeItem('sitebel_user')
      if (!window.location.pathname.startsWith('/masuk') && !window.location.pathname.startsWith('/admin/login')) {
        window.location.href = '/masuk'
      }
    }
    return Promise.reject(error)
  }
)

export default api
