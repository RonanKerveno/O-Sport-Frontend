import React, { ReactNode } from 'react';
import Header from '../components/Header';
import NavBar from '../components/Navbar';
import Footer from '../components/Footer';

interface DefaultLayoutProps {
  children: ReactNode;
}

// Définition de la structure des pages par défaut.
export default function DefaultLayout({ children }: DefaultLayoutProps) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <NavBar />
      <Footer />
    </>
  );
}
