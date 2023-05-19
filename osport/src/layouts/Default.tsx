import React, { ReactNode } from 'react';
import { useMediaQuery } from 'usehooks-ts';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from '@/components/Footer';
import Header from '../components/Header';
import NavBar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

interface DefaultLayoutProps {
  children: ReactNode;
}

// Définition de la structure des pages par défaut.
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
      <ToastContainer autoClose={3000} />
    </div>
  );
}
