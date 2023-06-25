// Page Politique de confidentialité

import Head from 'next/head';
import Link from 'next/link';

export default function PrivacyPolicy() {
  return (
    <>
      <Head>
        <title>Politique de confidentialité - osport</title>
      </Head>
      <section>
        <h1 className="text-2xl font-bold mb-4">Politique de confidentialité</h1>
        <p>
          La présente politique de confidentialité décrit la manière dont les auteurs collectent,
          utilisent et protègent les données personnelles des visiteurs de ce site. Cette politique
          s&#39;applique au présent projet de démonstration réalisé en équipe dans le cadre de la
          formation de l&#39;école&nbsp;
          <a
            href="https://oclock.io/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium underline"
          >
            O&#39;Clock.
          </a>
        </p>
        <p>
          Les auteurs du projet sont présentés dans la page&nbsp;
          <Link href="/a-propos" className="font-medium underline">À Propos</Link>.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">Collecte des données</h2>
        <p>
          Ce site collecte des données personnelles via un formulaire de contact. Les visiteurs
          peuvent fournir leur adresse e-mail pour poser des questions ou faire des demandes.
          Les données collectées sont utilisées uniquement dans le but de répondre aux questions
          et sollicitations des visiteurs.
        </p>
        <p>
          Des données personnelles peuvent également être collectées si un visiteur s&#39;inscrit
          pour tester le projet. Les informations susceptibles d&#39;être fournies incluent les
          noms, prénoms, adresse postale, e-mail, genre, âge et sports favoris. Ces données
          sont enregistrées dans la base de données du site.
          Lors de la connexion, un cookie contenant un jeton d&#39;authentification est généré,
          mais il contient seulement le pseudo, l&#39;ID et le statut administrateur le cas échéant.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">Utilisation des données</h2>
        <p>
          Les données personnelles collectées ne sont pas transmises à des tiers par les auteurs.
          Cependant, pour des raisons techniques, ce site utilise le service EmailJS pour traiter
          les messages envoyés via le formulaire de contact. Vous pouvez consulter la
          politique de confidentialité d&#39;EmailJS&nbsp;
          <a
            href="https://www.emailjs.com/legal/privacy-policy/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium underline"
          >
            ici
          </a>
          .
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">Droits des utilisateurs</h2>
        <p>
          Conformément à la législation en vigueur, notamment le Règlement général sur la protection
          des données (RGPD) de l&#39;Union européenne, les utilisateurs disposent de droits
          concernant leurs données personnelles. Ces droits incluent l&#39;accès à leurs données,
          la modification ou la suppression de celles-ci. Si vous souhaitez exercer ces droits,
          veuillez utiliser le <Link href="/contact" className="font-medium underline">formulaire de contact</Link>
          &nbsp;pour soumettre votre demande.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">Contact</h2>
        <p>
          Si vous avez des questions ou des préoccupations concernant cette politique de
          confidentialité, veuillez utiliser le <Link href="/contact" className="font-medium underline">formulaire de contact</Link> pour
          contacter les auteurs.
        </p>
      </section>
    </>
  );
}
