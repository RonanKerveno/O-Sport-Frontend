export interface User {
  userName: string;
}

export interface EventSport {
  name: string;
}

export interface Event {
  id: number;
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
  creatorId: number;
  sportId: number;
  creator: User;
  sport: EventSport;
  users_join_events: {
    userId: number;
  };
}

export type EventListData = Event[];
