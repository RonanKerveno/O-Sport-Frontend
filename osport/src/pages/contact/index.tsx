import ContactForm from '../../components/ContactForm';

// Page contact
export default function Contact() {
  return (

    <section className="px-4">
      <h1 className="text-2xl font-bold mb-7">Nous contacter</h1>
      <p className="mb-10">
        Si vous avez des questions, des remarques sur notre démo ou autre,
        veuillez utiliser le formulaire ci-dessous.
      </p>
      {/* Appel au composant de formulaire de contact */}
      <ContactForm />
    </section>
  );
}
