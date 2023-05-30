// Fichier racine qui va structurer toutes nos pages.

import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { AuthProvider } from '../contexts/AuthContext';
import { ToastProvider } from '../contexts/ToastContext';
import DefaultLayout from '../layouts/Default';

// Le layout commun à toutes les pages (header/navmenu/footer) est défini ici, il sera appliqué par
// défaut sur chaque page. Le tout est encapsulé dans les fournisseurs de Context (Providers)
export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <ToastProvider>
        <DefaultLayout>
          <Component {...pageProps} />
        </DefaultLayout>
      </ToastProvider>
    </AuthProvider>
  );
}
