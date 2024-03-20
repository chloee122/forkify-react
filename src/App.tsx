import { useState } from "react";
import { searchRecipes } from "./api/queries/api";
import RecipeSearchForm from "./component/header/recipeSearchForm/RecipeSearchForm";
import RecipeList from "./component/recipeList/RecipeList";
import Recipe from "./component/recipe/Recipe";
import Bookmark from "./component/bookmark/Bookmark";
import RecipeAddButton from "./component/header/recipeAddButton/RecipeAddButton";
import Route from "./component/navigation/Route";

interface RecipeDetails {
  id: string;
  title: string;
  image_url: string;
  publisher: string;
}

function App() {
  const [recipes, setRecipes] = useState<RecipeDetails[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSuccess = (recipes: RecipeDetails[]) => {
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
      const results = await searchRecipes(term);
      if (results.recipes.length === 0)
        throw Error("No recipe was found! Try other recipes");
      handleSuccess(results.recipes);
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
