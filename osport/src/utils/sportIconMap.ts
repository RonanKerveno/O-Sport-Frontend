// Utilitaire pour associer une icône React à un nom de sport en PascalCase.

import {
  MdDirectionsBike,
  MdFitnessCenter,
  MdHiking,
  MdIceSkating,
  MdKitesurfing,
  MdSkateboarding,
  MdSports,
  MdSportsBaseball,
  MdSportsBasketball,
  MdSportsCricket,
  MdSportsEsports,
  MdSportsFootball,
  MdSportsGolf,
  MdSportsGymnastics,
  MdSportsHandball,
  MdSportsHockey,
  MdSportsKabaddi,
  MdSportsMartialArts,
  MdSportsMma,
  MdSportsMotorsports,
  MdParagliding,
  MdNordicWalking,
  MdRollerSkating,
  MdSailing,
  MdSportsRugby,
  MdSportsSoccer,
  MdSportsTennis,
  MdSportsVolleyball,
  MdSurfing,
} from 'react-icons/md';
import {
  FaRunning,
  FaSkiing,
  FaSwimmer,
} from 'react-icons/fa';
import {
  GrYoga,
} from 'react-icons/gr';
import {
  BsScooter,
} from 'react-icons/bs';
import { IconType } from 'react-icons';

const sportIconMap: Record<string, IconType> = {
  ArtsMartiaux: MdSportsMartialArts,
  Baseball: MdSportsBaseball,
  Basketball: MdSportsBasketball,
  Cricket: MdSportsCricket,
  Cyclisme: MdDirectionsBike,
  Esports: MdSportsEsports,
  Fitness: MdFitnessCenter,
  Football: MdSportsSoccer,
  FootballAmericain: MdSportsFootball,
  Footbike: BsScooter,
  Golf: MdSportsGolf,
  Gymnastique: MdSportsGymnastics,
  Handball: MdSportsHandball,
  Hockey: MdSportsHockey,
  Judo: MdSportsKabaddi,
  Kitesurf: MdKitesurfing,
  MarcheNordique: MdNordicWalking,
  Mma: MdSportsMma,
  Natation: FaSwimmer,
  Parapente: MdParagliding,
  PatinageSurGlace: MdIceSkating,
  RandonneePedestre: MdHiking,
  Roller: MdRollerSkating,
  Rugby: MdSportsRugby,
  Running: FaRunning,
  Skateboard: MdSkateboarding,
  Ski: FaSkiing,
  Sports: MdSports,
  SportAutomobile: MdSportsMotorsports,
  Surf: MdSurfing,
  Tennis: MdSportsTennis,
  Voile: MdSailing,
  Volleyball: MdSportsVolleyball,
  Yoga: GrYoga,
};

export default sportIconMap;
