'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Package, Image as ImageIcon, ExternalLink, Settings, ShoppingCart } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Separator } from '@/components/ui/separator';
import NextImage from 'next/image';

const navLinks = [
  { href: '/admin', label: 'Dashboard', icon: Home },
  { href: '/admin/orders', label: 'Orders', icon: ShoppingCart },
  { href: '/admin/products', label: 'Products', icon: Package },
  { href: '/admin/banners', label: 'Hero Banners', icon: ImageIcon },
  { href: '/admin/settings', label: 'Settings', icon: Settings },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-background border-r flex-shrink-0 hidden md:block">
      <div className="flex flex-col h-full">
        <div className="p-6">
          <Link href="/" className="flex flex-col items-start">
             <NextImage src="https://i.postimg.cc/yYBsYNbW/Screenshot-2025-08-19-184759.png" alt="Emoré Elegance Logo" width={140} height={40} />
             <span className="text-xs tracking-widest -mt-1">ADMIN</span>
          </Link>
        </div>
        <nav className="flex-grow px-4">
          <ul>
            {navLinks.map((link) => {
              const isActive = pathname.startsWith(link.href) && (link.href !== '/admin' || pathname === '/admin');
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
        <div className="mt-auto p-4">
            <Separator className="my-4" />
            <Link href="/"
                className={cn(
                    'flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary'
                )}
                target="_blank"
                >
                <ExternalLink className="h-4 w-4" />
                View Store
            </Link>
        </div>
      </div>
    </aside>
  );
}
