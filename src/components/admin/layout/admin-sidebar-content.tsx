'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarContent, SidebarGroup, SidebarGroupLabel } from '@/components/ui/sidebar';
import { LayoutDashboard, Package, Settings, LogOut } from 'lucide-react';
import { useAuth } from '@/context/auth-provider';

export default function AdminSidebarContent() {
  const pathname = usePathname();
  const { logout } = useAuth();
  return (
    <>
        <SidebarHeader>
            <div className="flex items-center gap-2 p-2">
                <Link href="/" className="font-headline text-2xl font-bold">Emoré</Link>
            </div>
        </SidebarHeader>
        <SidebarContent>
            <SidebarGroup>
                <SidebarGroupLabel>Main Menu</SidebarGroupLabel>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton asChild isActive={pathname === '/admin'}>
                            <Link href="/admin">
                                <LayoutDashboard/>
                                <span>Dashboard</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                        <SidebarMenuButton asChild isActive={pathname.startsWith('/admin/inventory')}>
                             <Link href="/admin/inventory">
                                <Package/>
                                <span>Inventory</span>
                             </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                     <SidebarMenuItem>
                        <SidebarMenuButton asChild isActive={pathname.startsWith('/admin/settings')}>
                             <Link href="/admin/settings">
                                <Settings/>
                                <span>Settings</span>
                             </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarGroup>
        </SidebarContent>
    </>
  );
}
