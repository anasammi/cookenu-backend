import knex, { Knex } from "knex";
import dotenv from "dotenv"

dotenv.config()

export class BaseDatabase {
  private static connection: Knex | null = null
  
  getConnection(): Knex {
    if(!BaseDatabase.connection){
      BaseDatabase.connection = knex({
        client: "mysql",
        connection: {
          host: process.env.DB_HOST,
          port: 3306,
          user: process.env.DB_USER,
          password: process.env.DB_PASS,
          database: process.env.DB_NAME,
          multipleStatements: true
        }
      })
    }
    return BaseDatabase.connection
  }
}
  

