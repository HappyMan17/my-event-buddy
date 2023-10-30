import { EventEntity } from '../../../domain'
import { EventUpdateLogo } from '../../../domain/dtos'
import { PostgresDb } from '../postgres.database'

export class EventModel {
  static async create (event: EventEntity): Promise<any[] | null> {
    try {
      const response = await PostgresDb.query({
        query: `
          INSERT INTO events 
          (
            event_id,
            user_id,
            event_name,
            description,
            type,
            logo,
            has_activity,
            has_been_done
          ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8);
        `,
        params: [
          event.event_id,
          event.user_id,
          event.event_name,
          event.description,
          event.type,
          event.logo,
          event.has_activity.toString(),
          event.has_been_done.toString()
        ]
      })
      return response
    } catch (error) {
      return null
    }
  }

  static async getEvents (): Promise<any[] | null> {
    try {
      const response = await PostgresDb.query({
        query: 'SELECT * FROM events;',
        params: []
      })
      return response
    } catch (error) {
      return null
    }
  }

  static async getEventsByUserId (userId: string): Promise<any[] | null> {
    try {
      const response = await PostgresDb.query({
        query: 'SELECT * FROM events WHERE user_id = $1;',
        params: [userId]
      })
      return response
    } catch (error) {
      return null
    }
  }

  static async getEventById (eventId: string): Promise<any[] | null> {
    try {
      const response = await PostgresDb.query({
        query: 'SELECT * FROM events WHERE event_id = $1;',
        params: [eventId]
      })
      return response
    } catch (error) {
      return null
    }
  }

  static async updateEventLogo (event: EventUpdateLogo): Promise<any[] | null> {
    try {
      const response = await PostgresDb.query({
        query: `
          UPDATE events
          SET logo = $1
          WHERE event_id = $2;
        `,
        params: [
          event.logo ?? '',
          event.event_id
        ]
      })

      return response
    } catch (error) {
      return null
    }
  }
}
