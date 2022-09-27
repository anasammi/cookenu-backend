import { app } from "./app";
import { RecipeEndpoint } from "./endpoints/recipes/Recipes";
import { UserEndpoint } from "./endpoints/users/User";


const userEndpoint = new UserEndpoint()
const recipeEndpoint = new RecipeEndpoint()

app.get("/user/profile", userEndpoint.getUserProfile);
app.get("/user/:id/profile", userEndpoint.getUserById);
app.post("/signup", userEndpoint.createUser);
app.post("/login", userEndpoint.login);
app.post("/recipe", recipeEndpoint.createRecipe);
