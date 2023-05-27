interface User {
  id: string;
  userName: string;
}

export interface EventSport {
  name: string;
}

export interface Event {
  id: string;
  title: string;
  region: string;
  zipCode: string;
  city: string;
  street: string;
  description: string;
  startingTime: string;
  endingTime: string;
  createdAt: string;
  updatedAt: string | null;
  creatorId: string;
  sportId: string;
  creator: User;
  maxNbParticipants: number;
  sport: EventSport;
  eventUsers: User[];
}

export type EventData = Event[];
export type EditEventData = Omit<Event, 'id' | 'createdAt' | 'updatedAt' | 'creatorId' | 'creator' | 'eventUsers'>;
