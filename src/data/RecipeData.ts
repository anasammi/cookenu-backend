
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

  async getRecipeById(id: string): Promise<Recipe|undefined> {
    const result = await this.getConnection()
      .select("*")
      .from(RecipeData.tableName)
      .where({id})

      if(!result.length){
        return undefined
      }
      
      return new Recipe(
        result[0].id,
        result[0].title,
        result[0].description,
        result[0].date,
        result[0].user_id
      )
  }

}
