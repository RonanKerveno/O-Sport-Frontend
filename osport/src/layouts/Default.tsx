// Structure générale/squelette des pages du site

import React, { ReactNode } from 'react';
import Header from '@/components/Header';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

interface DefaultLayoutProps {
  children: ReactNode;
}

export default function DefaultLayout({ children }: DefaultLayoutProps) {
  return (
    // Classes pour permettre le Sticky footer
    <div className="flex flex-col min-h-screen">
      <Header />
      {/* Classe flex pour permettre le Sticky footer */}
      <main className="flex-grow mb-20">{children}</main>
      <Navbar />
      <Footer />
    </div>
  );
}
