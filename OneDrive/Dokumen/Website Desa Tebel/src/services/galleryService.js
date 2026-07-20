import api from './api'

const galleryService = {
  list: (params) => api.get('/gallery', { params }),
  create: (formData) => api.post('/gallery', formData, { headers: { 'Content-Type': 'multipart/form-data' } }),
  remove: (id) => api.delete(`/gallery/${id}`),
}

const bannerService = {
  list: () => api.get('/banners'),
  create: (formData) => api.post('/banners', formData, { headers: { 'Content-Type': 'multipart/form-data' } }),
  update: (id, formData) => api.post(`/banners/${id}?_method=PUT`, formData, { headers: { 'Content-Type': 'multipart/form-data' } }),
  remove: (id) => api.delete(`/banners/${id}`),
}

const agendaService = {
  list: (params) => api.get('/agenda', { params }),
  create: (payload) => api.post('/agenda', payload),
  update: (id, payload) => api.put(`/agenda/${id}`, payload),
  remove: (id) => api.delete(`/agenda/${id}`),
}

export { galleryService, bannerService, agendaService }
export default galleryService
