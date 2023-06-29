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
    <div className="flex flex-col lg:flex-row">
      <div className="sticky top-0 z-50">
        <Header />
      </div>
      {/* Classe flex pour permettre le Sticky footer */}
      <div className="flex flex-col min-h-screen w-full overflow-x-hidden">
        <main className="flex-grow mb-20">{children}</main>
        <div className="lg:hidden">
          <Navbar />
        </div>
        <Footer />
      </div>
    </div>
  );
}
