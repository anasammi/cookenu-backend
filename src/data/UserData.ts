import moment from "moment";
import { join } from "path";
import { FeedDB, User, UserBD } from "../model/User";
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

  async insertFollow(idFollower: string, idFollowed: string): Promise<string> {
    await this.getConnection()
      .insert({
        id_follower: idFollower,
        id_followed: idFollowed
      })
      .into("followers_cookenu")
    
    return `A pessoa com id ${idFollower} está seguindo a pessoa com id ${idFollowed}`

  }

  async deleteFollow(idFollower: string, idToUnfollow: string): Promise<string> {
    await this.getConnection()
      .delete("*")
      .from("followers_cookenu")
      .where({
        id_follower: idFollower
      })
      .andWhere({
        id_followed: idToUnfollow
      })

    return `A pessoa com id ${idFollower} deixou de seguir a pessoa com id ${idToUnfollow}`
  }

  async selectFeed(id: string): Promise<FeedDB[]>{
    const result = await this.getConnection()
      .select("recipe_cookenu.*", "user_cookenu.name")
      .from("followers_cookenu")
      .innerJoin("user_cookenu", "followers_cookenu.id_followed", "user_cookenu.id")
      .innerJoin("recipe_cookenu", "followers_cookenu.id_followed", "recipe_cookenu.user_id")
      .where("followers_cookenu.id_follower", id)

    const typeFeed = result.map((feed:any)=>{
      const type: FeedDB = {
        id: feed.id,
        title: feed.title,
        description: feed.description,
        date: moment(feed.date, "YYYY-MM-DD").format("DD/MM/YYYY"),
        user_id: feed.user_id,
        name: feed.name
      }
      return type
    })
    return typeFeed
  }
}
