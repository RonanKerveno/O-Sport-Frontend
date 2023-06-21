// components/UserCard.tsx
import { format, differenceInYears } from 'date-fns';
import { UserPublicData } from '@/types';
import Avvvatars from 'avvvatars-react';

interface UserCardProps {
  userData: UserPublicData;
}

export default function UserCard({
  userData,
}: UserCardProps) {
  // Calcul de l'âge
  const age = differenceInYears(new Date(), new Date(userData.dateOfBirth));
  // Détermination de la lettre du genre (F/H)
  const genderSymbol = userData.gender === 'féminin' ? 'F' : 'H';
  // Détermination de l'écriture genrée de admin
  const admin = userData.gender === 'féminin' ? 'Administratrice' : 'Administrateur';
  // Formatage de la date d'inscription
  const registrationDate = format(new Date(userData.createdAt), 'dd/MM/yyyy');

  return (
    <div className="flex justify-center items-center">
      <div className="mx-auto rounded-xl bg-slate-300 text-gray-700 shadow-md flex px-20 py-10">
        <span>
          <Avvvatars value={userData.userName} size={128} />
        </span>
        <span>
          <div>
            <h2 className="text-lg font-bold">{`${userData.userName}${userData.isAdmin ? ` (${admin})` : ''}`}</h2>
          </div>
          <div>{`${age}/${genderSymbol} - ${userData.city}`}</div>
          <div className="text-sm font-semibold mt-1">Date d&#39;inscription</div>
          <div className="text-sm">{registrationDate}</div>
        </span>
      </div>
    </div>
  );
}
