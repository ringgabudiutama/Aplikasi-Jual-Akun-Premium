import { FileStack, Clock3, MessageSquareWarning, Newspaper, Users } from 'lucide-react'
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'
import StatCard from '../../components/admin/StatCard'
import PageLoader from '../../components/common/PageLoader'
import useFetch from '../../hooks/useFetch'
import dashboardService from '../../services/dashboardService'

export default function Dashboard() {
  const { data: summary, loading } = useFetch(() => dashboardService.summary(), [])
  const { data: requestChart } = useFetch(() => dashboardService.chartRequests(), [])
  const { data: reportChart } = useFetch(() => dashboardService.chartReports(), [])
  const { data: monthlyChart } = useFetch(() => dashboardService.chartMonthly(), [])

  if (loading) return <PageLoader />

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        <StatCard icon={FileStack} label="Surat Hari Ini" value={summary?.requests_today} />
        <StatCard icon={Clock3} label="Surat Diproses" value={summary?.requests_processing} accent="gold" />
        <StatCard icon={MessageSquareWarning} label="Total Laporan" value={summary?.reports_total} />
        <StatCard icon={Newspaper} label="Total Berita" value={summary?.news_total} accent="gold" />
        <StatCard icon={Users} label="Total User" value={summary?.users_total} />
      </div>

      <div className="grid lg:grid-cols-2 gap-5">
        <div className="card p-5">
          <h3 className="font-display font-semibold mb-4">Pengajuan Surat per Status</h3>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={requestChart || []}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E8F3ED" />
              <XAxis dataKey="label" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="total" fill="#1F6E43" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="card p-5">
          <h3 className="font-display font-semibold mb-4">Laporan Masyarakat per Kategori</h3>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={reportChart || []}>
              <CartesianGrid strokeDasharray="3 3" stroke="#FBF3DE" />
              <XAxis dataKey="label" tick={{ fontSize: 11 }} interval={0} angle={-15} textAnchor="end" height={50} />
              <YAxis tick={{ fontSize: 12 }} allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="total" fill="#D4A017" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="card p-5">
        <h3 className="font-display font-semibold mb-4">Tren Bulanan (Surat & Laporan)</h3>
        <ResponsiveContainer width="100%" height={280}>
          <LineChart data={monthlyChart || []}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E8F3ED" />
            <XAxis dataKey="month" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} allowDecimals={false} />
            <Tooltip />
            <Line type="monotone" dataKey="requests" stroke="#1F6E43" strokeWidth={2.5} name="Surat" />
            <Line type="monotone" dataKey="reports" stroke="#D4A017" strokeWidth={2.5} name="Laporan" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
