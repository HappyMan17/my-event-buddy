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
            is_by_percentage
          ) VALUES ($1, $2, $3, $4, $5, $6);
        `,
        params: [
          activitie.activity_id,
          activitie.event_id,
          activitie.user_id,
          activitie.description,
          activitie.total_activity_value.toString(),
          activitie.is_by_percentage.toString()
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

  static async getActivitiesByUser (userId: string): Promise<any[] | null> {
    try {
      const response = await PostgresDb.query({
        query: 'SELECT * FROM activities WHERE user_id = $1;',
        params: [userId]
      })
      return response
    } catch (error) {
      return null
    }
  }
}
