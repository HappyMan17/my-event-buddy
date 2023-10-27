export class ActivitiesEntity {
  constructor (
    public activity_id: string,
    public event_id: string,
    public user_id: string,
    public description: string,
    public total_activity_value: number,
    public percentage_bool: boolean,
    public percentage: number,
    public amount: number
  ) {}
}
