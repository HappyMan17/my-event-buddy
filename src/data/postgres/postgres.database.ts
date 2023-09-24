import { Pool } from 'pg';
import { envs } from '../../config/envs';
import { UserEntity } from '../../domain';

const pool = new Pool({
  host: 'localhost',
  user: envs.POSTGRES_USER,
  password: envs.POSTGRES_PASSWORD,
  database: envs.POSTGRES_DB,
  port: envs.DB_PORT,
});

type QueryProps = {
  query: string;
  params: string[];
}

export class PostgresDb{

  static async query({query, params}: QueryProps): Promise<UserEntity[] | null> {
    try {
      const response = await pool.query(query, params)
      return response.rows;
    } catch (error) {
      return null
    }
  }

  static async getTime() {
    const time = await pool.query('SELECT NOW()')
    console.log({time, ms: 'poss'});
    return time;
  }
}

// const getUsers = async (req, res) => {
//   const response = await pool.query()
// }
