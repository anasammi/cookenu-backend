import { Recipe } from "../entities/Recipe";
import { BaseDatabase } from "./BaseDatabase";

export class RecipeDatabase extends BaseDatabase {
  public async createRecipe(recipe: Recipe): Promise<void> {
    try {
      await BaseDatabase.connection("cookenu_recipes").insert({
        recipe_id: recipe.getRecipeId(),
        title: recipe.getTitle(),
        description: recipe.getDescription(),
        createdAt: recipe.getDate(),
        user_id: recipe.getUserId(),
      });
    } catch (e) {
      throw new Error(e.sqlMessage || e.message);
    }
  }

  public async getRecipeData(id: string): Promise<any> {
    try {
      const recipe = await RecipeDatabase.connection("cookenu_recipes")
        .select("*")
        .where({ recipe_id: id });

      return recipe[0] && Recipe.toRecipeModel(recipe[0]);
    } catch (e) {
      throw new Error(e.sqlMessage || e.message);
    }
  }
}
