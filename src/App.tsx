import { useState } from "react";
import { ImSpoonKnife } from "react-icons/im";
import { searchRecipes } from "./api/api";
import RecipeSearchForm from "./component/header/recipeSearchForm/RecipeSearchForm";
import RecipeList from "./component/recipeList/RecipeList";
import Recipe from "./component/recipe/Recipe";
import Bookmark from "./component/bookmark/Bookmark";
import RecipeAddButton from "./component/header/recipeAddButton/RecipeAddButton";
import Route from "./component/navigation/Route";
import { SimpleRecipe } from "./common/internal";

function App() {
  const [recipes, setRecipes] = useState<SimpleRecipe[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSuccess = (recipes: SimpleRecipe[]) => {
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
    <div className="max-w-[1200px] min-h-[1170px] mx-auto my-[4vw] grid grid-rows-container rounded-xl bg-secondary">
      <div className="grid grid-cols-header items-center justify-items-center rounded-t-lg">
        <div className="flex flex-cols gap-3 ml-10">
          <div className="bg-background1 bg-gradient-to-br from-background1 to-background2 flex items-center rounded-full min-w-12 min-h-12 ">
            <ImSpoonKnife className="text-2xl text-white m-auto" />
          </div>
          <p className="text-4xl font-logo font-semibold text-slate-700 ">
            forkify
          </p>
        </div>
        <RecipeSearchForm handleSearch={handleSearch} />
        <RecipeAddButton />
        <Bookmark />
      </div>
      <div className="grid grid-cols-main rounded-b-xl">
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
  );
}

export default App;
