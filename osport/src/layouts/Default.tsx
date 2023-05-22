/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
/* eslint-disable import/no-extraneous-dependencies */
import React, { ReactNode } from 'react';
import { useMediaQuery } from 'usehooks-ts';
import Header from '../components/Header';
import NavBar from '../components/navbar';
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
    </div>
  );
}
