export class ActivityContactEntity {
  constructor (
    public activity_id: string,
    public contact_id: string[],
    public user_id: string,
    public total_to_pay: number,
    public total_paid: number,
    public paid: boolean
  ) {}
}
