// Fichier racine qui va structurer toutes nos pages.

import '../styles/globals.css';
import 'react-toastify/dist/ReactToastify.css';
import { Inter } from 'next/font/google';
import type { AppProps } from 'next/app';
import { useEffect } from 'react';
import Modal from 'react-modal';
import Head from 'next/head';
import { AuthProvider } from '../contexts/AuthContext';
import { ToastProvider } from '../contexts/ToastContext';
import DefaultLayout from '../layouts/Default';

const inter = Inter({ subsets: ['latin'] });

// Le layout commun à toutes les pages (header/navmenu/footer) est défini ici, il sera appliqué par
// défaut sur chaque page. Le tout est encapsulé dans les fournisseurs de Context (Providers)
export default function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    Modal.setAppElement('#__next');
  }, []);
  return (
    <>
      <style jsx global>{`
        html {
          font-family: ${inter.style.fontFamily};
        }
      `}
      </style>
      <Head>
        <link rel="icon" href="/favicon.png" />
      </Head>
      <AuthProvider>
        <ToastProvider>
          <DefaultLayout>
            <Component {...pageProps} />
          </DefaultLayout>
        </ToastProvider>
      </AuthProvider>
    </>
  );
}
