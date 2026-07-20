import api from './api'

const serviceRequestService = {
  // Public: submit a new surat request
  submit: (formData) =>
    api.post('/service-request', formData, { headers: { 'Content-Type': 'multipart/form-data' } }),
  // Public: check status by tracking number or NIK
  checkStatus: (params) => api.get('/service-request/check', { params }),
  // Public: reference data
  types: () => api.get('/service-request/types'),
  requirements: (type) => api.get(`/service-request/requirements/${type}`),

  // Authenticated user: my requests
  myRequests: () => api.get('/service-request/mine'),

  // Admin
  list: (params) => api.get('/service-request', { params }),
  detail: (id) => api.get(`/service-request/${id}`),
  updateStatus: (id, payload) => api.put(`/service-request/${id}/status`, payload),
  print: (id) => api.get(`/service-request/${id}/print`, { responseType: 'blob' }),
}

export default serviceRequestService
