import api from './api'

const downloadService = {
  list: (params) => api.get('/downloads', { params }),
  create: (formData) => api.post('/downloads', formData, { headers: { 'Content-Type': 'multipart/form-data' } }),
  remove: (id) => api.delete(`/downloads/${id}`),
}

export default downloadService
