import { Search, Plus } from 'lucide-react'
import { SkeletonTableRow } from '../common/Skeleton'
import EmptyState from '../common/EmptyState'
import Pagination from '../common/Pagination'

/**
 * columns: [{ key, label, render?(row) }]
 * data: array of rows
 */
export default function DataTable({
  columns,
  data = [],
  loading,
  search,
  onSearchChange,
  onAdd,
  addLabel = 'Tambah Data',
  filters,
  currentPage,
  lastPage,
  onPageChange,
  emptyTitle = 'Belum ada data',
}) {
  return (
    <div className="card">
      <div className="p-5 flex flex-col sm:flex-row gap-3 sm:items-center justify-between border-b border-primary-50">
        <div className="flex flex-col sm:flex-row gap-3 flex-1">
          {onSearchChange && (
            <div className="relative sm:w-72">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-ink/40" />
              <input className="input-field pl-10" placeholder="Cari..." value={search} onChange={(e) => onSearchChange(e.target.value)} />
            </div>
          )}
          {filters}
        </div>
        {onAdd && (
          <button onClick={onAdd} className="btn-primary shrink-0">
            <Plus className="w-4 h-4" /> {addLabel}
          </button>
        )}
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-primary-50 bg-primary-50/40">
              {columns.map((c) => (
                <th key={c.key} className="text-left px-4 py-3 font-semibold text-ink/60 whitespace-nowrap">{c.label}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-primary-50">
            {loading ? (
              Array.from({ length: 5 }).map((_, i) => <SkeletonTableRow key={i} cols={columns.length} />)
            ) : data.length === 0 ? (
              <tr><td colSpan={columns.length}><EmptyState title={emptyTitle} /></td></tr>
            ) : (
              data.map((row, i) => (
                <tr key={row.id || i} className="hover:bg-primary-50/30 transition">
                  {columns.map((c) => (
                    <td key={c.key} className="px-4 py-3 align-middle">{c.render ? c.render(row) : row[c.key]}</td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {onPageChange && (
        <div className="p-4">
          <Pagination currentPage={currentPage} lastPage={lastPage} onChange={onPageChange} />
        </div>
      )}
    </div>
  )
}
