export class EventEntity {
  constructor (
    public event_id: string,
    public event_date: Date,
    public user_id: string,
    public event_name: string,
    public description: string,
    public type: string,
    public logo: string,
    public has_activity: boolean,
    public has_been_done: boolean
  ) {}
}
