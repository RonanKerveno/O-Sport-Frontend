import { SportsListData } from '@/types';
import sportIconMap from '@/utils/sportIconMap';
import { sportNameConvert } from '@/utils/sportNameConvert';
import Link from 'next/link';
import { useCallback } from 'react';
import { useMediaQuery } from 'usehooks-ts';

interface SportSearchProps {
  sports: SportsListData;
  // eslint-disable-next-line no-unused-vars
  onSelectSport: (sportId: string) => void;
}

export default function SportSearch({ sports, onSelectSport }: SportSearchProps) {
  const isMobile = useMediaQuery('(max-width: 768px)');

  const onSportClick = useCallback((sportId: string) => () => {
    onSelectSport(sportId);
  }, [onSelectSport]);

  return (
    <div>
      {isMobile ? (
        <div className="overflow-auto flex flex-row justify-center border-t-2 border-b-2 border-{#0a248f} space-x-4 mt-6 pb-4 pt-4 mb-0 ">
          {sports.map((sport) => {
            const SportIcon = sportIconMap[sportNameConvert(sport.name)] || sportIconMap.Sports;
            return (
              <Link key={sport.id} onClick={onSportClick(sport.id)} href="/">
                <SportIcon size={50} color="black" />
              </Link>
            );
          })}
        </div>
      ) : (
        <div className="overflow-auto flex flex-col justify-center border-b-2 border-{#0a248f} space-y-4 mt-6 pb-4 pt-4 mb-0 ml-4">
          {sports.map((sport) => {
            const SportIcon = sportIconMap[sportNameConvert(sport.name)] || sportIconMap.Sports;
            return (
              <Link
                key={sport.id}
                onClick={onSportClick(sport.id)}
                href="/"
              >
                <SportIcon size={50} color="black" />
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
