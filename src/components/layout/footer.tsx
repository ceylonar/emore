import Link from 'next/link';
import { Twitter, Instagram, Facebook } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-secondary/50 border-t">
      <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-headline text-lg font-bold">Emoré Elegance</h3>
            <p className="mt-2 text-sm text-muted-foreground">Quality wear imported from Italy.</p>
          </div>
          <div>
            <h4 className="text-sm font-semibold tracking-wider uppercase">Shop</h4>
            <ul className="mt-4 space-y-2">
              <li><Link href="/men" className="text-sm text-muted-foreground hover:text-primary">Men</Link></li>
              <li><Link href="/women" className="text-sm text-muted-foreground hover:text-primary">Women</Link></li>
              <li><Link href="/accessories" className="text-sm text-muted-foreground hover:text-primary">Accessories</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold tracking-wider uppercase">About</h4>
            <ul className="mt-4 space-y-2">
              <li><Link href="#" className="text-sm text-muted-foreground hover:text-primary">Our Story</Link></li>
              <li><Link href="#" className="text-sm text-muted-foreground hover:text-primary">Contact</Link></li>
              <li><Link href="/superadmin-login" className="text-sm text-muted-foreground hover:text-primary">Admin</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold tracking-wider uppercase">Follow Us</h4>
            <div className="flex mt-4 space-x-4">
              <Link href="#" className="text-muted-foreground hover:text-primary"><Twitter size={20} /></Link>
              <Link href="#" className="text-muted-foreground hover:text-primary"><Instagram size={20} /></Link>
              <Link href="#" className="text-muted-foreground hover:text-primary"><Facebook size={20} /></Link>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Emoré Elegance. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}
