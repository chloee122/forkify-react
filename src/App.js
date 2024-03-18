import { useState } from "react";
import { searchRecipes } from "./api/api";
import RecipeSearchForm from "./component/RecipeSearchForm";
import RecipeList from "./component/RecipeList";
import Recipe from "./component/Recipe";
import Bookmark from "./component/Bookmark";
import RecipeAddButton from "./component/RecipeAddButton";
import Route from "./component/Route";

function App() {
  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSuccess = (data) => {
    setIsLoading(false);
    setRecipes(data.recipes);
  };

  const handleError = (err) => {
    setIsLoading(false);
    setErrorMessage(err.message);
  };

  const handleSearch = async (term) => {
    try {
      setErrorMessage("");
      setRecipes([]);
      setIsLoading(true);
      const results = await searchRecipes(term);
      if (results.recipes.length === 0)
        throw Error("No recipe was found! Try other recipes");
      handleSuccess(results);
    } catch (err) {
      handleError(err);
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
