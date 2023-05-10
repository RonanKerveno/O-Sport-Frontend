import '../styles/globals.css';
import type { AppProps } from 'next/app';
import DefaultLayout from '../layouts/Default';

// Fichier racine qui va structurer toutes nos pages.
// Le layout commun à toutes les pages (header/navmenu/footer) est défini ici
// Il sera appliqué par défaut sur chaque page.
export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <DefaultLayout>
      <Component {...pageProps} />
    </DefaultLayout>
  );
}
