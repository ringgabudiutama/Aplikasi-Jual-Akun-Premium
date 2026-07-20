import api from './api'

const reportService = {
  submit: (formData) => api.post('/report', formData, { headers: { 'Content-Type': 'multipart/form-data' } }),
  checkStatus: (params) => api.get('/report/check', { params }),
  myReports: () => api.get('/report/mine'),

  // Admin
  list: (params) => api.get('/report', { params }),
  detail: (id) => api.get(`/report/${id}`),
  updateStatus: (id, payload) => api.put(`/report/${id}/status`, payload),
}

export default reportService
