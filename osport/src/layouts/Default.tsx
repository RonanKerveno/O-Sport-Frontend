// Structure générale/squelette des pages du site

import React, { ReactNode } from 'react';
import { useMediaQuery } from 'usehooks-ts';
import 'react-toastify/dist/ReactToastify.css';
import Header from '../components/Header';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';

interface DefaultLayoutProps {
  children: ReactNode;
}

export default function DefaultLayout({ children }: DefaultLayoutProps) {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const isTablet = useMediaQuery('(min-width: 320px, max-width: 768px)');
  return (
    <div>
      {isMobile || isTablet ? (
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow">{children}</main>
          <Footer />
          <Navbar />
        </div>
      ) : (
        <div className="flex bg-slate-100">
          <Sidebar />
          <div className="flex flex-col">
            <main className="flex-grow align h-full">{children}</main>
            <Footer />
          </div>
        </div>
      )}
    </div>
  );
}
