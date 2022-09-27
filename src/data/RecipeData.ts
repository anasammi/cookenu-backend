
import { Recipe } from "../model/Recipe";
import { BaseDatabase } from "./BaseDatabase";

export class RecipeData extends BaseDatabase {
  private static tableName = "recipe_cookenu";

  async createRecipe(recipe: Recipe): Promise<string> {
      const result = await this.getConnection()
        .insert({
          id: recipe.getId(),
          title: recipe.getTitle(),
          description: recipe.getDescription(),
          date: recipe.getDate(),
          user_id: recipe.getUserId()
        })
        .into(RecipeData.tableName)
      
        return `Receita ${recipe.getTitle()} criada com sucesso!`
  }

}
