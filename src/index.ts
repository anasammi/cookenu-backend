import { app } from "./app";
import { RecipeEndpoint } from "./endpoints/recipes/Recipes";
import { UserEndpoint } from "./endpoints/users/Users";


const userEndpoint = new UserEndpoint()
const recipeEndpoint = new RecipeEndpoint()

app.get("/user/profile", userEndpoint.getUserProfile);
app.get("/user/feed", userEndpoint.getFeed)
app.get("/user/:id/profile", userEndpoint.getUserById);
app.post("/signup", userEndpoint.createUser);
app.post("/login", userEndpoint.login);
app.post("/follow", userEndpoint.followUser);
app.post("/unfollow", userEndpoint.unfollowUser)
app.get("/recipe/:id", recipeEndpoint.getRecipeById);
app.post("/createrecipe", recipeEndpoint.createRecipe);

