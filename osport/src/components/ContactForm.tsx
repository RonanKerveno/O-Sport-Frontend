import {
  FormEvent, ChangeEvent, useRef, useState,
} from 'react';
import emailjs from '@emailjs/browser';
import Link from 'next/link';

// Formulaire de contact.
export default function ContactForm() {
  const form = useRef<HTMLFormElement>(null);

  // State des erreurs de formatage de l'adresse email (boolean)
  const [emailError, setEmailError] = useState(false);
  // State gérant le statut de l'envoi du mail (success/error)
  const [formStatus, setFormStatus] = useState<null | 'success' | 'error'>(null);
  // State gérant l'acceptation de la politique de condentialité (boolean)
  const [privacyPolicyChecked, setPrivacyPolicyChecked] = useState(false);
  // State gérant la désactivation du bouton d'envoi (boolean)
  const [submitDisabled, setSubmitDisabled] = useState(false);

  // Gestion de l'input email, contrôle de validité.
  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmailError(!e.target.validity.valid);
  };

  // Reset du formulaire
  const resetForm = (delay = 0) => {
    // Désactivation immédiate du bouton d'envoi le temps du timeout.
    setSubmitDisabled(true);
    // Reset des autres états après timeout défini.
    setTimeout(() => {
      setEmailError(false);
      setFormStatus(null);
      setPrivacyPolicyChecked(false);
      form.current?.reset();
      // Réactivation du bouton d'envoi
      setSubmitDisabled(false);
    }, delay);
  };

  // Fonction d'envoi de l'email
  const sendEmail = (e: FormEvent) => {
    e.preventDefault();

    // reportValidity() est une méthode native de l'API Web HTML5 pour les formulaires.
    // Si le formulaire est invalide ou si la politique de confidentialité n'est pas acceptée
    // on quitte de la fonction.
    if (!form.current?.reportValidity() || !privacyPolicyChecked) {
      return;
    }

    // On appelle la méthode emailjs pour envoyer notre email, avec les variables d'environnement.
    emailjs.sendForm(
      process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID as string,
      process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID as string,
      form.current,
      process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY as string,
    )
      .then(() => {
        setFormStatus('success');
        // Ajout d'un délai avant de réinitialiser le formulaire
        resetForm(7000);
      }, () => {
        setFormStatus('error');
      });
  };

  // Affichage du formulaire ce contact
  return (
    <form ref={form} onSubmit={sendEmail} className="bg-slate-300 text-slate-700 p-6 lg:p-8 rounded-md">
      {formStatus === 'success' && (
        <div className="bg-green-500 p-4 rounded-md mb-4">
          Votre message a été envoyé avec succès.
        </div>
      )}
      {formStatus === 'error' && (
        <div className="bg-red-500 p-4 rounded-md mb-4">
          Une erreur est survenue lors de l&#39;envoi de votre message.
        </div>
      )}
      <div className="mb-4">
        <label htmlFor="user_name" className="block mb-2">Nom (obligatoire)
          <input type="text" name="user_name" id="user_name" required className="w-full p-2 bg-white text-black rounded-md" />
        </label>
      </div>
      <div className="mb-4">
        <label htmlFor="user_email" className="block mb-2">Email (obligatoire)
          <input
            type="email"
            name="user_email"
            id="user_email"
            required
            className={`w-full p-2 bg-white text-black rounded-md ${emailError ? 'border border-red-500' : ''}`}
            onChange={handleEmailChange}
          />
        </label>
        {emailError && <div className="text-red-500 text-sm">Veuillez saisir un email valide.</div>}
      </div>
      <div className="mb-4">
        <label htmlFor="message" className="block mb-2">Message (obligatoire)
          <textarea name="message" id="message" rows={4} required className="w-full p-2 bg-white text-black rounded-md" />
        </label>
      </div>
      <div className="mb-4">
        <label htmlFor="policy_check" className="inline-flex items-center">
          <input
            type="checkbox"
            className="form-checkbox text-slate-900"
            checked={privacyPolicyChecked}
            onChange={() => setPrivacyPolicyChecked(!privacyPolicyChecked)}
          />
          <span className="ml-2">
            J&#39;ai lu et accepté la{' '}
            <Link href="/" className="text-slate-900 underline">
              politique de confidentialité
            </Link>
          </span>
        </label>
      </div>
      <div className="text-right">
        <input
          type="submit"
          value="Envoi"
          className={`py-1 px-4 rounded-md cursor-pointer transition ease-in-out duration-150 ${!submitDisabled && privacyPolicyChecked ? 'bg-white text-slate-900 hover:bg-slate-100 hover:text-slate-800 active:bg-slate-700' : 'bg-slate-300 text-slate-600 cursor-not-allowed'}`}
          disabled={!privacyPolicyChecked || submitDisabled}
        />

      </div>

    </form>
  );
}
