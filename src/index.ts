import { app } from "./app";
import { BaseDatabase } from "./data/BaseDatabase";
import { createRecipe } from "./endpoints/recipes/createRecipe";
import { getRecipeById } from "./endpoints/recipes/getRecipeById";
import { UserEndpoint } from "./endpoints/users/User";
import { HashManager } from "./services/HashManager";

const userEndpoint = new UserEndpoint()

app.post("/signup", userEndpoint.createUser);
app.post("/login", userEndpoint.login);
app.get("/user/profile", userEndpoint.getUserProfile);
app.get("/user/:id/profile", userEndpoint.getUserById);
// app.get("/recipe/:id", getRecipeById);
// app.post("/recipe", createRecipe);
