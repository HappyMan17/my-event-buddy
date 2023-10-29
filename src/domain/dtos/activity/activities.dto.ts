export class ActivitiesDto {
  private constructor (
    public activity_id: string,
    public event_id: string,
    public user_id: string,
    public description: string,
    public total_activity_value: number,
    public percentage: number,
    public amount: number
  ) {}

  static createAct (object: Record<string, any | null>): [string?, ActivitiesDto?] {
    const {
      activity_id,
      event_id,
      user_id,
      description,
      total_activity_value,
      percentage,
      amount
    } = object

    if (!activity_id) return ['Missing activity id', undefined]
    if (!total_activity_value) return ['Missing value', undefined]
    if (!description) return ['Missing event description', undefined]
    if (!percentage) return ['Missing percentage type', undefined]

    return [
      undefined,
      new ActivitiesDto(
        activity_id,
        event_id,
        user_id,
        description,
        total_activity_value,
        percentage,
        amount
      )
    ]
  }
}
