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
            percentage_bool,
            percentage,
            amount
          ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8);
        `,
        params: [
          activitie.activity_id,
          activitie.event_id,
          activitie.user_id,
          activitie.description,
          activitie.total_activity_value.toString(),
          activitie.percentage_bool.toString(),
          activitie.percentage.toString(),
          activitie.amount.toString()
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
}
