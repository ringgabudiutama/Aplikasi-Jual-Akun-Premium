import api from './api'

const userService = {
  list: (params) => api.get('/users', { params }),
  detail: (id) => api.get(`/users/${id}`),
  create: (payload) => api.post('/users', payload),
  update: (id, payload) => api.put(`/users/${id}`, payload),
  remove: (id) => api.delete(`/users/${id}`),
  resetPassword: (id) => api.post(`/users/${id}/reset-password`),
  toggleActive: (id) => api.post(`/users/${id}/toggle-active`),
}

export default userService
