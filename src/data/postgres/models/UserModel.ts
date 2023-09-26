import { UserEntity } from "../../../domain";
import { PostgresDb } from "../postgres.database";


export class UserModel {
  
  static async getUsers(): Promise<any[] | null> {
    try {
      const response = await PostgresDb.query({
        query: 'SELECT * FROM users;',
        params: [],
      });
      return response;
    } catch (error) {
      return null;
    }
  }
  
  static async getUserById(id: string): Promise<any | null> {
    try {
      const response = await PostgresDb.query({
        query: 'SELECT * FROM users WHERE id = "$1";',
        params: [id],
      });

      return response;
    } catch (error) {
      return null;
    }
  }

  static async checkUserEmailAlreadyExist(email: string): Promise<boolean> {
    try {
      const response = await PostgresDb.query({
        query: "SELECT * FROM users WHERE email = $1;",
        params: [email],
      });
      if (!response) {
        return false;
      }
      return true;
    } catch (error) {
      return false;
    }
  }
  
  static async updateUserById(id: string, user: UserEntity): Promise<any | null> {
    try {
      const response = await PostgresDb.query({
        query: `
        UPDATE users 
        SET 
          name = $1,
          nickname = $2,
          email = $3,
          password = $4,
          isEnable = $5,
          img = $6
        WHERE id = $7;
      `,
        params: [
          user.user_name,
          user.nick_name,
          user.email,
          user.password,
          user.is_enable.toString(), //bolean
          user.img || '',
          user.user_id,
        ],
      });
            
      return response;
    } catch (error) {
      return null;
    }
  }

}
