// Composant En-tête

import Link from 'next/link';

export default function Header() {
  return (
    <div>
      <div className="text-[#b430a6] text-2xl font-sans font-bold text-center mt-6 mb-6">
        <Link href="/"><h1> O&#39;Sport </h1></Link>
      </div>
    </div>
  );
}
