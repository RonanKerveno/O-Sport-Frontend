import React, { ReactNode } from 'react';
import Header from '../components/Header';
import NavBar from '../components/Navbar';

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
    </>
  );
}
