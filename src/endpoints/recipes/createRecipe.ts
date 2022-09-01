import { Request, Response } from "express";
import { RecipeDatabase } from "../../data/RecipeDatabase";
import { Recipe } from "../../entities/Recipe";
import { Authenticator } from "../../services/Authenticator";
import { IdGenerator } from "../../services/idGenerator";

export async function createRecipe(req: Request, res: Response): Promise<void> {
  try {
    const token: string = req.headers.authorization;
    const { title, description } = req.body;

    if (!token) {
      res
        .status(422)
        .send("Esse endpoint exige uma autorização a ser passada nos headers");
    }

    const authenticator = new Authenticator();
    const tokenData = authenticator.getTokenData(token);
    const user_id = tokenData.id;

    const idGenerator = new IdGenerator();
    const recipe_id = idGenerator.generateId();

    const createdAt = new Date();

    const recipeDatabase = new RecipeDatabase();
    const newRecipe = new Recipe(
      recipe_id,
      title,
      description,
      createdAt,
      user_id
    );
    await recipeDatabase.createRecipe(newRecipe);

    res.status(201).send("Receita criada com sucesso!");
  } catch (e) {
    res.status(400).send(e.message);
  }
}
