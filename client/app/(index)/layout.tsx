"use client";
import React from "react";
import Navbar from '@/components/index/navbar';
import { Footer } from "@/components/index/footer";
import { useState, useEffect } from "react";
import { ProjectLoader } from "@/components/loaders/project-loader";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {

   const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Simulate initial loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);
  
  return <>

      {isLoading ? (
        <ProjectLoader message="Welcome to CareerEdge" />
      ) : (
        <>
          <Navbar />
          {children}
          <Footer />
        </>
      )}
  </>;
}