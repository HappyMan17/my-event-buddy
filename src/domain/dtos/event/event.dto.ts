import { EventToUpdate, type EventUpdateLogo } from '../types'

export class EventDto {
  private constructor (
    public user_id: string,
    public event_name: string,
    public description: string,
    public type: string,
    public logo: string,
    public hasActivity?: boolean,
    public hasBeenDone?: boolean
  ) {}

  static create (object: Record<string, any | null>): [string?, EventDto?] {
    const {
      event_name,
      description,
      type,
      logo
    } = object

    if (!object.user_id) return ['Missing user id', undefined]
    if (!event_name) return ['Missing event name', undefined]
    if (!description) return ['Missing event description', undefined]
    if (!type) return ['Missing event type', undefined]

    return [
      undefined,
      new EventDto(
        object.user_id,
        event_name,
        description,
        type,
        logo
      )
    ]
  }

  static update (object: Record<string, any | null>): [string?, EventToUpdate?] {
    const {
      event_id,
      event_name,
      description,
      type,
      has_activity,
      has_been_done
    } = object

    if (!event_id) return ['Missing event id', undefined]
    if (!event_name) return ['Missing event name', undefined]
    if (!description) return ['Missing event description', undefined]
    if (!type) return ['Missing event type', undefined]
    if (typeof has_activity !== 'boolean') return ['Missing activity type', undefined]
    if (typeof has_been_done !== 'boolean') return ['Missing done type', undefined]

    return [
      undefined,
      {
        event_id,
        event_name,
        description,
        type,
        has_activity,
        has_been_done
      }
    ]
  }

  static updateImage (object: Record<string, any | null>): [string?, EventUpdateLogo?] {
    const { eventId } = object

    if (!eventId) return ['Missing id', undefined]

    return [
      undefined,
      {
        event_id: eventId,
        logo: ''
      }
    ]
  }
}
