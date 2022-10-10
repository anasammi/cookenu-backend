import { Request, Response } from "express";
import { RecipeData } from "../../data/RecipeData";
import { MissingField } from "../../error/MissingFields";
import { MissingToken } from "../../error/MissingToken";
import { Recipe } from "../../model/Recipe";
import { Authenticator } from "../../services/Authenticator";
import { IdGenerator } from "../../services/idGenerator";
import moment from "moment"

export class RecipeEndpoint {

    async createRecipe(req: Request, res: Response) {
        try{
            const token = req.headers.authorization
            const {title, description} = req.body

            if(!title || !description){
                throw new MissingField()
            }

            if(!token){
                throw new MissingToken()
            }

            const id = new Authenticator().getTokenData(token)
            const idRecipe = new IdGenerator().generateId()
            const date = new Date()

            const newRecipe = new Recipe(idRecipe, title, description, date, id)

            const response = await new RecipeData().createRecipe(newRecipe)

            res.status(201).send(response)

        }
        catch (e:any){
            res.status(e.statusCode || 500).send({ message: e.message });
        }
    };

    async getRecipeById(req: Request, res: Response){
        try{
            const token = req.headers.authorization
            const {id} = req.params
            
            if(!token){
                throw new MissingToken()
            }

            new Authenticator().getTokenData(token)

            const recipeData = await new RecipeData().getRecipeById(id)

            if(!recipeData){
                throw new Error("Receita não encontrada")
            }

            recipeData.setData(moment(recipeData.getDate(), "YYYY-MM-DD").format("DD-MM-YYYY"))

            res.status(200).send(recipeData)
        }
        catch (e:any){
            res.status(e.statusCode || 500).send({ message: e.message });
        }
    };
}