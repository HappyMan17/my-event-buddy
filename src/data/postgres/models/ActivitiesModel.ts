import { ActivitiesEntity } from '../../../domain'
import { PostgresDb } from '../postgres.database'

export class ActivitiesModel {
  static async createAct (activitie: ActivitiesEntity): Promise<any[] | null> {
    try {
      const response = await PostgresDb.query({
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
      })
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

  static async getActivitiesById (activityId: string): Promise<any[] | null> {
    try {
      const response = await PostgresDb.query({
        query: 'SELECT * FROM activities WHERE activity_id = $1;',
        params: [activityId]
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

  static async updateActivity (activity: ActivitiesEntity): Promise<any[] | null> {
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
}
