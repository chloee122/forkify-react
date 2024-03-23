import { useState } from "react";
import { searchRecipes } from "./api/queries/api";
import RecipeSearchForm from "./component/header/recipeSearchForm/RecipeSearchForm";
import RecipeList from "./component/recipeList/RecipeList";
import Recipe from "./component/recipe/Recipe";
import Bookmark from "./component/bookmark/Bookmark";
import RecipeAddButton from "./component/header/recipeAddButton/RecipeAddButton";
import Route from "./component/navigation/Route";
import { RecipeType } from "./api/types/RecipeType";

function App() {
  const [recipes, setRecipes] = useState<RecipeType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSuccess = (recipes: RecipeType[]) => {
    setIsLoading(false);
    setRecipes(recipes);
  };

  const handleError = (err: Error) => {
    setIsLoading(false);
    setErrorMessage(err.message);
  };

  const handleSearch = async (term: string) => {
    try {
      setErrorMessage("");
      setRecipes([]);
      setIsLoading(true);
      const recipes = await searchRecipes(term);
      if (recipes.length === 0)
        throw Error("No recipe was found! Try other recipes");
      handleSuccess(recipes);
    } catch (err) {
      if (err instanceof Error) handleError(err);
    }
  };

  return (
    <div className="w-screen h-lvh h-max bg-gradient-to-br from-primary via-gradient1 to-gradient2">
      <div className="max-w-7xl min-h-6xl bg-slate-100 m-auto rounded-lg">
        <div className="flex">
          <RecipeSearchForm handleSearch={handleSearch} />
          <RecipeAddButton />
          <Bookmark />
        </div>
        <div className="flex">
          <RecipeList
            recipes={recipes}
            isLoading={isLoading}
            errorMessage={errorMessage}
          />

          <Route path="/recipes/">
            <Recipe />
          </Route>
        </div>
      </div>
    </div>
  );
}

export default App;
