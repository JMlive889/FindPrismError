import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Chatbot } from '@/components/chatbot';
import { Providers } from './providers';
import { Toaster } from '@/components/ui/toaster';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Cryptic Mobile Detailing | Conyers, GA',
  description: 'Premium one-time detail or monthly plan with transparent pricing. Add-ons for interior deep clean, exterior sealant, engine bay, upholstery. Book online.',
  keywords: 'mobile detailing, car detailing, Conyers GA, Metro Atlanta, auto detailing, car wash, ceramic coating',
  openGraph: {
    title: 'Cryptic Mobile Detailing | Conyers, GA',
    description: 'Factory-new finish, at your door. Professional mobile detailing serving Conyers, GA and Metro Atlanta.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
            <Chatbot />
            <Toaster />
          </div>
        </Providers>
      </body>
    </html>
  );
}