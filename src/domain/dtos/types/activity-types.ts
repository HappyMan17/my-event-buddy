export interface ActivityToUpdate {
  activity_id: string;
  description: string;
  total_activity_value: number;
  is_by_percentage: boolean;
  has_been_done: boolean;
}

export interface ActivityContact {
  activity_contacts_id?: string,
  activity_id: string,
  user_id: string,
}
