export class CreateEventDto {
  private constructor (
    public user_id: string,
    public event_name: string,
    public description: string,
    public type: string,
    public logo: string
  ) {}

  static create (object: Record<string, any | null>): [string?, CreateEventDto?] {
    const {
      user_id,
      event_name,
      description,
      type,
      logo
    } = object

    if (!user_id) return ['Missing user id', undefined]
    if (!event_name) return ['Missing event name', undefined]
    if (!description) return ['Missing event description', undefined]
    if (!type) return ['Missing event type', undefined]

    return [
      undefined,
      new CreateEventDto(
        user_id,
        event_name,
        description,
        type,
        logo
      )
    ]
  }
}
