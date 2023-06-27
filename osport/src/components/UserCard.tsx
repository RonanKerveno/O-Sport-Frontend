// Composant d'affichage d'une carte utilisateur.

import { format, differenceInYears } from 'date-fns';
import { UserPublicData } from '@/types';
import Avvvatars from 'avvvatars-react';

// Typage des props
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
  // Formatage de la date d'inscription
  const registrationDate = format(new Date(userData.createdAt), 'dd/MM/yyyy');

  return (
    <div className="rounded-md flex bg-slate-200 text-gray-700 shadow-md w-full">
      <div className="p-7 flex justify-end items-center w-1/2">
        <Avvvatars value={userData.userName} size={100} />
      </div>
      <div className="py-4">
        <div className="mb-2">
          <h2 className="text-xl font-bold line-clamp-1">
            {userData.userName}<span className="font-normal text-orange-800 text-sm">{`${userData.isAdmin ? ' (Admin)' : ''}`}</span>
          </h2>
        </div>
        <div className="mb-2 line-clamp-1">{`${age}/${genderSymbol} - ${userData.city}`}</div>
        <div className="text-sm font-semibold">Date d&#39;inscription</div>
        <div className="text-sm">{registrationDate}</div>
      </div>
    </div>
  );
}
