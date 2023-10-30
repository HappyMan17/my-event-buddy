export class ActivitiesDto {
  private constructor (
    public event_id: string,
    public user_id: string,
    public description: string,
    public total_activity_value: number,
    public is_by_percentage: boolean,
    public activity_id?: string,
    public has_been_done?: boolean
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

  static update (object: Record<string, any | null>): [string?, ActivitiesDto?] {
    const {
      activity_id,
      event_id,
      description,
      total_activity_value,
      is_by_percentage,
      has_been_done
    } = object

    if (!activity_id) return ['Missing activity id', undefined]
    if (!object.user_id) return ['Missing user id', undefined]
    if (!total_activity_value) return ['Missing value', undefined]
    if (!description) return ['Missing event description', undefined]
    if (!is_by_percentage) return ['Missing is_by_percentage', undefined]
    if (!has_been_done) return ['Missing has_been_done', undefined]

    return [
      undefined,
      new ActivitiesDto(
        event_id,
        object.user_id,
        description,
        total_activity_value,
        is_by_percentage,
        activity_id,
        has_been_done
      )
    ]
  }
}
