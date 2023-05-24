// Structure générale/squelette des pages du site

import React, { ReactNode } from 'react';
import { useMediaQuery } from 'usehooks-ts';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from '../components/Header';
import NavBar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';

// Typage TypeScript
interface DefaultLayoutProps {
  children: ReactNode;
}

// Définition de la structure avec les composants qui seront toujours présents.
export default function DefaultLayout({ children }: DefaultLayoutProps) {
  const isMobile = useMediaQuery('(max-width: 768px)');
  return (
    <div className="flex flex-col justify-center">
      {isMobile ? (
        <div>
          <Header />
          <main>{children} </main>
          <NavBar />
        </div>
      ) : (
        <div className="flex flex-row">
          <Sidebar />
          <main>{children}</main>
        </div>
      )}
      <div className="flex justify-center">
        <Footer />
      </div>
      {/* Définition des notifications react-toastify */}
      <ToastContainer autoClose={1000} />
    </div>
  );
}
