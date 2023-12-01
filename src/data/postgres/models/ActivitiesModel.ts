import { ActivitiesEntity } from '../../../domain'
import { ActivityContact, ActivityToUpdate } from '../../../domain/dtos'
import { PostgresDb } from '../postgres.database'

export class ActivitiesModel {
  static async createAct (activitie: ActivitiesEntity): Promise<any[] | null> {
    try {
      const createActivityQuery = {
        query: `
          INSERT INTO activities 
          (
            activity_id,
            event_id,
            user_id,
            description,
            total_activity_value,
            is_by_percentage,
            has_been_done
          ) VALUES ($1, $2, $3, $4, $5, $6, $7);
        `,
        params: [
          activitie.activity_id,
          activitie.event_id,
          activitie.user_id,
          activitie.description,
          activitie.total_activity_value.toString(),
          activitie.is_by_percentage.toString(),
          activitie.has_been_done.toString()
        ]
      }
      const has_activity = true
      const updateEventQuery = {
        query: `
          UPDATE events
          SET has_activity = $1
          WHERE event_id = $2;
        `,
        params: [
          has_activity.toString(),
          activitie.event_id
        ]
      }

      const response = await PostgresDb.transaction([createActivityQuery, updateEventQuery])

      return response
    } catch (error) {
      return null
    }
  }

  static async getActivities (): Promise<any[] | null> {
    try {
      const response = await PostgresDb.query({
        query: 'SELECT * FROM activities;',
        params: []
      })
      return response
    } catch (error) {
      return null
    }
  }

  static async getActivitiesById (eventId: string): Promise<any[] | null> {
    try {
      const response = await PostgresDb.query({
        query: 'SELECT * FROM activities WHERE event_id = $1 AND has_been_done = false;',
        params: [eventId]
      })
      return response
    } catch (error) {
      return null
    }
  }

  static async getActivitiesByEvent (eventId: string): Promise<any[] | null> {
    try {
      const response = await PostgresDb.query({
        query: 'SELECT * FROM activities WHERE event_id = $1;',
        params: [eventId]
      })
      return response
    } catch (error) {
      return null
    }
  }

  static async updateActivity (activity: ActivityToUpdate): Promise<any[] | null> {
    try {
      const response = await PostgresDb.query({
        query: `
          UPDATE activities
          SET (description, total_activity_value, is_by_percentage, has_been_done) = ($1, $2, $3, $4)
          WHERE activity_id = $5;
        `,
        params: [
          activity.description,
          activity.total_activity_value.toString(),
          activity.is_by_percentage.toString(),
          activity.has_been_done.toString(),
          activity.activity_id
        ]
      })

      return response
    } catch (error) {
      return null
    }
  }

  static async addContactToActivity (object: ActivityContact): Promise<any[] | null> {
    try {
      console.log({ object })
      const response = await PostgresDb.query({
        query: `
          INSERT INTO activity_contacts 
          (
            activity_contacts_id,
            activity_id,
            user_id
          ) VALUES ($1, $2, $3);
        `,
        params: [
          object.activity_contacts_id!,
          object.activity_id,
          object.user_id
        ]
      })

      return response
    } catch (error) {
      return null
    }
  }

  static async getActivityContacts (activityId: string): Promise<any[] | null> {
    try {
      const response = await PostgresDb.query({
        query:
        `
        SELECT 
          user_id, 
          activity_id 
        FROM activity_contacts WHERE activity_id = $1;
        `,
        params: [activityId]
      })
      return response
    } catch (error) {
      return null
    }
  }
}
