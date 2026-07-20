export default function PageLoader() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center gap-3">
      <div className="w-12 h-12 rounded-full border-4 border-primary-100 border-t-primary animate-spin" />
      <p className="text-sm text-ink/60 font-medium">Memuat halaman...</p>
    </div>
  )
}
