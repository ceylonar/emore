'use client';

import Link from 'next/link';
import { ShoppingBag, User, Menu, X, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/cart-provider';
import { useAuth } from '@/context/auth-provider';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

const navLinks = [
  {
    title: 'MEN',
    href: '/men',
    items: [
      { title: 'Shirts', href: '/men/shirts' },
      { title: 'Trousers', href: '/men/trousers' },
    ]
  },
  {
    title: 'WOMEN',
    href: '/women',
    items: [
      { title: 'Dresses', href: '/women/dresses' },
      { title: 'Sweaters', href: '/women/sweaters' },
    ]
  },
  {
    title: 'ACCESSORIES',
    href: '/accessories',
    items: [
      { title: 'Belts', href: '/accessories/belts' },
      { title: 'Scarves', href: '/accessories/scarves' },
    ]
  },
];


export default function Header() {
  const { cartCount } = useCart();
  const { user, logout } = useAuth();
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const getInitials = (name: string | null | undefined) => {
    if (!name) return 'U';
    return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
  }

  const NavMenu = ({ isMobile = false }: { isMobile?: boolean }) => (
    <nav className={isMobile ? "flex flex-col space-y-4" : "hidden md:flex md:items-center md:space-x-6"}>
      {navLinks.map((link) => (
        <DropdownMenu key={link.title}>
          <DropdownMenuTrigger asChild>
             <Button variant="ghost" className="text-sm font-semibold tracking-wider hover:bg-transparent hover:text-primary/70">
                {link.title}
             </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {link.items.map(item => (
                <DropdownMenuItem key={item.title} asChild>
                    <Link href={item.href}>{item.title}</Link>
                </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      ))}
    </nav>
  );

  return (
    <header className="bg-background/80 backdrop-blur-md sticky top-0 z-40 w-full border-b">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-20">
        
        <div className="md:hidden">
          <Sheet open={isMobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <div className="p-6">
                <Link href="/" className="flex items-center mb-8" onClick={() => setMobileMenuOpen(false)}>
                  <span className="font-headline text-2xl font-bold">Emoré</span>
                </Link>
                <NavMenu isMobile />
              </div>
            </SheetContent>
          </Sheet>
        </div>

        <div className="flex-1 md:flex-none flex justify-center md:justify-start">
          <Link href="/" className="flex flex-col items-center">
            <span className="font-headline text-3xl font-bold tracking-widest">EMORÉ</span>
            <span className="text-xs text-foreground/70 tracking-widest mt-1">QUALITY WEAR IMPORTED FROM ITALY</span>
          </Link>
        </div>
        
        <div className="hidden md:flex flex-1 justify-center">
            <NavMenu />
        </div>

        <div className="flex items-center space-x-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                 <Button variant="ghost" size="icon">
                  {user ? (
                     <Avatar className="h-8 w-8">
                      <AvatarImage src={user.photoURL || undefined} alt={user.displayName || 'User'} />
                      <AvatarFallback>{getInitials(user.displayName)}</AvatarFallback>
                    </Avatar>
                  ) : (
                    <User className="h-6 w-6" />
                  )}
                  <span className="sr-only">Account</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {user ? (
                  <>
                    <DropdownMenuItem disabled>
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">{user.displayName || 'User'}</p>
                        <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
                      </div>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onSelect={() => logout()}>
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Log out</span>
                    </DropdownMenuItem>
                  </>
                ) : (
                   <>
                    <DropdownMenuItem asChild>
                        <Link href="/login">Login</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                        <Link href="/signup">Sign Up</Link>
                    </DropdownMenuItem>
                   </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>

          <Button variant="ghost" size="icon" asChild>
            <Link href="/cart" className="relative">
              <ShoppingBag className="h-6 w-6" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs">
                  {cartCount}
                </span>
              )}
              <span className="sr-only">Cart</span>
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
