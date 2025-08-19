import Link from 'next/link';
import { Twitter, Instagram, Facebook } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#37342C] text-white border-t border-t-transparent">
      <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-headline text-lg font-bold">Emoré Elegance</h3>
            <p className="mt-2 text-sm text-white/80">Quality wear imported from Italy.</p>
          </div>
          <div>
            <h4 className="text-sm font-semibold tracking-wider uppercase">Shop</h4>
            <ul className="mt-4 space-y-2">
              <li><Link href="/men" className="text-sm text-white/80 hover:text-white">Men</Link></li>
              <li><Link href="/women" className="text-sm text-white/80 hover:text-white">Women</Link></li>
              <li><Link href="/accessories" className="text-sm text-white/80 hover:text-white">Accessories</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold tracking-wider uppercase">About</h4>
            <ul className="mt-4 space-y-2">
              <li><Link href="#" className="text-sm text-white/80 hover:text-white">Our Story</Link></li>
              <li><Link href="#" className="text-sm text-white/80 hover:text-white">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold tracking-wider uppercase">Follow Us</h4>
            <div className="flex mt-4 space-x-4">
              <Link href="#" className="text-white/80 hover:text-white"><Twitter size={20} /></Link>
              <Link href="#" className="text-white/80 hover:text-white"><Instagram size={20} /></Link>
              <Link href="#" className="text-white/80 hover:text-white"><Facebook size={20} /></Link>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t border-white/20 pt-8 text-center text-sm text-white/80">
          <p>&copy; {new Date().getFullYear()} Emoré Elegance. All Rights Reserved.</p>
          <div className="mt-2">
            <Link href="/admin" className="text-xs text-white/60 hover:text-white">Admin Panel</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
