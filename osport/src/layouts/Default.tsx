import React, { ReactNode } from 'react';
import Header from '../components/Header';
import NavBar from '../components/Navbar';

interface DefaultLayoutProps {
  children: ReactNode;
}

export default function DefaultLayout({ children }: DefaultLayoutProps) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <NavBar />
    </>
  );
}
