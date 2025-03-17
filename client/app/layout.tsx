"use client";

import './globals.css';
import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Roboto } from 'next/font/google';
import { ProjectLoader } from '@/components/loaders/project-loader';

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
 

  return (
    <html lang="en" suppressHydrationWarning className={roboto.variable}>
      <body suppressHydrationWarning className="font-roboto">
        <AnimatePresence mode="wait">          
          {children}          
        </AnimatePresence>
      </body>
    </html>
  );
}