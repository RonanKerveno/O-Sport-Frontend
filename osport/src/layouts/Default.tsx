/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
/* eslint-disable import/no-extraneous-dependencies */
import React, { ReactNode } from 'react';
import { useMediaQuery } from 'usehooks-ts';
import Header from '../components/Header';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';

interface DefaultLayoutProps {
  children: ReactNode;
}

// Définition de la structure des pages par défaut.
export default function DefaultLayout({ children }: DefaultLayoutProps) {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const isTablet = useMediaQuery('(min-width: 320px, max-width: 768px)');
  return (
    <div className="flex flex-row w-screen h-screen bg-slate-100">
      {isMobile || isTablet ? (
        <div>
          <Header />
          <main>{children}</main>
          <Navbar />
          <Footer />
        </div>
      ) : (
        <div className="flex flex-row w-screen h-screen bg-slate-100">
          <Sidebar />
          <div className="flex flex-col"><main>{children}</main>
            <Footer />
          </div>
        </div>
      )}
    </div>
  );
}
