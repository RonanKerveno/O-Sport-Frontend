import sportIconMap from '@/utils/sportIconMap';
import { sportNameConvert } from '@/utils/sportNameConvert';
import { useCallback, useEffect, useState } from 'react';

interface SportSearchProps {
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

export default function SportSearch({
  sports, onSelectSport, resetFilter, setResetFilter,
}: SportSearchProps) {
  const [activeSportId, setActiveSportId] = useState<string | null>(null);

  const onSportClick = useCallback((sportId: string) => () => {
    onSelectSport(sportId);
    setActiveSportId(sportId);
  }, [onSelectSport]);

  useEffect(() => {
    if (resetFilter) {
      setActiveSportId(null);
      setResetFilter(false);
    }
  }, [resetFilter, setResetFilter]);

  return (
    <div>
      <div className="flex overflow-x-scroll no-scrollbar no-scrollbar-sports gap-10 mb-12 border-y-4 p-4">
        {sports.map((sport) => {
          const SportIcon = sportIconMap[sportNameConvert(sport.name)] || sportIconMap.Sports;
          const color = sport.id === activeSportId ? '#264b81' : 'black';
          return (
            <div key={sport.id} className="flex flex-col items-center gap-1">
              <button
                type="button"
                onClick={onSportClick(sport.id)}
              >
                <SportIcon size={50} color={color} />
              </button>
              <div className="text-center">
                <div className="text-sm text-slate-800 font-semibold">{sport.name}</div>
                <div className=" text-sm">({sport.count})</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
