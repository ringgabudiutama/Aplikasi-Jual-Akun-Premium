import api from './api'

const profileService = {
  get: () => api.get('/profile'),
  // Always sent as POST + _method=PUT: PHP does not populate $_FILES for
  // real PUT requests (even multipart), so file uploads (structure_image)
  // must use the method-spoofing pattern like the other upload endpoints.
  update: (payload) => {
    const isFormData = payload instanceof FormData
    if (isFormData) {
      return api.post('/profile?_method=PUT', payload, { headers: { 'Content-Type': 'multipart/form-data' } })
    }
    return api.put('/profile', payload)
  },
  officials: () => api.get('/profile/officials'),
  updateOfficials: (payload) => api.put('/profile/officials', payload),
}

export default profileService
