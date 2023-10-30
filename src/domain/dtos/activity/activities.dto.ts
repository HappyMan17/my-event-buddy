export class ActivitiesDto {
  private constructor (
    public event_id: string,
    public user_id: string,
    public description: string,
    public total_activity_value: number,
    public is_by_percentage: boolean
  ) {}

  static createAct (object: Record<string, any | null>): [string?, ActivitiesDto?] {
    const {
      event_id,
      description,
      total_activity_value,
      is_by_percentage
    } = object

    if (!object.user_id) return ['Missing user id', undefined]
    if (!total_activity_value) return ['Missing value', undefined]
    if (!description) return ['Missing event description', undefined]
    if (!is_by_percentage) return ['Missing is_by_percentage', undefined]

    return [
      undefined,
      new ActivitiesDto(
        event_id,
        object.user_id,
        description,
        total_activity_value,
        is_by_percentage
      )
    ]
  }
}
