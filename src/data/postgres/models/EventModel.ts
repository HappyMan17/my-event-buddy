import { EventEntity } from '../../../domain'
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
            has_activity
          ) VALUES ($1, $2, $3, $4, $5, $6, $7);
        `,
        params: [
          event.event_id,
          event.user_id,
          event.event_name,
          event.description,
          event.type,
          event.logo,
          event.has_activity.toString()
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
}
