// Composant de filtrage des événements par sport.

import sportIconMap from '@/utils/sportIconMap';
import { sportNameConvert } from '@/utils/sportNameConvert';
import { useCallback, useEffect, useState } from 'react';

// Typage des props
interface SportFilterProps {
  sports: {
    id: string;
    name: string;
    count?: number;
  }[];
  // eslint-disable-next-line no-unused-vars
  onSelectSport: (sportId: string) => void;
  resetFilter: boolean;
  // eslint-disable-next-line no-unused-vars
  setResetFilter: (value: boolean) => void;
}

export default function SportFilter({
  sports, onSelectSport, resetFilter, setResetFilter,
}: SportFilterProps) {
  // State gérant l'ID du sport séléctionné
  const [activeSportId, setActiveSportId] = useState<string | null>(null);

  // Fonction gérant les actions liées au clic sur un sport.
  const onSportClick = useCallback((sportId: string) => () => {
    // Déclenchement de la fonction onSelectSport coté composant parent.
    onSelectSport(sportId);
    // On passe l'ID au State activeSportId.
    setActiveSportId(sportId);
  }, [onSelectSport]);

  // useEffect gérant les actions liées au reset du filtre.
  useEffect(() => {
    if (resetFilter) {
      // Remise les valeurs par défaut des States.
      setActiveSportId(null);
      setResetFilter(false);
    }
  }, [resetFilter, setResetFilter]);

  return (
    <div>
      <div className="flex overflow-x-scroll no-scrollbar no-scrollbar-sports gap-10 mb-12 border-y-4 p-4">
        {sports.map((sport) => {
          // Récupération de l'icône correspondant au sport séléctionné
          const SportIcon = sportIconMap[sportNameConvert(sport.name)] || sportIconMap.Sports;
          // Ajustement de la couleur de l'icône et du texte du sport séléctionné.
          const color = sport.id === activeSportId ? '#264b81' : 'black';
          const textColorClass = sport.id === activeSportId ? 'text-[#264b81]' : 'text-slate-800';
          return (
            <div key={sport.id}>
              <button
                type="button"
                onClick={onSportClick(sport.id)}
                className="flex flex-col items-center gap-1"
              >
                <SportIcon size={50} color={color} />

                <div className={`text-center ${textColorClass}`}>
                  <div className="text-sm font-semibold">{sport.name}</div>
                  <div className=" text-sm">({sport.count})</div>
                </div>
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
