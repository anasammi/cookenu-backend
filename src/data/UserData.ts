import { User, UserBD } from "../model/User";
import { BaseDatabase } from "./BaseDatabase";

export class UserData extends BaseDatabase {
  private static tableName = "user_cookenu";

  async getUserByEmail(email: string): Promise<User | undefined> {
    const result = await this.getConnection()
      .select("*")
      .from(UserData.tableName)
      .where({ email });

    if (!result.length) {
      return undefined;
    }
    return new User(
      result[0].id,
      result[0].name,
      result[0].email,
      result[0].password
    );
  }

  async createUser(user: User): Promise<string> {
    await this.getConnection()
      .insert({
        id: user.getId(),
        email: user.getEmail(),
        name: user.getName(),
        password: user.getPassword(),
      })
      .into(UserData.tableName);
    return "Usuário cadastrado com sucesso";
  }

  async getUserById(id: string): Promise<UserBD | undefined> {
    const result = await this.getConnection()
      .select("*")
      .from(UserData.tableName)
      .where({ id });

    if(!result.length){
        return undefined
    }
    
    const user: UserBD = {
      id: result[0].id,
      name: result[0].name,
      email: result[0].email,
    };

    return user;
  }
}
