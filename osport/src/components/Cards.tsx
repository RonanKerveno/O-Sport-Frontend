import Card from './Card';

export default function Cards() {
  const cardIds = [1, 2, 3, 4, 5]; // Liste des IDs des cards à afficher
  return (

    <div className="flex flex-row flex-wrap justify-center space-x-4 overflow-x-scroll w-screen h-72">
      {cardIds.map((id) => (
        <Card key={id} id={id} />
      ))}
    </div>
  );
}
