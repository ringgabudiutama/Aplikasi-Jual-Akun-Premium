import api from './api'

const faqService = {
  list: () => api.get('/faqs'),
  create: (payload) => api.post('/faqs', payload),
  update: (id, payload) => api.put(`/faqs/${id}`, payload),
  remove: (id) => api.delete(`/faqs/${id}`),
}

export default faqService
