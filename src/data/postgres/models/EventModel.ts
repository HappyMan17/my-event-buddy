import { EventEntity } from '../../../domain'
import { EventToUpdate, EventUpdateLogo } from '../../../domain/dtos'
import { PostgresDb } from '../postgres.database'

export class EventModel {
  static async create (event: EventEntity): Promise<any[] | null> {
    try {
      console.log({ date: event.event_date, iso: event.event_date.toISOString() })
      const response = await PostgresDb.query({
        query: `
          INSERT INTO events 
          (
            event_id,
            event_date,
            user_id,
            event_name,
            description,
            type,
            logo,
            has_activity,
            has_been_done
          ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9);
        `,
        params: [
          event.event_id,
          event.event_date.toISOString(),
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
        query: 'SELECT * FROM events WHERE user_id = $1 AND has_been_done = false;',
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

  static async update (event: EventToUpdate): Promise<any[] | null> {
    try {
      const response = await PostgresDb.query({
        query: `
          UPDATE events 
          SET (
            event_date,
            event_name,
            description,
            type,
            has_activity,
            has_been_done
          ) = ($1, $2, $3, $4, $5, $6)
          WHERE event_id = $7;
        `,
        params: [
          event.event_date.toISOString(),
          event.event_name,
          event.description,
          event.type,
          event.has_activity.toString(),
          event.has_been_done.toString(),
          event.event_id
        ]
      })
      return response
    } catch (error) {
      return null
    }
  }
}
