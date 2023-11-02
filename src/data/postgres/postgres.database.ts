import { Pool } from 'pg'
import { envs } from '../../config/envs'

const pool = new Pool({
  host: envs.HOST,
  user: envs.POSTGRES_USER,
  password: envs.POSTGRES_PASSWORD,
  database: envs.POSTGRES_DB,
  port: envs.DB_PORT
})

interface QueryProps {
  query: string;
  params: string[];
}

export class PostgresDb {
  static async query ({ query, params }: QueryProps): Promise<any[] | null> {
    try {
      const response = await pool.query(query, params)
      return response.rows
    } catch (error) {
      return null
    }
  }

  static async getTime () {
    const time = await pool.query('SELECT NOW()')
    console.log({ time, ms: 'poss' })
    return time
  }

  static async transactin (queries: QueryProps[]): Promise<any | null> {
    const client = await pool.connect()

    try {
      await client.query('BEGIN')
      queries.map(async item => {
        console.log({ item }) // todo remove
        const { query, params } = item
        void await client.query(query, params)
      })

      await client.query('COMMIT')
      return { ms: 'done' }
    } catch (e) {
      await client.query('ROLLBACK')
      return null
    } finally {
      client.release()
    }
  }
}
