import api from './api'

const announcementService = {
  list: (params) => api.get('/announcements', { params }),
  detail: (id) => api.get(`/announcements/${id}`),
  create: (payload) => api.post('/announcements', payload),
  update: (id, payload) => api.put(`/announcements/${id}`, payload),
  remove: (id) => api.delete(`/announcements/${id}`),
}

export default announcementService
