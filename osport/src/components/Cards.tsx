import { useMediaQuery } from 'usehooks-ts';
import Card from './Card';

export default function Cards() {
  const cardIds = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]; // Liste des IDs des cards à afficher
  const isMobile = useMediaQuery('(max-width: 768px)');
  return (
    <div>
      {isMobile ? (
        <div className="flex flex-wrap justify-center space-x-1 overflow-x-auto h-72">
          {cardIds.map((id) => (
            <Card key={id} />
          ))}
        </div>
      ) : (
        <div className="flex flex-row flex-wrap justify-center space-x-1 space-y-0 overflow-auto h-100">
          {cardIds.map((id) => (
            <Card key={id} />
          ))}
        </div>
      )}
    </div>
  );
}
