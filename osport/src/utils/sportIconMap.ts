import {
  MdDirectionsBike,
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
  MdSportsRugby,
  MdSportsSoccer,
  MdSportsTennis,
  MdSportsVolleyball,
} from 'react-icons/md';
import {
  FaRunning,
} from 'react-icons/fa';
import { IconType } from 'react-icons';

const sportIconMap: Record<string, IconType> = {
  ArtsMartiaux: MdSportsMartialArts,
  Baseball: MdSportsBaseball,
  Basketball: MdSportsBasketball,
  Cricket: MdSportsCricket,
  Cyclisme: MdDirectionsBike,
  Esports: MdSportsEsports,
  Football: MdSportsSoccer,
  FootballAmericain: MdSportsFootball,
  Golf: MdSportsGolf,
  Gymnastique: MdSportsGymnastics,
  Handball: MdSportsHandball,
  Hockey: MdSportsHockey,
  Judo: MdSportsKabaddi,
  Mma: MdSportsMma,
  Rugby: MdSportsRugby,
  Running: FaRunning,
  Sports: MdSports,
  SportsAutomobile: MdSportsMotorsports,
  Tennis: MdSportsTennis,
  Volleyball: MdSportsVolleyball,
};

export default sportIconMap;
