'use client';

import Link from 'next/link';
import { ShoppingBag, Menu, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/cart-provider';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useState } from 'react';

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
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

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
        <div className="flex items-center">
            <Link href="/" className="flex flex-col items-start">
                <span className="font-headline text-4xl font-bold tracking-widest">EMORÉ</span>
            </Link>
        </div>

        <div className="flex items-center justify-center flex-1 ml-6">
            <p className="text-xs text-foreground/70 tracking-widest hidden md:block">QUALITY WEAR IMPORTED FROM ITALY</p>
        </div>

        <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon" className="hidden md:inline-flex">
                <Search className="h-6 w-6" />
                <span className="sr-only">Search</span>
            </Button>
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
            <Sheet open={isMobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                    <Menu className="h-6 w-6" />
                    <span className="sr-only">Open menu</span>
                </Button>
                </SheetTrigger>
                <SheetContent side="right">
                <div className="p-6">
                    <Link href="/" className="flex items-center mb-8" onClick={() => setMobileMenuOpen(false)}>
                    <span className="font-headline text-2xl font-bold">Emoré</span>
                    </Link>
                    <NavMenu isMobile />
                </div>
                </SheetContent>
            </Sheet>
        </div>
      </div>
    </header>
  );
}