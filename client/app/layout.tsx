"use client";

import './globals.css';
import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Roboto } from 'next/font/google';
import { LoadingScreen } from '@/components/ui/loading-screen';

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto',
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate initial loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <html lang="en" suppressHydrationWarning className={roboto.variable}>
      <body suppressHydrationWarning className="font-roboto">
        <AnimatePresence mode="wait">
          {isLoading ? (
            <LoadingScreen message="Welcome to CareerEdge" />
          ) : (
            children
          )}
        </AnimatePresence>
      </body>
    </html>
  );
}