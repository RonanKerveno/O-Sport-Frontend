import Card from './Card';

export default function Cards() {
  const cardIds = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]; // Liste des IDs des cards à afficher
  return (

    <div className="flex flex-row flex-wrap justify-center space-x-4 space-y-0 overflow-auto h-100">
      {cardIds.map((id) => (
        <Card key={id} id={id} />
      ))}
    </div>
  );
}
