import api from './api'

const newsService = {
  list: (params) => api.get('/news', { params }),
  detail: (slug) => api.get(`/news/${slug}`),
  categories: () => api.get('/news/categories'),
  // Admin
  create: (formData) => api.post('/news', formData, { headers: { 'Content-Type': 'multipart/form-data' } }),
  update: (id, formData) => api.post(`/news/${id}?_method=PUT`, formData, { headers: { 'Content-Type': 'multipart/form-data' } }),
  remove: (id) => api.delete(`/news/${id}`),
}

export default newsService
