import * as React from 'react';
import { SidebarProvider, Sidebar, SidebarTrigger, SidebarInset } from '@/components/ui/sidebar';
import AdminSidebarContent from './admin-sidebar-content';

export default function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <Sidebar>
        <AdminSidebarContent />
      </Sidebar>
      <SidebarInset>
         <header className="p-4 border-b flex items-center gap-4">
            <SidebarTrigger />
            <h1 className="text-xl font-semibold">Admin Dashboard</h1>
        </header>
        <main className="p-4 md:p-6 lg:p-8">
            {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
