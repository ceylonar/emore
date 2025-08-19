'use client';

import { useAuth } from '@/context/auth-provider';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import AdminDashboardLayout from '@/components/admin/layout/admin-dashboard-layout';
import { Skeleton } from '@/components/ui/skeleton';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAdmin, loading, user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !isAdmin) {
      router.push('/login');
    }
  }, [isAdmin, loading, router]);

  if (loading || !isAdmin) {
    return (
        <div className="p-8">
            <Skeleton className="h-screen w-full"/>
        </div>
    )
  }

  return <AdminDashboardLayout>{children}</AdminDashboardLayout>;
}
