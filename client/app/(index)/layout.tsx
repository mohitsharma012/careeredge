import React from "react";
import Navbar from '@/components/index/navbar';
import { Footer } from "@/components/index/footer";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>
    <Navbar />
    {children}
    <Footer />
  </>;
}