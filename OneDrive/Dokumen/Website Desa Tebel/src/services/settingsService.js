import api from './api'

const settingsService = {
  get: () => api.get('/settings'),
  update: (payload) => api.put('/settings', payload),
}

export default settingsService
