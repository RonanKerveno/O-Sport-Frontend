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
    <>
      <Header />
      <main className="mb-20">{children}</main>
      <Navbar />
      <Footer />
    </>
  );
}
