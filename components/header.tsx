'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Phone } from 'lucide-react';
import { useSession } from 'next-auth/react';

export function Header() {
  const { data: session } = useSession();

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">C</span>
            </div>
            <span className="text-lg font-bold text-primary">
              Cryptic Mobile Detailing
            </span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex space-x-6">
            <Link href="/pricing" className="text-gray-600 hover:text-primary">
              Pricing
            </Link>
            <Link href="/services" className="text-gray-600 hover:text-primary">
              Services
            </Link>
            <Link href="/gallery" className="text-gray-600 hover:text-primary">
              Gallery
            </Link>
            <Link href="/contact" className="text-gray-600 hover:text-primary">
              Contact
            </Link>
            {session?.user?.role === 'ADMIN' && (
              <Link href="/admin" className="text-accent hover:text-accent/80">
                Admin
              </Link>
            )}
          </nav>

          {/* Phone & CTA */}
          <div className="flex items-center space-x-4">
            <a 
              href="tel:706-717-9406"
              className="flex items-center space-x-1 text-gray-600 hover:text-primary"
            >
              <Phone className="h-4 w-4" />
              <span className="hidden sm:block">706-717-9406</span>
            </a>
            <Button asChild className="bg-accent hover:bg-accent/90">
              <Link href="/book">Book Now</Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}