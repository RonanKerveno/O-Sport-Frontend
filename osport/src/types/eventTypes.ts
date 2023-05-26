export interface User {
  userName: string;
}

export interface EventSport {
  name: string;
}

export interface Event {
  id: string;
  title: string;
  region: string;
  zipCode: number;
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
  users_join_events: {
    userId: number;
  };
}

export type EventData = Event[];
export type EditEventData = Omit<Event[], 'id' | 'createdAt' | 'updatedAt' | 'creatorId' | 'creator' |'sport' | 'users_join_events'>;
