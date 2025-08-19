'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Package, Image as ImageIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

const navLinks = [
  { href: '/admin', label: 'Dashboard', icon: Home },
  { href: '/admin/products', label: 'Products', icon: Package },
  { href: '/admin/banners', label: 'Hero Banners', icon: ImageIcon },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-background border-r flex-shrink-0 hidden md:block">
      <div className="flex flex-col h-full">
        <div className="p-6">
          <Link href="/" className="flex flex-col items-start">
             <span className="font-headline text-2xl font-bold tracking-widest">EMORÉ</span>
             <span className="text-xs tracking-widest">ADMIN</span>
          </Link>
        </div>
        <nav className="flex-grow px-4">
          <ul>
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={cn(
                      'flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary',
                      isActive && 'bg-muted text-primary'
                    )}
                  >
                    <link.icon className="h-4 w-4" />
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </aside>
  );
}
