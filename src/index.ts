import { app } from "./app";
import { createRecipe } from "./endpoints/recipes/createRecipe";
import { getRecipeById } from "./endpoints/recipes/getRecipeById";
import { getAllUsers } from "./endpoints/users/getAllUsers";
import { getUserById } from "./endpoints/users/getUserByID";
import { getUserProfile } from "./endpoints/users/getUserProfile";
import { login } from "./endpoints/users/login";
import { signup } from "./endpoints/users/signup";

app.get("/user", getAllUsers);
app.get("/user/profile", getUserProfile);
app.get("/user/:id/profile", getUserById);
app.post("/user", signup);
app.post("/user/login", login);
app.get("/recipe/:id", getRecipeById);
app.post("/recipe", createRecipe);
