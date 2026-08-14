import { AdminSidebar } from "@/components/AdminSidebar";

export default function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-bg md:flex">
      <AdminSidebar />
      <main className="min-w-0 flex-1 px-5 pb-16 pt-16 md:px-8 md:pt-8">{children}</main>
    </div>
  );
}
