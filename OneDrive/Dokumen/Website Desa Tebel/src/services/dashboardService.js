import api from './api'

const dashboardService = {
  summary: () => api.get('/dashboard/summary'),
  chartRequests: (params) => api.get('/dashboard/chart/requests', { params }),
  chartReports: (params) => api.get('/dashboard/chart/reports', { params }),
  chartMonthly: (params) => api.get('/dashboard/chart/monthly', { params }),
  activityLogs: (params) => api.get('/dashboard/activity-logs', { params }),
}

export default dashboardService
