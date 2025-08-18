import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Footer from '@/components/footer';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_UI_URL!),
  title: 'Example',
  description: 'Documentation tools and utilities for Munir Mardinli\'s projects',
}

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.className}`}>
      <body className="antialiased tracking-tight">
        <div className="min-h-screen flex flex-col justify-between pt-0 md:pt-8 p-8 dark:bg-zinc-950 bg-white text-gray-900 dark:text-zinc-200">
          <main className="max-w-[60ch] mx-auto w-full space-y-6">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  )
}
