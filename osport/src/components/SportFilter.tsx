// Composant de filtrage des événements par sport.

import sportIconMap from '@/utils/sportIconMap';
import { sportNameConvert } from '@/utils/sportNameConvert';
import {
  useCallback, useEffect, useRef, useState,
} from 'react';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';

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

  // Gestion du scroll de la liste via les boutons latéraux

  // Création de la référence pour le conteneur scrollable
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Fonctions pour gérer le défilement
  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -100, // déterminer la quantité à défiler
        behavior: 'smooth',
      });
    }
  };
  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: 100, // déterminer la quantité à défiler
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="flex justify-around items-center mb-12 bg-slate-300 shadow-md rounded-md">
      <div className="flex justify-center">
        <FaAngleLeft size={42} onClick={scrollLeft} />
      </div>
      <div
        className="flex items-center w-11/12 bg-slate-100 overflow-x-scroll max-lg:no-scrollbar-sports lg:scrollbar-sport gap-10 p-4 border-2"
        ref={scrollContainerRef}
      >
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
                className="flex flex-col items-center gap-1 w-14 hover:scale-110 transition-transform duration-200"
              >
                <SportIcon size={50} color={color} />

                <div className={`text-center ${textColorClass}`}>
                  <div className="text-sm font-semibold line-clamp-1">{sport.name}</div>
                  <div className=" text-sm">({sport.count})</div>
                </div>
              </button>
            </div>
          );
        })}
      </div>
      <div className="flex justify-center">
        <FaAngleRight size={42} onClick={scrollRight} />
      </div>
    </div>
  );
}
