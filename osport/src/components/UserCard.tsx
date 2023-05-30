// components/UserCard.tsx

import { HiUserCircle } from 'react-icons/hi2';
import { format, differenceInYears } from 'date-fns';
import { UserPublicData } from '@/types';

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
      <div className="max-w-lg mx-auto bg-clip-border rounded-xl bg-slate-300 text-gray-700 shadow-md flex p-6 pl-20 pr-20 mb-5">
        <span>
          <HiUserCircle size={100} />
        </span>
        <span>
          <div>
            <h2 className="text-lg font-bold">{`${userData.userName}${userData.isAdmin ? ` (${admin})` : ''}`}</h2>
          </div>
          <div>{`${age}/${genderSymbol} - ${userData.city}`}</div>
          <div className="text-sm font-semibold mt-1">Date d'inscription</div>
          <div className="text-sm">{registrationDate}</div>
        </span>
      </div>
    </div>
  );
}
