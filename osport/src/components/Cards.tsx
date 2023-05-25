import { useMediaQuery } from 'usehooks-ts';
import Card from './Card';

export default function Cards() {
  const cardIds = [1, 2, 3, 4, 5, 6, 7, 8]; // Liste des IDs des cards à afficher
  const isMobile = useMediaQuery('(max-width: 768px)');
  return (
    <div>
      {isMobile ? (
        <div className="mb-5 mt-5 grid gap-y-10 gap-x-6 md:grid-cols-2">
          {cardIds.map((id) => (
            <Card key={id} />
          ))}
        </div>
      ) : (
        <div className="mt-4 grid gap-y-10 gap-x-6 grid-cols-4">
          {cardIds.map((id) => (
            <Card key={id} />
          ))}
        </div>
      )}
    </div>
  );
}
