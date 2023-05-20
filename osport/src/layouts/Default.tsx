// Structure générale/squelette des pages du site

import React, { ReactNode } from 'react';
import { useMediaQuery } from 'usehooks-ts';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from '@/components/Footer';
import Header from '../components/Header';
import NavBar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

// Typage TypeScript
interface DefaultLayoutProps {
  children: ReactNode;
}

// Définition de la structure avec les composants qui seront toujours présents.
export default function DefaultLayout({ children }: DefaultLayoutProps) {
  const isMobile = useMediaQuery('(max-width: 768px)');
  return (
    <div className="flex flex-row">
      {isMobile ? (
        <>
          <NavBar />
          <div>
            <Header />
            <main>{children} <Footer /></main>
          </div>
        </>
      ) : (
        <>
          <Sidebar />

          <main>{children}<Footer /></main>
        </>
      )}
      {/* Définition des notifications react-toastify */}
      <ToastContainer autoClose={1000} />
    </div>
  );
}
