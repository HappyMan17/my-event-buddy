export interface Event {
  event_id: string;
  user_id: string;
  event_name: string;
  description: string;
  type: string;
  logo: string;
  has_activity: boolean;
}

export interface EventToUpdate {
  event_id: string;
  event_name: string;
  description: string;
  type: string;
  has_activity: boolean;
  has_been_done: boolean;
}

export interface EventUpdateLogo {
  event_id: string,
  logo?: string,
}
