import { Request, Response } from "express";
import { RecipeDatabase } from "../../data/RecipeDatabase";


export async function getRecipeById(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const token: string = req.headers.authorization;
    const id: string = req.params.id;

    if (!token) {
      res
        .status(422)
        .send("Esse endpoint exige uma autorização a ser passada nos headers");
    }

    const recipeDatabase = new RecipeDatabase();
    const recipe = await recipeDatabase.getRecipeData(id);

    res.status(200).send(recipe);

  } catch (e) {
    res.status(400).send(e.message);
  }
}
